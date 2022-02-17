import {Block, renderBlock} from './block';

function isEqual(lhs: string, rhs: string): boolean {
    return lhs === rhs;
}

export class Route {
    private _pathname: string;
    readonly _blockClass: any;
    private _block: Block | null;
    private _props: { [key: string]: any };

    constructor(pathname: string, view: any, props: {}) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    leave(): void {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        this._block = new this._blockClass();
        renderBlock(this._props.rootQuery, this._block!);
    }
}

export class Router {
    private routes: Route[] | undefined;
    private history: History | undefined;
    private _currentRoute: Route | null | undefined;
    private _rootQuery: string | undefined;
    private static __instance: Router;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: any) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes!.push(route);
        return this;
    }

    start() {
        window.onpopstate = () => {
            this._onRoute(window.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return this.go('/404');
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route!.render();
    }

    go(pathname: string) {
        this.history!.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history!.back();
    }

    forward() {
        this.history!.forward();
    }

    getRoute(pathname: string) {
        return this.routes!.find(route => route.match(pathname));
    }
}
