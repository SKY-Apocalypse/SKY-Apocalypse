# Deploy the SKY-Apocalypse dynamic theme API

## 1. Create the profile repository
Create a public repository named exactly `SKY-Apocalypse` under the `SKY-Apocalypse` account. Upload the contents of this project, including `.github/`, `game/`, `api/`, `package.json`, and `vercel.json`.

## 2. Deploy the banner API to Vercel
1. Create a separate GitHub repository, for example `sky-apocalypse-profile-api`.
2. Copy `api/banner.js`, `package.json`, and `vercel.json` into its root (keep `api/banner.js` at that exact path).
3. Import that repository into Vercel and deploy with the default settings.
4. Test both endpoints:
   - `https://YOUR-VERCEL-APP.vercel.app/api/banner?user=SKY-Apocalypse&theme=dark`
   - `https://YOUR-VERCEL-APP.vercel.app/api/banner?user=SKY-Apocalypse&theme=light`
5. Replace `YOUR-VERCEL-APP.vercel.app` in the profile README with your deployed Vercel domain.

## 3. Theme behavior
- **Season selection:** date-based using the `Asia/Kolkata` timezone. Spring = Feb–Mar, Summer/Monsoon = Apr–Sep, Autumn = Oct–Nov, Winter = Dec–Jan.
- **Palette selection:** randomly selects one of three palettes within the current season each time the endpoint executes.
- **Time awareness:** displays the current India Standard Time in the banner; season transitions happen automatically as the calendar changes.
- **Light/dark mode:** README `<picture>` selects the light or dark SVG endpoint based on the visitor's GitHub/browser colour-scheme preference.
- **Floating smiley:** SVG animation drifts horizontally and vertically in a continuous loop.

The API sends no-cache headers. GitHub's image proxy may nevertheless cache images, so a different palette on every profile refresh is best-effort, not guaranteed.

## 4. GitHub Actions
In the profile repository, open **Settings → Actions → General → Workflow permissions**, select **Read and write permissions**, and save. Run **Actions → Update profile visuals** once to publish the contribution snake to the `output` branch.

## 5. Secrets
No custom secrets are needed for the included workflows. GitHub supplies `GITHUB_TOKEN`.

## 6. Before launch
- Replace the Vercel placeholder in README.
- Confirm the profile repository's default branch is `main`.
- Replace featured-project links with exact repository URLs.
- Test the game workflow and verify the `output` branch snake files.
