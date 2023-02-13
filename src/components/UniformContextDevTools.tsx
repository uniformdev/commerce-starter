import { FC } from 'react';
import getConfig from 'next/config';
import { ToggleEmbeddedContextDevTools } from '@uniformdev/context-devtools';

const { uniformProjectId, uniformApiKey, uniformCliBaseUrl } = getConfig().serverRuntimeConfig;

const UniformContextDevTools: FC = () => (
  <ToggleEmbeddedContextDevTools
    initialSettings={{ apiHost: uniformCliBaseUrl, apiKey: uniformApiKey, projectId: uniformProjectId }}
  />
);

export default UniformContextDevTools;
