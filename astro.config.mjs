import { defineConfig } from 'astro/config';
import contactStub from './scripts/contact-stub-integration.mjs';

// No `site` on purpose: the MVP must not claim griswoldhall.com.
export default defineConfig({
  output: 'static',
  integrations: [contactStub()],
});
