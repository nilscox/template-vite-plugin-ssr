import path from 'node:path';

import express, { type Request } from 'express';
import { renderPage } from 'vike/server';

const prod = process.env.NODE_ENV === 'production';
const host = process.env.HOST || 'localhost';
const port = Number(process.env.PORT) || 3000;
const root = path.resolve(import.meta.dirname, '..');

startServer().catch((err: unknown) => {
  // eslint-disable-next-line no-console
  console.error(err);
});

async function startServer() {
  const app = express();

  if (prod) {
    app.use(express.static(`${root}/dist/client`));
  } else {
    const vite = await import('vite');

    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares;

    app.use(viteDevMiddleware);
  }

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.all('(.*)', async (req: Request, res, next) => {
    const pageContextInit = { urlOriginal: req.originalUrl };

    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;

    if (!httpResponse) {
      next();
      return;
    } else {
      const { statusCode, headers } = httpResponse;
      headers.forEach(([name, value]) => res.setHeader(name, value));
      res.status(statusCode);
      httpResponse.pipe(res);
    }
  });

  app.listen(port, host, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on http://${host}:${port}`);
  });
}
