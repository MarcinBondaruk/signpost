const { test, expect } = require('@jest/globals');
const Router = require('../lib/router');

test('find correct static route', () => {
    //GIVEN

    const routes = [
        {
            path: "/users",
            method: "POST",
            controller: "UserController",
            action: "registerUser"
        },
        {
            path: "/users/:userId",
            method: "GET",
            controller: "UserController",
            action: "registerUser"
        }
    ];

    const router = new Router(routes);

    // WHEN
    const result = router.match('/users', 'POST');

    // THEN
    expect(result.route).toEqual(routes[0]);
});

test('find correct dynamic path', () => {
    // GIVEN
    const routes = [
        {
            path: "/users",
            method: "POST",
            controller: "UserController",
            action: "registerUser"
        },
        {
            path: "/users/:userId",
            method: "GET",
            controller: "UserController",
            action: "registerUser"
        }
    ];

    const router = new Router(routes);

    // WHEN
    const result = router.match('/users/123', 'GET');

    // THEN
    expect(result.route).toEqual(routes[1]);
    expect(result.params).toEqual(['123']);
});