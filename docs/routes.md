# Routing

An important part of any application is how the routes, i.e. the urls
will take you to different sections. In single page applications this
is specially tricky.

We've chosen to go with `curi` as the library to handle our routes. Even
though it is somewhat new on the block we like the way it handles things.
You can find its repo [here](https://github.com/pshrmn/curi).

If you are interested in the routes code start by looking at the
[routes.jsx](../src/routes.jsx) and [main.js](../src/main.js) files to
get a hang of how we do routes. In short, `routes.jsx` defines an
array of objects, each of which describes a route and whose `body`
property returns the react component that we want that route to
display. In the `main.js` file the router is configured and a top
level `<Navigator>` component is rendered on the page. The
`<Navigator>` component has logic to render whatever component
corresponds to the current route in its `render` property. It is
important to point out that any component that uses route aware stuff,
e.g. a `<Link>` component needs to live inside the `<Navigator>`
component as the latter provides context about the routes.