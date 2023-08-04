import { getAlgoliaEnvs, getCommercetoolsEnvs, getContentfulEnvs, getSegmentEnvs } from './informationCollector';
import { AvailableProjects, CommonVariants } from './constants';
import commercetoolsIntegration from './customIntegrations/commercetools';
import openAIIntegration from './customIntegrations/openAI';
import { composeGetEnvFns } from './utils';

export const demosVariantsGetEnvsMap: {
  [availableProjects in CLI.AvailableProjects]: Partial<
    Record<
      CLI.CommonVariants,
      (project: CLI.AvailableProjects, variant: CLI.CommonVariants) => Promise<Record<string, string>> | undefined
    >
  >;
} = {
  [AvailableProjects.Localization]: {
    [CommonVariants.Default]: getContentfulEnvs,
  },
  [AvailableProjects.CommerceStarter]: {
    [CommonVariants.Default]: () => undefined,
  },
  [AvailableProjects.ComponentStarterKit]: {
    [CommonVariants.Default]: () => undefined,
  },
  [AvailableProjects.CommerceAlgoliaDemo]: {
    [CommonVariants.Default]: getAlgoliaEnvs,
    [CommonVariants.FullDemo]: composeGetEnvFns(getAlgoliaEnvs, getSegmentEnvs),
  },
  [AvailableProjects.CommerceCommercetoolsDemo]: {
    [CommonVariants.Default]: getCommercetoolsEnvs,
  },
};

const Integrations = {
  Contentful: {
    name: 'Contentful',
  },
  ContentfulClassic: {
    name: 'Contentful Classic',
    link: 'https://docs.uniform.app/docs/integrations/content/contentful/contentful-classic/uniform-in-contentful/uniformconf-nextjs-tutorial',
  },
  Contentstack: {
    name: `Contentstack`,
  },
  ThemePackUniform: {
    name: `Theme Pack`,
    data: {
      selectedThemeName: 'uniform',
    },
  },
  ThemePackJavadrip: {
    name: `Theme Pack`,
    data: {
      selectedThemeName: 'javadrip',
    },
  },
  UniformFakeCommerce: {
    name: 'Uniform Fake Commerce',
    data: {
      apiUrl: '',
    },
  },
  Algolia: {
    name: 'Algolia',
    data: {
      applicationId: process.env.CLI_ALGOLIA_APPLICATION_ID,
      searchKey: process.env.CLI_ALGOLIA_SEARCH_KEY,
      indexName: process.env.CLI_ALGOLIA_INDEX_NAME,
    },
  },
  Commercetools: {
    name: 'Commercetools',
    customManifest: commercetoolsIntegration,
    data: {
      projectKey: process.env.CLI_COMMERCETOOLS_PROJECT_KEY,
      clientId: process.env.CLI_COMMERCETOOLS_CLIENT_ID,
      clientSecret: process.env.CLI_COMMERCETOOLS_CLIENT_SECRET,
      apiUrl: process.env.CLI_COMMERCETOOLS_API_URL,
      authUrl: process.env.CLI_COMMERCETOOLS_AUTH_URL,
    },
  },
  OpenAI: {
    name: 'OpenAI',
    customManifest: openAIIntegration,
  },
};

export const notMeshIntegrations = [Integrations.ContentfulClassic.name];

const BASE_URL = 'http://localhost:3000/api/preview?secret=';

export const demosPreviewUrlMap: {
  [availableProjects in CLI.AvailableProjects]: Partial<Record<CLI.CommonVariants, string>>;
} = {
  [AvailableProjects.Localization]: {
    [CommonVariants.Default]: `${BASE_URL}javadrip`,
  },
  [AvailableProjects.CommerceStarter]: {
    [CommonVariants.Default]: `${BASE_URL}javadrip`,
  },
  [AvailableProjects.CommerceAlgoliaDemo]: {
    [CommonVariants.Default]: `${BASE_URL}javadrip`,
    [CommonVariants.FullDemo]: `${BASE_URL}javadrip`,
  },
  [AvailableProjects.CommerceCommercetoolsDemo]: {
    [CommonVariants.Default]: `${BASE_URL}javadrip`,
  },
  [AvailableProjects.ComponentStarterKit]: {
    [CommonVariants.Default]: `${BASE_URL}hello-world`,
    [CommonVariants.ComponentStarterKitCommerceAlgolia]: `${BASE_URL}hello-world`,
  },
};

