# Zitto Feedback Widget

An interactive feedback card built with plain HTML, CSS and JavaScript. No build step.

The Submit button changes color with the selected feeling:

| Feeling | Button color |
|---|---|
| Angry | Red-orange |
| Sad | Blue |
| Neutral | Ash gray |
| Happy | Default orange |
| Love | Red |

## Run locally
Open `index.html` in your browser.

## Host on GitHub Pages
1. Push this folder's contents to a GitHub repository.
2. Go to **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

## Connect to a backend
In `js/script.js`, find the `setTimeout` inside the submit handler and replace it with a `fetch()` call that sends `payload`.
