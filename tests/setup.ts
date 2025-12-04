const TEST_URL = process.env.CI
  ? process.env.TEST_URL || 'https://run-and-route-hub.vercel.app'
  : 'http://localhost:3000';

export default TEST_URL;