export const demosRequiredIntegrationsMap: {
  [availableProjects in CLI.AvailableProjects]: Partial<Record<CLI.CommonVariants, CLI.Integration[] | undefined>>;
} = {
  [AvailableProjects.Localization]: {
    [CommonVariants.Default]: [Integrations.ContentfulClassic],
  },
  [AvailableProjects.CommerceStarter]: {
    [CommonVariants.Default]: [Integrations.ThemePackJavadrip, Integrations.UniformFakeCommerce],
  },
  [AvailableProjects.CommerceAlgoliaDemo]: {
    [CommonVariants.Default]: [
      Integrations.ThemePackJavadrip,
      Integrations.Algolia,
      Integrations.Contentful,
      Integrations.Contentstack,
    ],
    [CommonVariants.FullDemo]: [
      Integrations.ThemePackJavadrip,
      Integrations.Algolia,
      Integrations.Contentful,
      Integrations.Contentstack,
      Integrations.OpenAI,
    ],
  },
  [AvailableProjects.CommerceCommercetoolsDemo]: {
    [CommonVariants.Default]: [Integrations.Commercetools, Integrations.Contentful, Integrations.Contentstack],
  },
  [AvailableProjects.ComponentStarterKit]: {
    [CommonVariants.Default]: [Integrations.ThemePackUniform],
    [CommonVariants.ComponentStarterKitCommerceAlgolia]: [
      Integrations.ThemePackJavadrip,
      Integrations.Algolia,
      Integrations.Contentful,
      Integrations.Contentstack,
    ],
  },
};

const getContentStackBaseUrl = (contentStackRegion: string) => {
  if (contentStackRegion === 'AZURE') {
    return 'https://azure-na-api.contentstack.com/v3';
  } else if (contentStackRegion === 'EU') {
    return 'https://eu-api.contentstack.com/v3';
  } else {
    return 'https://cdn.contentstack.io/v3';
  }
};

const DataSource: {
  [key: string]: CLI.DataSourceConfiguration;
} = {
  Contentful: {
    integrationDisplayName: 'Contentful',
    dataSourceId: 'contentfulDataSource',
    dataSourceDisplayName: 'Contentful Data Source',
    connectorType: 'contentful-data-connection',
    baseUrl: `https://cdn.contentful.com/spaces/${process.env.CLI_CONTENTFUL_SPACE_ID}/environments/${process.env.CLI_CONTENTFUL_ENVIRONMENT}`,
    dataProperties: {
      headers: [{ key: 'Content-Type', value: 'application/json' }],
      parameters: [
        {
          key: 'access_token',
          value: process.env.CLI_CONTENTFUL_CDA_ACCESS_TOKEN,
        },
      ],
      custom: {
        spaceId: process.env.CLI_CONTENTFUL_SPACE_ID,
        environmentId: process.env.CLI_CONTENTFUL_ENVIRONMENT,
      },
    },
  },
  Contentstack: {
    integrationDisplayName: 'Contentstack',
    dataSourceDisplayName: 'Contentstack Data Source',
    dataSourceId: 'contentstackDataSource',
    connectorType: 'contentstack-data-connection',
    baseUrl: getContentStackBaseUrl(process.env.CLI_CONTENT_STACK_REGION || ''),
    dataProperties: {
      headers: [
        { key: 'Content-Type', value: 'application/json' },
        { key: 'api_key', value: process.env.CLI_CONTENT_STACK_API_KEY },
        { key: 'access_token', value: process.env.CLI_CONTENT_STACK_DELIVERY_TOKEN },
      ],
    },
  },
  Algolia: {
    integrationDisplayName: 'Algolia',
    dataSourceDisplayName: 'Algolia Data Source',
    dataSourceId: 'algoliaDataSource',
    connectorType: 'algolia-data-connection',
    baseUrl: `https://${process.env.CLI_ALGOLIA_APPLICATION_ID}-dsn.algolia.net/1/indexes`,
    dataProperties: {
      headers: [
        { key: 'Content-Type', value: 'application/json' },
        { key: 'X-Algolia-Application-Id', value: process.env.CLI_ALGOLIA_APPLICATION_ID },
        { key: 'X-Algolia-API-Key', value: process.env.CLI_ALGOLIA_SEARCH_KEY },
      ],
    },
  },
  UniformFakeCommerce: {
    integrationDisplayName: 'Uniform Fake Commerce',
    dataSourceDisplayName: 'Fake Commerce Data Source',
    dataSourceId: 'fakeCommerceDataSource',
    connectorType: 'fake-commerce-data-connection',
    baseUrl: process.env.CLI_UNIFORM_FAKE_COMMERCE_NGM_API_URL || '',
    dataProperties: {},
  },
};

