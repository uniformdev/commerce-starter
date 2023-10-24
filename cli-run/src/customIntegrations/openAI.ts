const openAIIntegration = {
  type: 'openai',
  displayName: 'OpenAI',
  logoIconUrl: 'https://canary-openai-mesh-integration.netlify.app/openai-logo.svg',
  badgeIconUrl: 'https://canary-openai-mesh-integration.netlify.app/openai-badge.svg',
  category: 'ai',
  baseLocationUrl: 'https://canary-openai-mesh-integration.netlify.app',
  locations: {
    install: {
      description: ['OpenAI'],
    },
    settings: {
      url: '/settings',
    },
    unstable_ai: {
      generateUrl: '/ai',
    },
  },
};

export const prompts = [
  {
    title: 'Make text shorter',
    promptText: 'Make the following text shorter, 250 characters maximum: ${$value}',
    args: {},
    supportedParamTypes: ['text'],
    promptMetadata: {
      model: 'gpt-3.5-turbo',
    },
  },
  {
    title: 'Personalize content for audience',
    promptText:
      'You are an experienced marketer in coffee products. Rewrite the text below for target audience of ${audience}. Your answer must be not longer than 100 characters: ${$value}',
    args: {
      audience: {
        title: 'audience',
        desc: 'audience',
        type: 'audience',
      },
    },
    supportedParamTypes: ['text'],
    promptMetadata: {
      model: 'gpt-3.5-turbo',
    },
  },
  {
    title: 'Generate text from topic',
    promptText:
      "Generate text that elaborates on the topic below. Your answer must be ${count} sentences long. Here's the topic: ${topic}",
    args: {
      topic: {
        title: 'Topic',
        desc: 'Topic',
        type: 'text',
      },
      count: {
        title: 'Number of sentences',
        desc: 'Number of sentences',
        type: 'text',
      },
    },
    supportedParamTypes: ['text'],
    promptMetadata: {
      model: 'gpt-3.5-turbo',
    },
  },
  {
    title: 'Change to our brand tone',
    promptText:
      "Rewrite the text below to be more serious. Your answer must be the same length and should be targeted to ${audience}. Here's the text to rewrite: ${$value}",
    args: {
      audience: {
        title: 'audience',
        desc: 'audience',
        type: 'audience',
      },
    },
    supportedParamTypes: ['text'],
    promptMetadata: {
      model: 'gpt-3.5-turbo',
    },
  },
];

export default openAIIntegration;
