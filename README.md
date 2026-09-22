# PathTry

PathTry is a small Next.js app that lets students try a profession before choosing a major. It includes 10 professions and 5 short tasks per profession. It has no database or login: progress is saved in the browser with localStorage, and profession content lives in `src/data/professions.ts`.

The scenarios are informed by work activities in [O*NET OnLine](https://www.onetonline.org/) and the [European ESCO taxonomy](https://esco.ec.europa.eu/). They are simplified reflection exercises, not a clinical or psychological diagnosis and not a prediction of career success.

## Run locally

Install Node.js 20 or newer, then run:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

The optional `/api/review` route uses an OpenAI-compatible API for text feedback. Add `AI_API_KEY`, `AI_BASE_URL`, and `AI_MODEL` to `.env.local` if desired. Without a key, the app uses fallback feedback and keeps working.

## Deploy to Vercel through GitHub

1. Create a GitHub repository and push this project to it.
2. Sign in at [vercel.com](https://vercel.com) and choose **Add New Project**.
3. Import the GitHub repository. Vercel detects Next.js automatically.
4. Leave the build command as `npm run build`, then click **Deploy**.
5. For AI feedback, add `AI_API_KEY`, `AI_BASE_URL`, and `AI_MODEL` under the Vercel project’s Environment Variables, then redeploy.

No database setup is needed. The PDF button opens the browser print dialog, where a student can choose **Save as PDF**.