import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const PostIts = new Mongo.Collection('postIts');

if (Meteor.isServer) {

  Meteor.publish('postIts', function postItsPublication() {
    return PostIts.find();
  });
}

Meteor.methods({
  'postIt.insert'(title) {
    check(title, String);

    PostIts.insert({
      title,
      hashTags: [],
      createdAt: new Date()
    });
  },
  'update.PostItHashTags'(postIt_id, hashTag_id) {
    PostIts.update(postIt_id, {
      $push: {hashTags: hashTag_id}
    });
  },
  'postIts.remove'(postItId){ 
    PostIts.remove(postItId);
  }
});
