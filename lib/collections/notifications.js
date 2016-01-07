Notifications = new Mongo.Collection('notifications');

Notifications.allow ({
  update: function (userId, doc, fieldName) {
    return ownsDocument(userId, doc) &&
      fieldName.length === 1 && fieldName[0] === 'read';
  }
});

createCommentNotification = function(comment) {
  var post = Posts.findOne(comment.postId);
  if(comment.userId !== post.userId) {
    Notifications.insert({
      userId: post.userId,
      postId: post._id,
      commentId: comment._id,
      commenterId: comment.author,
      read: false
    })
  }
}
