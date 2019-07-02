import React, { Component } from 'react';
import { Map as ImmutableMap, List as ImmutableList } from 'immutable';
import {
  Body, Button, Container, Content, Header, Icon, List, Right, Spinner, Text, Title, Subtitle, View
} from 'native-base';

import { StateComponent } from './../base';
import { TaskActions } from './../../actions';
import { TaskItem } from './';

export class TasksScreen extends StateComponent {
  constructor(props) {
    super(props);
    this.state = {
      tasks: ImmutableList([]),
      loading: true,
      error: null
    };
    this.handleCreateTask = this.handleCreateTask.bind(this);
    this.load = this.load.bind(this);
  }

  componentDidMount() {
    this._mounted = true;
    const self = this;
    setTimeout(() => {
      self.load();
    }, 100);
  }
  componentWillUnmount() {
    this._mounted = false;
  }

  load() {
    const self = this;
    console.log(`TasksScreen.load(): loading tasks`);
    self.updateState({
      loading: true, error: null
    }, () => {
      TaskActions.list({}, (error, tasks) => {
        if (error) {
          console.warn(`TasksScreen.load(): loading tasks error: `, error);
          self.updateState({
            loading: false, error
          });
        } else {
          console.log(`TasksScreen.load(): loaded tasks: ${tasks}`);
          self.updateState({
            loading: false, error: null, tasks
          });
        }
      });
    });
  }

  handleCreateTask() {
    const { navigation } = this.props;
    navigation.navigate('TasksCreate', {
      onListUpdated: this.load
    });
  }

  renderError() {
    const { error=null } = this.state;
    if (!error) {
      return null;
    }

    const errorMessage = (typeof(error) == 'string' && error) || (typeof(error) == 'object' && error.message) || 'Tasks error';
    return (
      <Text style={{ backgroundColor: 'red', color: 'white', padding: 10 }}>
        {errorMessage}
      </Text>
    );
  }

  renderItems() {
    const { navigation } = this.props;
    const { tasks=ImmutableList([]) } = this.state;

    if (!tasks || !tasks.get) {
      console.warn(`TasksScreen.renderItems(): tasks is not a map: `, tasks);
      return null;
    }

    console.log(`TasksScreen.renderItems(): total: ${tasks.size}`);

    let itemId;
    return tasks.map((item) => {
      itemId = item && item.get && item.get('_id');
      if (!itemId) {
        console.warn(`TasksScreen.renderItems(): item is not a map:, `, item);
        return null;
      }

      return (
        <TaskItem
          key={itemId}
          task={item}
          navigation={navigation}
          onListUpdated={this.load}
          />
      );
    });
  }

  renderContent() {
    const { loading=false, error=null, tasks=ImmutableList([]) } = this.state;
    if (loading) {
      return (
        <Spinner />
      );
    }

    if (!tasks || !tasks.get) {
      console.warn(`TasksScreen.renderContent(): tasks is not a map: `, tasks);
      return null;
    }
    if (error) {
      return null;
    }

    const total = tasks.size || 0;
    if (!total) {
      return (
        <Text style={{ padding: 10 }}>
          No tasks have been created
        </Text>
      );
    }

    return (
      <List>
        {this.renderItems()}
      </List>
    );
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>List of tasks</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.handleCreateTask}>
              <Icon name='add' />
              <Text>Create</Text>
            </Button>
          </Right>
        </Header>

        <Content>
          {this.renderError()}
          {this.renderContent()}
        </Content>
      </Container>
    );
  }
}
