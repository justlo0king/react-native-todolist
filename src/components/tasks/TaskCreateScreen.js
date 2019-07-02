import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';

import { TaskForm } from './';

export class TaskCreateScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Content>
          <TaskForm
            navigation={navigation}
            />
        </Content>
      </Container>
    );
  }
};
