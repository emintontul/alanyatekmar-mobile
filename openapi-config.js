const path = require('path');

const config = {
  schemaFile: path.resolve(__dirname, './swagger.json'),
  apiFile: './app/api/baseApi.ts',
  apiImport: 'baseApi',
  outputFile: './app/api/tekmarApi.ts',
  exportName: 'tekmarApi',
  hooks: {queries: true, lazyQueries: true, mutations: true},
  flattenArg: true,
};

module.exports = config;
