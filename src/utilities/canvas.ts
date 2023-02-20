import getConfig from 'next/config';
import {
  CanvasClient,
  CANVAS_PUBLISHED_STATE,
  CANVAS_DRAFT_STATE,
  RootComponentInstance,
  enhance,
  EnhancerBuilder,
} from '@uniformdev/canvas';
import { ProjectMapClient, ProjectMapNodeGetRequest, ProjectMapSubtree } from '@uniformdev/project-map';

const { uniformApiKey, uniformProjectId, uniformCliBaseUrl } = getConfig().serverRuntimeConfig;

const { canvasClient, projectMapClient } = (() => {
  if (!uniformApiKey || !uniformProjectId || !uniformCliBaseUrl) throw Error('Uniform credentials must be specified');
  const clientOptions = {
    apiKey: uniformApiKey,
    apiHost: uniformCliBaseUrl,
    projectId: uniformProjectId,
  };
  return { canvasClient: new CanvasClient(clientOptions), projectMapClient: new ProjectMapClient(clientOptions) };
})();

const getState = (preview: boolean | undefined) => (preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE);

export const getCompositionBySlug = async (
  slug: string,
  context: { preview?: boolean },
  enhancers?: EnhancerBuilder
): Promise<RootComponentInstance> => {
  if (!slug) throw new Error('Composition slug is not provided');
  if (!canvasClient) throw new Error('Canvas client is not configured');

  const { preview } = context || {};
  const slugHasLeadingSlash = slug.startsWith('/');

  const { composition } = await canvasClient
    .getCompositionBySlug({
      slug,
      state: getState(preview),
    })
    .catch(e => {
      if (e.statusCode !== 404) throw e;
      return canvasClient.getCompositionBySlug({
        slug: slugHasLeadingSlash ? slug.replace('/', '') : `/${slug}`,
        state: getState(preview),
      });
    });

  if (enhancers) {
    await enhance({ composition, enhancers, context: { preview } });
  }

  return composition;
};

interface GetPathsOptions extends Omit<ProjectMapNodeGetRequest, 'projectId' | 'projectMapId'> {
  skipPath?: string;
}

/* Official documentation https://docs.uniform.app/reference/packages/uniformdev-project-map#projectmapclient */
export const getPathsFromProjectMap = async (options?: GetPathsOptions): Promise<string[]> => {
  if (!projectMapClient) throw new Error('ProjectMapClient client is not configured');
  const { projectMaps } = await projectMapClient.getProjectMapDefinitions().catch(() => ({ projectMaps: [] }));
  const { id: projectMapId } = projectMaps[0] || {};
  const { skipPath, ...restOptions } = options || {};

  if (!projectMapId) return [];

  const paths = await projectMapClient
    .getSubtree({ projectMapId, ...(restOptions || {}) })
    .then((projectMapTree: ProjectMapSubtree | undefined): string[] => {
      if (!projectMapTree) return [];
      const paths: string[] = [];

      (function pushPath(projectMap: ProjectMapSubtree) {
        if (projectMap.type !== 'placeholder') paths.push(projectMap.path);
        const { children = [] } = projectMap || {};
        children.forEach(pushPath);
      })(projectMapTree);

      return paths;
    })
    .catch(() => []);

  return skipPath ? paths.filter(path => !path.includes(skipPath)) : paths;
};
