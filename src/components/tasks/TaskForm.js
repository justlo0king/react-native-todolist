import React, { Component } from 'react';
import { Body, Button, Content, Form, Input, Item, Label, Text, Textarea } from 'native-base';

import { StateComponent } from './../base';
import { TaskActions } from './../../actions';

const initialState = {
  taskId: '',
  name: '',
  description: '',
  saving: false,
  error: null
};

export class TaskForm extends StateComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.onSubmit = this.onSubmit.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onCancel() {
    const { navigation } = this.props;
    navigation.navigate('Tasks');
  }

  onSubmit() {
    const { navigation } = this.props;
    const { taskId='', name, description } = this.state;
    const onListUpdated = navigation.getParam('onListUpdated');
    console.log(`TaskForm.onSubmit(): taskId: ${taskId}, name: ${name}, onListUpdated: `, onListUpdated);
    this.updateState({
      saving: true
    }, (() => {
      const modifier = { name, description };
      if (taskId) {
        TaskActions.save(taskId, modifier, (error, result) => {
          this.updateState({
            saving: false,
            error
          }, () => {
            if (!error) {
              navigation.navigate('Tasks');
            }
          });
        });
      } else {
        TaskActions.create(modifier, (error, result) => {
          this.updateState({
            saving: false,
            error
          }, () => {
            if (typeof(onListUpdated) == 'function') {
              onListUpdated();
            }
            if (!error) {
              navigation.navigate('Tasks');
            }
          });
        });
      }
    }));
  }
  onNameChange(name) {
    this.updateState({ name });
  }
  onDescriptionChange(description) {
    this.updateState({ description });
  }

  renderError() {
    const { error=null } = this.state;
    if (!error) {
      return null;
    }

    const errorMessage = typeof(error) == 'object' && error.message || typeof(error) == 'string' && error || 'Tasks error';
    return (
      <Text style={{ backgroundColor: 'red', color: 'white', padding: 10 }}>
        {errorMessage}
      </Text>
    );
  }

  render() {
    const { name, description, saving } = this.state;
    return (
      <Content>
        {this.renderError()}
        <Form onSubmit={this.onSubmit}>
          <Text>{saving ? 'saving' : ''}</Text>
          <Item stackedLabel>
            <Label>Name</Label>
            <Input
              value={name}
              style={{ textAlign: 'left', marginLeft: 20, marginRight: 20 }}
              onChangeText={this.onNameChange}
              />
          </Item>

          <Item stackedLabel>
            <Label>Description</Label>
            <Textarea
              value={description}
              rowSpan={5}
              style={{ width: '94%' }}
              onChangeText={this.onDescriptionChange}
              />
          </Item>

          <Item style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginRight: 20 }}>
            <Button danger onPress={this.onCancel}>
              <Text>Cancel</Text>
            </Button>

            <Button success onPress={this.onSubmit}>
              <Text>Save</Text>
            </Button>
          </Item>
        </Form>
      </Content>
    );
  }
}
