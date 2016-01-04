Posts = new Mongo.Collection('posts');

Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userID(),string);
    check(postAttributes,{
      title: string,
      url: string
    });
    var user = Meteor.user();
    var post = _.extend(postAttributes,{
      userID: user._id,
      author: user.username,
      submitted: new Date()
    });
    var postID = Posts.insert(post);
    return {
      _id: postID
    };
  }
});
