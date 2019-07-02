import React, { Component } from 'react';
import { Button, Card, CardItem, H3, Left, Right, Text, View } from 'native-base';

import { TaskActions } from './../../actions';
import { StateComponent } from './../base';

export class TaskItem extends StateComponent {
  constructor(props) {
    super(props);
    this.state = {
      updating: false
    };
    this.handleToggleStatus = this.handleToggleStatus.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleToggleStatus() {
    const self = this;
    const { task, onListUpdated=()=>null } = this.props;
    if (!task || !task.get) {
      console.warn(`TaskItem.handleToggleStatus(): task is not a map: `, task);
      return null;
    }
    const taskId = task.get('_id') || '';
    if (!taskId) {
      console.warn(`TaskItem.handleToggleStatus(): task id not found in task: ${task}`);
      return null;
    }

    let status = task.get('status') || '';
    switch(status) {
    case 'pending':
      status = 'completed';
      break;
    default:
      status = 'pending';
      break;
    }

    return self.updateState({ updating: true }, () => {
      return TaskActions.update({
        taskId, status
      }, (error, result) => {
        self.updateState({ updating: false });
        if (error) {
          console.warn(`TaskItem.handleToggleStatus(): failed to change status, error: `, error);
        } else {
          if (typeof(onListUpdated)) {
            onListUpdated();
          }
        }
      });
    });
  }

  handleRemove() {
    const self = this;
    const { task, onListUpdated=()=>null } = this.props;
    if (!task || !task.get) {
      console.warn(`TaskItem.handleRemove(): task is not a map: `, task);
      return null;
    }

    const taskId = task.get('_id');
    return self.updateState({ updating: true }, () => {
      return TaskActions.remove({ taskId }, (error, result) => {
        self.updateState({ updating: false });
        if (error) {
          console.warn(`TaskItem.handleRemove(): failed to remove, error: `, error);
        } else {
          if (typeof(onListUpdated)) {
            onListUpdated();
          }
        }
      });
    });
  }

  renderStatusControl() {
    const { task } = this.props;
    if (!task || !task.get) {
      console.warn(`TaskItem.renderStatusControl(): task is not a map: `, task);
      return null;
    }
    const status = task.get('status') || '';
    switch(status) {
    case 'pending':
      return (
        <Button small onPress={this.handleToggleStatus}>
          <Text>Complete</Text>
        </Button>
      );
      break;
    case 'completed':
      break;
    }
    return (<View/>);
  }

  render() {
    const { task } = this.props;
    if (!task || !task.get) {
      console.warn(`TaskItem.render(): task is not a map: `, task);
      return null;
    }
    let taskId, name, description, status;

    name = task.get('name');
    description = task.get('description');
    status = task.get('status');
    return (
      <Card>
        <CardItem style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
            <Left>
              <H3>{name}</H3>
            </Left>
            <Right>
              <Text>{status}</Text>
            </Right>
          </View>

          <View style={{ flex: 1, width: '100%' }}>
            <Text>{description}</Text>
          </View>

          <View style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
            {this.renderStatusControl()}

            <Button small danger onPress={this.handleRemove}>
              <Text>Remove</Text>
            </Button>
          </View>
        </CardItem>
      </Card>
    );
  }
}
