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

    if ( existingHashTag) {
      let isHashTagAlreadyInPostIt = false ;

      //go through array of postIt to see if the hashtag already exist in current postIt
      existingHashTag.postIt_ids.map((arrObj) => {
        if (arrObj._str == postIt_id ) {
          isHashTagAlreadyInPostIt = true;
        }
      });

      //if it doesn't exist add the postId to hashtag
      if (!isHashTagAlreadyInPostIt) {
        HashTags.update(existingHashTag._id, {
          $push: {postIt_ids: postIt_id}
        });
      }

    } else {
      HashTags.insert({
        hashTag,
        postIt_ids: [postIt_id],
        createdAt: new Date()
      });
    }
  }

});
