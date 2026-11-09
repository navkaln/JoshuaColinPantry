// Build-time flags. Set via environment variables (see .env.example).
const env = (k: string, d: string) => (process.env[k] ?? import.meta.env?.[k] ?? d).toString().toLowerCase();
export const SHOW_PLACEHOLDER_TAGS = env('SHOW_PLACEHOLDER_TAGS', 'true') !== 'false';
export const SHOW_UNVERIFIED = env('SHOW_UNVERIFIED', 'false') === 'true';
