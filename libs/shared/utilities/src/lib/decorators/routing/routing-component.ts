/***
 * Routing components storage
 * @type {Map<string, Function>}
 */
export let routingComponents = new Map<string, Object>();

/***
 * Decorator function
 * @returns {function(any): *}
 * @constructor
 */
export function RoutingComponent(name?: string) {
  return function (target:any) {
    routingComponents.set(name || target.name, target);
    return target;
  }
}
