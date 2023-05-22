/**
 * Builds a route string by replacing placeholders in the route with values from an interpolation object.
 * @param route The route string with placeholders.
 * @param interpolationObject The object containing values to replace the placeholders.
 * @returns The updated route string with replaced values.
 */
export const buildRoute = (route: string, interpolationObject: object) => {
  try {
    Object.entries(interpolationObject).forEach(([key, value]) => {
      route = route.replace(':' + key, value.toString());
    });
  } catch (error) {
    console.error(
      'error while setting values to string: ',
      route,
      ' with object: ',
      interpolationObject,
      'error: ',
      error,
    );
  }
  return route;
};