export const demosRequiredDataSourceMap: {
  [availableProjects in CLI.AvailableProjects]: Partial<
    Record<CLI.CommonVariants, CLI.DataSourceConfiguration[] | undefined>
  >;
} = {
  [AvailableProjects.Localization]: {
    [CommonVariants.Default]: [],
  },
  [AvailableProjects.CommerceStarter]: {
    [CommonVariants.Default]: [DataSource.UniformFakeCommerce],
  },
  [AvailableProjects.CommerceAlgoliaDemo]: {
    [CommonVariants.Default]: [DataSource.Contentful, DataSource.Contentstack, DataSource.Algolia],
    [CommonVariants.FullDemo]: [DataSource.Contentful, DataSource.Contentstack, DataSource.Algolia],
  },
  [AvailableProjects.CommerceCommercetoolsDemo]: {
    [CommonVariants.Default]: [DataSource.Contentful, DataSource.Contentstack],
  },
  [AvailableProjects.ComponentStarterKit]: {
    [CommonVariants.Default]: [],
    [CommonVariants.ComponentStarterKitCommerceAlgolia]: [
      DataSource.Algolia,
      DataSource.Contentful,
      DataSource.Contentstack,
    ],
  },
};

export const demosVariantsRequiredEnvsMap: {
  [availableProjects in CLI.AvailableProjects]: Partial<Record<CLI.CommonVariants, string[]>>;
} = {
  [AvailableProjects.Localization]: {
    [CommonVariants.Default]: [
      'CONTENTFUL_SPACE_ID',
      'CONTENTFUL_ENVIRONMENT',
      'CONTENTFUL_CDA_ACCESS_TOKEN',
      'CONTENTFUL_CPA_ACCESS_TOKEN',
    ],
  },
  [AvailableProjects.CommerceStarter]: {
    [CommonVariants.Default]: [],
  },
  [AvailableProjects.CommerceAlgoliaDemo]: {
    [CommonVariants.Default]: ['ALGOLIA_APPLICATION_ID', 'ALGOLIA_SEARCH_KEY'],
    [CommonVariants.FullDemo]: [
      'ALGOLIA_APPLICATION_ID',
      'ALGOLIA_SEARCH_KEY',
      'NEXT_PUBLIC_ANALYTICS_WRITE_KEY',
      'SEGMENT_API_KEY',
      'SEGMENT_SPACE_ID',
    ],
  },
  [AvailableProjects.CommerceCommercetoolsDemo]: {
    [CommonVariants.Default]: [
      'COMMERCETOOLS_PROJECT_KEY',
      'COMMERCETOOLS_AUTH_URL',
      'COMMERCETOOLS_API_URL',
      'COMMERCETOOLS_CLIENT_ID',
      'COMMERCETOOLS_CLIENT_SECRET',
    ],
  },
  [AvailableProjects.ComponentStarterKit]: {
    [CommonVariants.Default]: [],
  },
};

export const demosVariantsRequiredLocales: {
  [availableProjects in CLI.AvailableProjects]: Partial<Record<CLI.CommonVariants, string[]>>;
} = {
  [AvailableProjects.Localization]: {
    [CommonVariants.Default]: ['en-US', 'de-DE', 'es-ES'],
  },
  [AvailableProjects.CommerceStarter]: {
    [CommonVariants.Default]: [],
  },
  [AvailableProjects.CommerceAlgoliaDemo]: {
    [CommonVariants.Default]: [],
    [CommonVariants.FullDemo]: [],
  },
  [AvailableProjects.CommerceCommercetoolsDemo]: {
    [CommonVariants.Default]: [],
  },
  [AvailableProjects.ComponentStarterKit]: {
    [CommonVariants.Default]: [],
  },
};
