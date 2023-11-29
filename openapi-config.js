const path = require('path');

const config = {
  schemaFile: path.resolve(__dirname, './swagger.json'),
  apiFile: './app/api/baseApi.ts',
  apiImport: 'baseApi',
  outputFile: './app/api/kingdomApi.ts',
  exportName: 'kingdomApi',
  hooks: {queries: true, lazyQueries: true, mutations: true},
  flattenArg: true,
};

module.exports = config;
