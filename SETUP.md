# SKY-Apocalypse Live Arcade setup

## Repository
Create a **public** repository named exactly `SKY-Apocalypse` under the `SKY-Apocalypse` account. Upload all files and folders from this package, preserving `.github/` and `game/`.

## Required Actions permissions
1. Open **Settings → Actions → General**.
2. Under **Workflow permissions**, select **Read and write permissions** and save.
3. Ensure GitHub Actions are enabled and third-party actions are allowed by repository/organization policy.
4. Run **Actions → Update profile visuals → Run workflow** once. Confirm the `output` branch contains the snake SVG files.

## Secrets
No custom secrets are required for these workflows. GitHub automatically provides `GITHUB_TOKEN`. Do not create a personal access token.

## Game operation
- A new issue containing `MOVE: 0` through `MOVE: 8` triggers a validated move.
- The repository owner can reset by opening an issue with exact body `RESET GAME`.
- The action updates `game/state.json` and `game/board.svg`, then comments on the issue.
- Moves are serialized to reduce simultaneous update conflicts. This is asynchronous turn-based play, not real-time multiplayer.

## Dynamic seasonal theme
The Vercel banner implementation is included in `api/banner.js`. Deploy it separately using `DEPLOY.md`; the profile README has separate light- and dark-mode image sources.

## Optional integrations
- WakaTime and RSS are skipped until you provide actual username/API key and feed URL.
- Spotify requires a deployed widget URL; the README cannot access a private Spotify account directly.
- Deploy the included `api/banner.js` to Vercel (see `DEPLOY.md`) and replace `YOUR-VERCEL-APP.vercel.app` in README. The banner chooses a random palette within the current India-season, displays IST, adapts to light/dark mode, and has a floating smiley. GitHub may cache proxied images, so per-refresh colour changes are best-effort.

## Before launch
Replace the Vercel placeholder, verify the exact project repository links, and test moves, occupied squares, win/draw and owner reset.
