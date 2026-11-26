# StraviX

The deployable application lives in `StraviX-project/`. The ZIP is the original source export; Netlify builds the unpacked application, not the archive.

`netlify.toml` runs `npm run build` from the app directory. Nitro's Netlify preset publishes the static assets from `StraviX-project/dist` and generates the server-rendering function for Netlify.

For local development, use Node.js 22.12+ and Bun:

```sh
cd StraviX-project
bun install --frozen-lockfile
bun run dev
```
