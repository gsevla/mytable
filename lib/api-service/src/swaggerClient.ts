import SwaggerClient from 'swagger-client';

type Methods = {
  [key: string]: (args: unknown) => unknown;
};

type Resources = {
  [key: string]: Methods;
};

export default new SwaggerClient('http://localhost:3000/docs-json').then(
  (response) => {
    // console.log('## swagger-client', response);

    const { apis } = response;

    delete apis.default; // remove default unneeded resource

    const resources = Object.entries(apis).reduce(
      (resourcesAccu, [resource, methods]) => {
        const cleanedMethods = Object.entries(methods).reduce(
          (methodsAccu, [methodName, method]) => {
            const cleanedMethodName = methodName.slice(
              methodName.indexOf('_') + 1
            );

            methodsAccu[cleanedMethodName] = method;

            return methodsAccu;
          },
          {}
        );

        resourcesAccu[resource] = cleanedMethods;

        return resourcesAccu;
      },
      {}
    );

    return resources;

    // console.log('## resources', resources);

    // apis.restaurant.RestaurantController_getRestaurant().then((restaurant) => {
    //   console.log('## restaurant', restaurant.data);
    // });
  }
);
