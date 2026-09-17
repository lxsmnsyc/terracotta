import { handleRequest } from '#solid-ssr';
import { fromWebHandler } from 'h3';

/**
 * Everything the public assets did not answer is a document request, and the
 * Solid server bundle answers it: `handleRequest` maps a web-standard `Request`
 * to a streamed `Response`, which is precisely what `fromWebHandler` wants.
 *
 * Streaming matters here, because the pages render out-of-order Suspense
 * content, so
 * the response is handed back untouched rather than buffered.
 */
export default fromWebHandler((request) => handleRequest(request));
