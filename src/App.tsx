import { type JSX, Loading } from '@solidjs/web';
import { ColorSchemeProvider } from './lib/color-scheme';
import { ThemeProvider } from './lib/theme';
import { Router } from './router';

import './styles/reset.css';
import './styles/prose.css';
import './styles/chrome.css';
import './themes/_contract.css';
import './themes';

export default function App(): JSX.Element {
  return (
    <ThemeProvider>
      {/* Light/dark. See `lib/color-scheme.tsx` for why this is not Terracotta's
          own `ColorSchemeProvider` yet. */}
      <ColorSchemeProvider>
        {/* Page content is loaded on demand, so navigation needs somewhere to
            suspend. The boundary sits outside the route so the chrome stays put
            while only the page area swaps. */}
        <Router>
          {(props) => (
            <Loading fallback={<div class="page-loading">Loading…</div>}>{props.children}</Loading>
          )}
        </Router>
      </ColorSchemeProvider>
    </ThemeProvider>
  );
}
