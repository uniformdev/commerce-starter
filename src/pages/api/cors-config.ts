// Cross-Origin Resource Sharing to support Uniform platform Fake Commerce integration
const corsConfig = {
  methods: ['GET', 'PUT', 'POST'],
  origin: [/.+-mesh-integration\.netlify\.app$/, 'https://fakecommerce.mesh.uniform.app', 'http://localhost:4020'],
  credentials: true,
};

export default corsConfig;
