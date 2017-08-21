# What is the store?

Single page applications have also made another programming paradigm
famous: flux. Under this paradigm, there is a central repository of
the state of the application (typically a javascript object). Even
though with React each component can keep a state object, this
practice is not recommended. Flux says that there must be one central
repository of the state of the application, components will grab the
data they need from this central state to display themselves, and they
will also emmit "actions", that ask the store to change itself.

The library we are going with for implementing the "flux" architecture
is [Redux](http://redux.js.org). All the code concerning the different
parts of redux is located at the `src/store` path.