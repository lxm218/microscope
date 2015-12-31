Posts = new Mongo.Collection('posts');

Posts.allow({
  insert: function(userID,doc) {
    return !! userID;
  }
});
