/*
 * The home component manages the homepage of the application.
 */

import React from 'react';

export default class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <h1 style={ headerStyle }>Welcome to genieus!</h1>
        </div>
      </div>
    );
  }
}

const headerStyle = {
  color: "#AB2EE6"
}
