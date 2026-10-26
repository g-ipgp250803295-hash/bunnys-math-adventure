# Bunny's Math Adventure 🐰

A Year 5 interactive learning game about combined operations, built with React + Vite.

## Features
- Welcome screen and interactive adventure map
- Six stations: Learn, Mission 1, Mission 2, Mission 3, Reflection, Success
- Stations remain locked until the previous station is completed
- Notes, text-to-speech narration, and a YouTube learning-video search link
- Three quizzes with five questions each and immediate feedback
- Reflection questions, gold-medal celebration, progress bar, and local progress saving
- Responsive layout for desktop, tablet, and mobile
- Generated sound effects using the Web Audio API

## Run locally
1. Install Node.js (LTS).
2. Open a terminal in this project folder.
3. Run `npm install`
4. Run `npm run dev`
5. Open the local URL shown in the terminal.

## Publish with GitHub and Vercel
1. Create a new GitHub repository named `bunnys-math-adventure`.
2. Upload the contents of this folder to the repository (upload the files inside the folder, not the ZIP itself).
3. On Vercel, choose **Add New → Project**, import your GitHub repository, and deploy.
4. Vercel normally detects Vite automatically. Use:
   - Build command: `npm run build`
   - Output directory: `dist`
5. After deployment, open the Vercel URL and test each station.

## Teaching note
The video button opens YouTube search results so you can select a suitable child-friendly video. Text-to-speech uses the browser's built-in speech synthesis and may sound different across devices. Progress is saved in the same browser/device using localStorage.
