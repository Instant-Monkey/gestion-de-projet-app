import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const PostIts = new Mongo.Collection('postIts');

if (Meteor.isServer) {

  Meteor.publish('postIts', function tasksPublication() {
    return PostIts.find();
  });
}
