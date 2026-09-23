# PathTry

PathTry is a Next.js app that lets students try a profession before choosing a major. It includes 15 professions in 4 fields and 10 short tasks per profession (7 multiple-choice with 5 options, 3 open answers). It has no database or login: progress is saved in the browser with localStorage, and profession content lives in `src/data/catalog/`.

The scenarios are informed by work activities in [O*NET OnLine](https://www.onetonline.org/) and the [European ESCO taxonomy](https://esco.ec.europa.eu/). They are simplified reflection exercises, not a clinical or psychological diagnosis and not a prediction of career success.

## Run locally

Install Node.js 20 or newer, then run:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## PathFinder (AI mentor) and lead capture

PathFinder reviews open answers, gives hints, and answers questions in the chat. It runs on Claude Haiku 4.5 through the Anthropic SDK.

| Variable | Purpose |
| --- | --- |
| `ANTHROPIC_API_KEY` | Enables PathFinder AI. Without it, answers are reviewed against each task's criteria (rubric mode) and the chat uses built-in hints, so the app keeps working. |
| `LEADS_WEBHOOK_URL` | Optional. Roadmap and partnership requests are POSTed here as JSON (Make, Zapier, Google Apps Script, a Telegram bot…). Without it, leads are only written to the server log. |

Add them to `.env.local` locally, or under the Vercel project's Environment Variables, then redeploy.

## Deploy to Vercel through GitHub

1. Create a GitHub repository and push this project to it.
2. Sign in at [vercel.com](https://vercel.com) and choose **Add New Project**.
3. Import the GitHub repository. Vercel detects Next.js automatically.
4. Leave the build command as `npm run build`, then click **Deploy**.
5. For PathFinder AI and lead delivery, add `ANTHROPIC_API_KEY` and `LEADS_WEBHOOK_URL` under the Vercel project’s Environment Variables, then redeploy.

No database setup is needed. The PDF button opens the browser print dialog, where a student can choose **Save as PDF**.