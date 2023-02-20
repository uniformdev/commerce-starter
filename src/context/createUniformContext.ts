import { NextPageContext } from 'next';
import { Context, ManifestV2, enableContextDevTools, enableDebugConsoleLogDrain } from '@uniformdev/context';
import { NextCookieTransitionDataStore } from '@uniformdev/context-next';
import manifest from './manifest.json';

// Docs: https://docs.uniform.app/guides/classification/activation
const createUniformContext = (serverContext?: NextPageContext) => {
  return new Context({
    defaultConsent: true,
    manifest: manifest as ManifestV2,
    transitionStore: new NextCookieTransitionDataStore({
      serverContext,
    }),
    plugins: [enableContextDevTools(), enableDebugConsoleLogDrain('debug')],
  });
};

export default createUniformContext;
