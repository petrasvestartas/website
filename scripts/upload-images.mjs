// Upload images from uploads/<project>/ to github.com/petrasvestartas/storage/images/<project>/
// in a single commit, then print the raw URLs for the project form.
//
// Usage: npm run upload -- <project> [--dry-run] [--prune]
// --prune also deletes files in storage/images/<project>/ that are not in the local folder.

import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { OWNER, REPO, BRANCH, projectFolder, projectFiles, projectUrls } from './project-files.mjs';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const prune = args.includes('--prune');
const project = args.find(arg => !arg.startsWith('--'));

if (!project) {
    console.error('Usage: npm run upload -- <project> [--dry-run] [--prune]');
    process.exit(1);
}

const folder = projectFolder(project);
const files = projectFiles(folder);

if (files.length === 0) {
    console.error(`No files to upload in ${folder}.`);
    process.exit(1);
}

function printUrls() {
    const { imageUrl, figureUrls } = projectUrls(project, files);
    console.log(`\nMain Image Url:\n${imageUrl || '(no *_640_360 file found)'}`);
    console.log('\nFigure Urls:');
    figureUrls.forEach(url => console.log(url));
}

const token = process.env.GITHUB_TOKEN || execSync('gh auth token').toString().trim();

async function github(method, path, body) {
    const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}${path}`, {
        method,
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
        },
        body: body ? JSON.stringify(body) : undefined,
    });
    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(`${method} ${path} failed: ${responseData.message}`);
    }
    return responseData;
}

const remoteFiles = await github('GET', `/contents/images/${project}?ref=${BRANCH}`).catch(() => []);
const stale = prune ? remoteFiles.filter(file => file.type === 'file' && !files.includes(file.name)).map(file => file.name) : [];

if (dryRun) {
    console.log(`Would upload ${files.length} files to ${OWNER}/${REPO}/images/${project}/:`);
    files.forEach(name => console.log(`  ${name}`));
    stale.forEach(name => console.log(`  delete ${name}`));
    printUrls();
    process.exit(0);
}

const ref = await github('GET', `/git/ref/heads/${BRANCH}`);
const parent = await github('GET', `/git/commits/${ref.object.sha}`);

const tree = [];
for (const name of files) {
    const content = readFileSync(join(folder, name)).toString('base64');
    const blob = await github('POST', '/git/blobs', { content, encoding: 'base64' });
    tree.push({ path: `images/${project}/${name}`, mode: '100644', type: 'blob', sha: blob.sha });
    console.log(`  uploaded ${name}`);
}
for (const name of stale) {
    tree.push({ path: `images/${project}/${name}`, mode: '100644', type: 'blob', sha: null });
    console.log(`  deleted ${name}`);
}

const newTree = await github('POST', '/git/trees', { base_tree: parent.tree.sha, tree });

if (newTree.sha === parent.tree.sha) {
    console.log('\nAll files are already in storage, nothing to commit.');
} else {
    const commit = await github('POST', '/git/commits', {
        message: `Update images for ${project}`,
        tree: newTree.sha,
        parents: [parent.sha],
    });
    await github('PATCH', `/git/refs/heads/${BRANCH}`, { sha: commit.sha });
    console.log(`\nCommitted ${files.length} files${stale.length ? `, deleted ${stale.length}` : ''} to ${OWNER}/${REPO}: ${commit.html_url}`);
}

printUrls();
