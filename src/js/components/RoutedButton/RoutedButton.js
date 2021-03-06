import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '../Button';

class RoutedButton extends Component {
  static contextTypes = {
    router: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    method: 'push',
  };

  onClick = (event, ...args) => {
    const { method, onClick, path } = this.props;
    const { router } = this.context;
    if (event) {
      const modifierKey = event.ctrlKey || event.metaKey;

      // if the user right-clicked in the button we should let it go
      if (modifierKey) {
        return;
      }
    }
    if (router) {
      event.preventDefault();
      (router.history || router)[method](path);
    }
    if (onClick) {
      onClick(event, ...args);
    }
  };

  render() {
    const { href, path, method, onClick, ...rest } = this.props;
    return (
      <Button
        {...rest}
        href={path || href}
        disabled={!path && !onClick}
        onClick={this.onClick}
      />
    );
  }
}

let RoutedButtonDoc;
if (process.env.NODE_ENV !== 'production') {
  RoutedButtonDoc = require('./doc').doc(RoutedButton); // eslint-disable-line global-require
}
const RoutedButtonWrapper = RoutedButtonDoc || RoutedButton;

export { RoutedButtonWrapper as RoutedButton };
