# Webpack and how we use it

Webpack make use of the `webpack.config.js` file that is in the root
of the repo. This file defines how webpack is configured for this
project.

# Where does Babel play a role?

Babel is hooked into webpack as a "loader", which you can think of as
middleware that webpack uses to process your code for those files
whose name match a regular expresion (see the `test` property of the
loader).

# How does webpack help development?

When you run the `npm run dev` command, you start webpack in watch
mode, which upon any file changes, will recompile the bundle and
referesh your page.