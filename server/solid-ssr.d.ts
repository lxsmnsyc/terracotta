/**
 * The server bundle emitted by `vite build`, reached through the alias defined
 * in `nitro.config.ts`. It exists only after a build, so its shape is declared
 * here rather than inferred — the two exports below are the plugin's documented
 * production surface.
 */
declare module '#solid-ssr' {
  export function handleRequest(request: Request): Promise<Response>;
  const app: { fetch(request: Request): Promise<Response> };
  export default app;
}
