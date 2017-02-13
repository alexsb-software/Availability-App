import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from "@angular/router";

export class StateSaverRouter implements RouteReuseStrategy {
    handlers: { [key: string]: DetachedRouteHandle } = {};
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        //console.debug('StateSaverRouter:shouldDetach', route);
        return true;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        //console.debug('StateSaverRouter:store', route, handle);
        this.handlers[route.routeConfig.path] = handle;
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        //console.debug('StateSaverRouter:shouldAttach', route);
        return !!route.routeConfig && !!this.handlers[route.routeConfig.path];
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        //console.debug('StateSaverRouter:retrieve', route);
        if (!route.routeConfig) return null;
        return this.handlers[route.routeConfig.path];
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        //console.debug('StateSaverRouter:shouldReuseRoute', future, curr);
        return future.routeConfig === curr.routeConfig;
    }
}