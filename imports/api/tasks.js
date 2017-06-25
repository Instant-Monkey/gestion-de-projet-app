import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {

  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find();
  });
}

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
  },/*
  'hashTags.insert'(){
    console.log("i'm here");
  }*/
});
