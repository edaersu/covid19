const configByEnv = {
  development: {
    API_URL: 'http://localhost:3001/api',
  },
  production: {
    API_URL: undefined,
  },
};

// eslint-disable-next-line no-undef
const config = configByEnv[__DEV__ ? 'development' : 'production'];

export default config;
