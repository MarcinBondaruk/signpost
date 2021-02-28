const paramRegExp = new RegExp(/^:[a-zA-Z0-9]*$/);

class Router
{
    constructor(routes) {
        this._routes = [];
        this._setRoutes(routes);
    }

    _setRoutes(routes) {
        const allowedProperties = [
            'path',
            'method',
            'controller',
            'action'
        ];

        if (!Array.isArray(routes)) {
            throw 'Routes must be array.';
        }

        routes.forEach((route) => {
            if (typeof route !== 'object') {
                throw 'route definition must be an object'
            }

            allowedProperties.forEach((property) => {
                if (!route.hasOwnProperty(property)) {
                    throw `Missing property ${property}`;
                }
            });

            this._routes.push(route);
        });
    }

    _isParameter(pathPart) {
        return paramRegExp.test(pathPart);
    }

    match(url, method) {
        const urlSplit = url.split('/');
        const params = [];
        let foundRoute = undefined;

        for (let i = 0; i < this._routes.length; i++) {
            let matched = true;
            const pathSplit = this._routes[i].path.split('/');

            if (urlSplit.length !== pathSplit.length) {
                matched = false;
                continue;
            }

            for (let i = 0; i < urlSplit.length; i++) {
                if (this._isParameter(pathSplit[i])) {
                    params.push(urlSplit[i]);
                    continue;
                }

                if (urlSplit[i] === pathSplit[i]) {
                    continue;
                }

                matched = false;
                params = [];
                break;
            }

            if (matched) {
                foundRoute = this._routes[i];
                break;
            }
        }

        if (!foundRoute) {
            return false;
        }

        if (foundRoute.method !== method) {
            return false;
        }

        return {
            route: foundRoute,
            params: params
        };
    }
}

module.exports = Router;