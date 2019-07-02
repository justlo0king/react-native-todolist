import { Map as ImmutableMap, List as ImmutableList } from 'immutable';

import randomstring from './../core/RandomString';
import { Database } from './../core/Database';

export const TaskActions = {
  create(params, callback=()=>null) {
    let { name='', description='', status='' } = params || {};
    name = typeof(name) == 'string' ? name.trim() : '';
    if (!name) {
      return callback('Name can not be empty');
    }
    description = typeof(description) == 'string' ? description.trim() : '';
    status = status ? status : 'pending';
    const timestamp = Date.now();
    const taskId = randomstring(24);
    console.log(`TaskActions.create(): taskId: ${taskId}`);

    return Database.db.insert({
      _id: taskId, name, description, status, createdAt: timestamp, changedAt: timestamp
    }, (error, result) => {
      if (error) {
        console.warn(`TaskActions.create(): failed to insert document, error: `, error);
        return callback(error);
      }

      console.log(`TaskActions.create(): created document, result: `, result);
      return callback(null, result);
    });
  },

  update(params, callback=()=>null) {
    let { taskId, name, description, status } = params || {};
    taskId = typeof(taskId) == 'string' ? taskId.trim() : '';
    if (!taskId) {
      return callback('Task ID can not be empty');
    }

    return Database.db.find({ _id: taskId }, (error, tasks) => {
      if (error) {
        console.warn(`TaskActions.update(): failed to find task, error: `, error);
        return callback('failed to fetch task');
      }
      const [ task={} ] = tasks || [];
      console.log(`TaskActions.update(): task to update: `, task);

      const modifier = Object.assign({}, task, params);
      console.log(`TaskActions.update(): modifier: `, modifier);

      modifier.name = typeof(modifier.name) == 'string' ? modifier.name.trim() : '';
      if (!modifier.name) {
        return callback('Name can not be empty');
      }

      modifier.description = typeof(modifier.description) == 'string' ? modifier.description.trim() : '';
      modifier.status = modifier.status ? modifier.status : 'pending';
      modifier.changedAt = Date.now();
      console.log(`TaskActions.update(): taskId: ${taskId}`);

      return Database.db.update({ _id: taskId }, modifier, (error, result) => {
        if (error) {
          console.warn(`TaskActions.update(): failed to insert document, error: `, error);
          return callback(error);
        }

        console.log(`TaskActions.update(): updated document, result: `, result);
        return callback(null, result);
      });
    });
  },

  remove({ taskId }, callback=()=>null) {
    return Database.db.remove({ _id: taskId }, (error, result) => {
      if (error) {
        console.log(`TaskActions.remove(): failed to remove taskId: ${taskId}, error: `, error);
        return callback(error);
      } else {
        console.log(`TaskActions.remove(): removed taskId: ${taskId}`);
        return callback(null);
      }
    });
  },

  list(query={}, callback=()=>null) {
    console.log(`TaskActions.list(): query: `, query);
    return Database.db.find({}, (error, result) => {
      if (error) {
        console.warn(`TaskActions.list(): error: `, error);
        return callback(error);
      }
      console.log(`TaskActions.list(): result: `, result);
      let data = ImmutableList([]);
      result.map((item) => {
        data = data.push(ImmutableMap(item));
      });
      return callback(null, data, result);
    });
  }
};
