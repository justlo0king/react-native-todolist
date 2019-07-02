import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import { TasksScreen, TaskCreateScreen } from './../components/tasks';

export const AppNavigator = createAppContainer(createStackNavigator({
  Tasks: {
    screen: TasksScreen,
    navigationOptions: {
      tabBarVisible: false,
      headerTransparent: true,
      title: false
    }
  },
  TasksCreate: {
    screen: TaskCreateScreen,
    navigationOptions: {
      title: 'New task'
    }
  }
}, {
  initialRouteName: 'Tasks'
}));
