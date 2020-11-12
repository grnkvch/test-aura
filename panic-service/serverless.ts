import type { Serverless } from 'serverless/aws'
const config = require('./config')

const serverlessConfiguration: Serverless = {
  service: {
    name: 'panic-service',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PG_HOST: config.PG_HOST,
      PG_PORT:config.PG_PORT,
      PG_DATABASE:config.PG_DATABASE,
      PG_USERNAME:config.PG_USERNAME,
      PG_PASSWORD:config.PG_PASSWORD,
    },
  },
  functions: {
    createUser: {
      handler: 'handler.createUser',
      events: [
        {
          http: {
            method: 'post',
            path: 'users',
            cors: true,
          }
        }
      ]
    },
    deleteUser: {
      handler: 'handler.deleteUser',
      events: [
        {
          http: {
            method: 'delete',
            path: 'users/{id}',
            cors: true,
          }
        }
      ]
    },
    updateUser: {
      handler: 'handler.updateUser',
      events: [
        {
          http: {
            method: 'put',
            path: 'users/{id}',
            cors: true,
          }
        }
      ]
    },
    getUsersList: {
      handler: 'handler.getUsersList',
      events: [
        {
          http: {
            method: 'get',
            path: 'users',
            cors: true,
          }
        }
      ]
    },
    getUser: {
      handler: 'handler.getUser',
      events: [
        {
          http: {
            method: 'get',
            path: 'users/{id}',
            cors: true,
          }
        }
      ]
    },
    getGuard: {
      handler: 'handler.getGuard',
      events: [
        {
          http: {
            method: 'get',
            path: 'guards/{id}',
            cors: true,
          }
        }
      ]
    },
    getGuardsList: {
      handler: 'handler.getGuardsList',
      events: [
        {
          http: {
            method: 'get',
            path: 'guards',
            cors: true,
          }
        }
      ]
    },
    updateAvailability: {
      handler: 'handler.updateAvailability',
      events: [
        {
          http: {
            method: 'put',
            path: 'guards/{id}/updateAvailability',
            cors: true,
          }
        }
      ]
    },
    updateGeolocation: {
      handler: 'handler.updateGeolocation',
      events: [
        {
          http: {
            method: 'put',
            path: 'guards/{id}/updateGeolocation',
            cors: true,
          }
        }
      ]
    },
    createPanic: {
      handler: 'handler.createPanic',
      events: [
        {
          http: {
            method: 'post',
            path: 'panics',
            cors: true,
          }
        }
      ]
    },
    getPanic: {
      handler: 'handler.getPanic',
      events: [
        {
          http: {
            method: 'get',
            path: 'panics/{id}',
            cors: true,
          }
        }
      ]
    },
    getPanicsList: {
      handler: 'handler.getPanicsList',
      events: [
        {
          http: {
            method: 'get',
            path: 'panics',
            cors: true,
          }
        }
      ]
    },
    attachGurad: {
      handler: 'handler.attachGurad',
      events: [
        {
          http: {
            method: 'put',
            path: 'panics/{id}/attachGurad',
            cors: true,
          }
        }
      ]
    },
    resolve: {
      handler: 'handler.resolve',
      events: [
        {
          http: {
            method: 'put',
            path: 'panics/{id}/resolve',
            cors: true,
          }
        }
      ]
    },
  }
}

module.exports = serverlessConfiguration
