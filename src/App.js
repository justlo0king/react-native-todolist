import React, { Component } from 'react';
import { Root } from 'native-base';

import { AppNavigator } from './navigators/AppNavigator';
import { Database } from './core/Database';

export default class App extends Component {
  componentDidMount() {
    console.log(`App.componentDidMount(): initializing DB`);
    Database.initialize();
  }

  componentWillUnmount() {
    Database.close();
    //console.log(`App.componentWillUnmount();`);
  }
  render() {
    return (
      <Root>
        <AppNavigator />
      </Root>
    );
  }
}
