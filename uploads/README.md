# Uploads

Images for projects are hosted in [petrasvestartas/storage](https://github.com/petrasvestartas/storage/tree/main/images), not in this repository. Everything in this folder except this README and `project.example.json` is ignored by git.

1. Create a folder named after the project and put the images in it:

   ```
   uploads/floor/floor_640_360.jpg   <- thumbnail (640x360), used as Main Image Url
   uploads/floor/floor1.jpg          <- figures
   uploads/floor/floor2.jpg
   uploads/floor/project.json        <- title, authors, descriptions, ... (step 3)
   ```

2. Check what will be uploaded, then upload:

   ```sh
   npm run upload -- floor --dry-run
   npm run upload -- floor
   ```

   Files go to `storage/images/<project>/` in one commit. Files with the same name are replaced, other files in that folder are kept.

3. Add the project to the website. Copy `uploads/project.example.json` to `uploads/<project>/project.json` and fill it in. `sortId` sets the position in the grid (lowest first, `-1` hides the project). `imageUrl` and `figureUrls` are filled in from the image files in the folder.

   ```sh
   npm run project -- floor --dry-run
   npm run project -- floor
   ```

   It asks for the website login (or reads `FIREBASE_EMAIL` and `FIREBASE_PASSWORD`). A project with the same title is updated, otherwise a new one is created. The website shows the change on the next page load, no deploy needed. Image links point to the exact storage commit, so run `npm run project` again after every `npm run upload` to show the new images (this also avoids old cached images in browsers).

Uses the `gh` CLI login (`gh auth login`) or a `GITHUB_TOKEN` environment variable.
