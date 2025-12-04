const TEST_URL = process.env.CI
  ? process.env.TEST_URL || 'https://your-vercel-deployment.vercel.app'
  : 'http://localhost:3000';

export default TEST_URL;
