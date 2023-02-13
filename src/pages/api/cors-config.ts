// Cross-Origin Resource Sharing to support Uniform platform Fake Commerce integration
const corsConfig = {
  methods: ['GET', 'PUT', 'POST'],
  origin: ['https://canary-fake-commerce-mesh-integration.netlify.app'],
  credentials: true,
};

export default corsConfig;
