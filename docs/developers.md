# Genieus Web Developer Guide

Genieus web is implemented in React. React can be a complicated
technology, as it depends on a number of accessory but vital tools for
like code transpilation (taking the JSX you write and turning it into
valid JS), bundlers (taking a bunch of your files and making them into
something that can be delivered efficiently to the users), and more.

# What we use

We use:

- Babel for code transpliation
- Webpack as our module bundler
- Curi for routing
- jQuery for Ajax and other stuff
- Redux as the store

# What you need to start developing

You need to have NodeJS installed. You'll want to make sure that you
run a `npm install` in a console while inside this repo's directory.

# A quick directory structure tour

If you are looking at the root of the repo, you mainly have to be interested
in the `src/` directory. This directory contains the `.js` and `.jsx` files
that make up the single page application. Inside of the `src/` directory there
exists a `components` directory. The `components` directory contains one source
`.jsx` file per React component. The components are further grouped into
subdirectories depending on the role the play in the app:

- The `nav` components deal with taking the user from one section of the app
  to another.
- The components in `page` are components that are mant to be a page displayed
  at a specific route.

# The server

The Genieus web application is only the facade of the whole
system. Ultimately, users actions are sent to a server where they are
processed, in turn, the server sends responses that the application
uses to show a change in the UI. The server is currently distributed
as a docker image. All you need to do to get is running is to have docker
installed, and run

```
docker pull pmunoz/genieus-api
```

This initial command merely downloads the image to your computer. Next
you need to actually put that image to use, for which you need the
command

```
docker run -d -p 5000:5000
```

Provided that you don't have any other applications running on port
5000, everything should work. You might be interested in looking up
additional docker concepts like how to list running containers or kill
them.

# The app development commands

In production, the html, js and css that makes up the web application
will be served by a server. However, in development we want to use
local versions of the app so that any changes you make are immediately
reflected in a browser. For you to start developing you need to
run the command

```
npm run dev
```

This will kick webpack in "watch" mode, so that every time you modify
a file it does it's thing and refereshes the browser. You will be able
to find the app by going to `localhost:8080`
