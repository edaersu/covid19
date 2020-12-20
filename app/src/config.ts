const configByEnv = {
  development: {
    API_URL: 'https://covid-193.p.rapidapi.com',
    X_RAPIDAPI_KEY: 'YOUR_RAPIDAPI_COVID_193_API_KEY',
    X_RAPIDAPI_HOST: 'covid-193.p.rapidapi.com',
  },
  production: {
    API_URL: 'https://covid-193.p.rapidapi.com',
    X_RAPIDAPI_KEY: 'YOUR_RAPIDAPI_COVID_193_API_KEY',
    X_RAPIDAPI_HOST: 'covid-193.p.rapidapi.com',
  },
};

// eslint-disable-next-line no-undef
const config = configByEnv[__DEV__ ? 'development' : 'production'];

export default config;
