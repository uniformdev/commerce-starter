import { NextPageContext } from 'next';
import {
  Context,
  ManifestV2,
  enableContextDevTools,
  enableDebugConsoleLogDrain,
  ContextPlugin,
} from '@uniformdev/context';
import { NextCookieTransitionDataStore } from '@uniformdev/context-next';

import manifest from './manifest.json';

// Docs: https://docs.uniform.app/guides/classification/activation
const createUniformContext = (serverContext?: NextPageContext): Context => {
  const plugins: ContextPlugin[] = [enableContextDevTools(), enableDebugConsoleLogDrain('debug')];
  return new Context({
    defaultConsent: true,
    manifest: manifest as ManifestV2,
    transitionStore: new NextCookieTransitionDataStore({ serverContext }),
    plugins,
  });
};

export default createUniformContext;
