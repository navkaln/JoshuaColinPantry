// Stub contact handler for `astro dev` and `astro preview`.
// Logs submissions to .contact-submissions.log in the project root. Sends nothing.
import { appendFileSync } from 'node:fs';

function handler(req, res, next) {
  if (req.method !== 'POST' || !req.url?.startsWith('/api/contact')) return next();
  let body = '';
  req.on('data', (c) => { body += c; if (body.length > 20000) req.destroy(); });
  req.on('end', () => {
    const f = Object.fromEntries(new URLSearchParams(body));
    const tooFast = Date.now() - Number(f.t || 0) < 3000;
    const spam = Boolean(f.website) || tooFast; // honeypot + minimum fill time
    const line = JSON.stringify({ at: new Date().toISOString(), spam, name: f.name, email: f.email, message: f.message });
    if (!spam) console.log('[contact-stub] submission logged locally (nothing sent)');
    appendFileSync('.contact-submissions.log', line + '\n');
    const wantsJson = (req.headers.accept || '').includes('application/json');
    if (wantsJson) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, stub: true }));
    } else {
      res.writeHead(303, { Location: '/contact/?received=stub' });
      res.end();
    }
  });
}

export default function contactStub() {
  return {
    name: 'contact-stub',
    hooks: {
      'astro:server:setup': ({ server }) => { server.middlewares.use(handler); },
      'astro:server:start': () => {},
      'astro:build:done': () => {},
      'astro:config:setup': ({ command, updateConfig }) => {
        updateConfig({ vite: { plugins: [{ name: 'contact-stub-preview', configurePreviewServer(s) { s.middlewares.use(handler); } }] } });
      },
    },
  };
}
