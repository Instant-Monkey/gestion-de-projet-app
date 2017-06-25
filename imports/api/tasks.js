import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  'tasks.insert'(task, postIt_id) {
    check(task, String);

    Tasks.insert({
      text: task,
      postIt_id: postIt_id,
      archived: false,
      createdAt: new Date()
    });
  },
  'tasks.archive'(task_id) {
    Tasks.update(task_id, {
      $set: {archived: true}
    });
  }
});
