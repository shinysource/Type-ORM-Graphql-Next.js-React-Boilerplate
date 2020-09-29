interface Config {
  appName: string;
  basename: string;
  urls: {
    graphql: string;
  };
}

if (!process.env.clientGraphqlUrl || !process.env.serverGraphqlUrl) {
  throw new Error('clientGraphqlUrl and serverGraphqlUrl environment variable must be set');
}

const basename = process.env.basePath || '/';

const config: Config = {
  appName: 'Test App',
  basename,
  urls: {
    graphql: process.browser ? process.env.clientGraphqlUrl : process.env.serverGraphqlUrl,
  },
};

export default config;
