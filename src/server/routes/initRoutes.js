import handleHealthCheck from '../../handlers/handleHealthCheck';
require('../../handlers');

export function initRoutes(server) {
  // health
  server.get('/health', handleHealthCheck);

  // categories
  server.get('/categories', handleGetCategoriesRequest)

  // recipes
  server.get('/recipes/:name', handleGetRecipeRequest);
  server.get('/recipes/categories/:category', handleGetRecipesByCategoryRequest);

  return server;
}
