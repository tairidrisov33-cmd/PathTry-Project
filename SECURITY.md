# Security policy

## Reporting a vulnerability

Please email **pathtry.site@gmail.com** with a description of the issue and steps to reproduce it. Do not open a public GitHub issue for security problems. We aim to reply within 3 days and to fix confirmed issues as quickly as possible. The same contact is published at https://pathtry.site/.well-known/security.txt.

## What we protect

- **Secrets:** AI, email and webhook keys live only in server-side environment variables and never reach the browser.
- **Input:** every API route validates types, lengths and allowed values, caps request bodies at 20 KB, and rate-limits each IP (20 requests/min for PathFinder and grading, 5/min for lead forms).
- **Browser:** a Content-Security-Policy, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, a strict referrer policy, HSTS and a locked-down Permissions-Policy are sent on every page.
- **AI:** student text is treated as data, never as instructions; task answers are not sent to the model before the student answers; harmful and off-topic requests are refused.
- **Privacy:** no accounts and no database. Progress stays in the browser; lead contacts are only used to reply and are never written to logs.

## Scope

In scope: https://pathtry.site and the code in this repository. Out of scope: denial-of-service testing, social engineering, and third-party services (Vercel, Groq, Anthropic, Resend).
