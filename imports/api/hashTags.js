import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const HashTags = new Mongo.Collection('hashTags');

if (Meteor.isServer) {

  Meteor.publish('hashTags', function hashTagsPublication() {
    return HashTags.find();
  });

}

Meteor.methods({
  'hashTags.insert'(hashTag, postIt_id) {
    check(hashTag, String);

    const existingHashTag = HashTags.findOne( { hashTag: hashTag}) ;

    if ( existingHashTag ) {
      HashTags.update(existingHashTag._id, {
        $push: {postIt_ids: postIt_id}
      });
    } else {
      HashTags.insert({
        hashTag,
        postIt_ids: [postIt_id],
        createdAt: new Date()
      });
    }
  }

});
