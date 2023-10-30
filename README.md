# GPT Recipe Analysis

Playing around with OpenAI's [GPT Chat completions API](https://platform.openai.com/docs/guides/gpt/chat-completions-api) and [Vercel’s AI SDK](https://sdk.vercel.ai/docs).

Built with SvelteKit and Tailwind CSS.

## Use

Paste a URL to a recipe and fill in the list of ingredients you have.
GPT will check if you're missing anything, and create a short list of steps to prepare the dish.

## Develop

Install dependencies with `npm install` (or `pnpm install` or `yarn`).

Start a dev server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Build

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
