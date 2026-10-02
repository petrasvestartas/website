// Publish uploads/<project>/project.json to the Firebase projects list.
// imageUrl and figureUrls are built from the image files in the same folder,
// so run `npm run upload -- <project>` first.
// A project with the same title is updated, otherwise a new project is created.
//
// Usage: npm run project -- <project> [--dry-run]
// Login: FIREBASE_EMAIL / FIREBASE_PASSWORD environment variables, or asked in the terminal.

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createInterface } from 'node:readline';
import { projectFolder, projectFiles, projectUrls } from './project-files.mjs';

const API_KEY = 'AIzaSyDHebBy3OIgDl5p5h0skKgXKoVSc_Jz9Z8';
const DATABASE = 'https://vue-http-demo-f5470-default-rtdb.europe-west1.firebasedatabase.app';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const project = args.find(arg => !arg.startsWith('--'));

if (!project) {
    console.error('Usage: npm run project -- <project> [--dry-run]');
    process.exit(1);
}

const folder = projectFolder(project);
const jsonPath = join(folder, 'project.json');
if (!existsSync(jsonPath)) {
    console.error(`${jsonPath} does not exist. Copy uploads/project.example.json there and fill it in.`);
    process.exit(1);
}

const { imageUrl, figureUrls } = projectUrls(project, projectFiles(folder));
if (!imageUrl) {
    console.error(`No *_640_360 thumbnail in ${folder}.`);
    process.exit(1);
}

const projectData = { ...JSON.parse(readFileSync(jsonPath, 'utf8')), imageUrl, figureUrls };

const response = await fetch(`${DATABASE}/projects.json`);
const projects = await response.json();
const existingKey = Object.keys(projects).find(key => projects[key].title === projectData.title);

console.log(JSON.stringify(projectData, null, 2));
console.log(existingKey ? `\nWill update existing project ${existingKey}.` : '\nWill create a new project.');

if (dryRun) {
    process.exit(0);
}

function ask(question, hidden = false) {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    if (hidden) {
        rl._writeToOutput = text => {
            if (text.startsWith(question)) rl.output.write(text);
        };
    }
    return new Promise(resolve => rl.question(question, answer => {
        rl.close();
        if (hidden) console.log();
        resolve(answer.trim());
    }));
}

const email = process.env.FIREBASE_EMAIL || await ask('Email: ');
const password = process.env.FIREBASE_PASSWORD || await ask('Password: ', true);

const authResponse = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, returnSecureToken: true }),
});
const authData = await authResponse.json();
if (!authResponse.ok) {
    console.error(`Login failed: ${authData.error?.message}`);
    process.exit(1);
}

const url = existingKey
    ? `${DATABASE}/projects/${existingKey}.json?auth=${authData.idToken}`
    : `${DATABASE}/projects.json?auth=${authData.idToken}`;

const saveResponse = await fetch(url, {
    method: existingKey ? 'PATCH' : 'POST',
    body: JSON.stringify(existingKey ? projectData : { userId: authData.localId, ...projectData }),
});
const saveData = await saveResponse.json();
if (!saveResponse.ok) {
    console.error(`Failed to save project: ${saveData.error}`);
    process.exit(1);
}

const key = existingKey || saveData.name;
console.log(`\nSaved. https://vestartas.com/projects/${key}`);
