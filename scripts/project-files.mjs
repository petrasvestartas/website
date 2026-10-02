// Shared helpers for the files in uploads/<project>/ and their URLs in the storage repo.

import { readdirSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

export const OWNER = 'petrasvestartas';
export const REPO = 'storage';
export const BRANCH = 'main';
const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.obj', '.3dm'];

export function projectFolder(project) {
    const folder = join('uploads', project);
    if (!existsSync(folder)) {
        console.error(`Folder ${folder} does not exist.`);
        process.exit(1);
    }
    return folder;
}

export function projectFiles(folder) {
    return readdirSync(folder)
        .filter(name => EXTENSIONS.includes(extname(name).toLowerCase()))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

// ref is a branch ref or a commit SHA. Publishing uses the commit SHA, so every publish gives
// new URLs and browsers cannot show an old cached version of a replaced image.
export function projectUrls(project, files, ref = `refs/heads/${BRANCH}`) {
    const rawUrl = name => `https://raw.githubusercontent.com/${OWNER}/${REPO}/${ref}/images/${project}/${name}`;
    const thumbnail = files.find(name => name.includes('_640_360'));
    return {
        imageUrl: thumbnail ? rawUrl(thumbnail) : null,
        figureUrls: files.filter(name => name !== thumbnail).map(rawUrl),
    };
}
