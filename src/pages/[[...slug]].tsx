import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from '@uniformdev/canvas';
import { withUniformGetServerSideProps } from '@uniformdev/canvas-next/route';
import { Page } from '@/components';
import { getBreadcrumbs, getRouteClient } from '@/utilities/canvas/canvasClients';

export const getServerSideProps = withUniformGetServerSideProps({
  requestOptions: context => ({
    state: Boolean(context.preview) ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
  }),
  client: getRouteClient(),
  handleComposition: async (routeResponse, _context) => {
    const { composition, errors } = routeResponse.compositionApiResponse || {};

    if (errors?.some(e => e.type === 'data' || e.type === 'binding')) {
      return { notFound: true };
    }

    const preview = Boolean(_context.preview);
    const breadcrumbs = await getBreadcrumbs(
      composition._id,
      preview,
      composition?.parameters?.pageTitle?.value as string
    );

    return {
      props: { preview, data: composition || null, context: { breadcrumbs } },
    };
  },
});

export default Page;
