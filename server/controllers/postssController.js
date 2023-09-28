const db = require('../db');

const postssController = {};

postssController.getLikes = async function (req, res, next) {
  let { bestInteger } = req.body;
  // console.log("req", req.body)

  try {
    console.log('bestInteger', bestInteger);

    //get post row from database
    const queryStr1 = 'SELECT likes FROM posts WHERE id = $1';

    const postId = await db.query(queryStr1, [bestInteger]);

    //update that row in database by incrementing likes
    console.log('current likes', postId);

    const queryStr2 = 'UPDATE posts SET likes = $1 WHERE id = $2 RETURNING *';

    const newLikesCount = postId[0].likes + 1;

    const update = await db.query(queryStr2, [newLikesCount, bestInteger]);

    res.locals.objToUpdate = update;
    console.log('updated likes', update);
    return next();
  } catch {
    return next({
      log: "couldn't update likes",
      message: "oof couldn't update likes",
    });
  }
};

postssController.retrieveInfo = async function (req, res, next) {
  try {
    const queryPost = 'SELECT * FROM "posts"';

    const postInfo = await db.query(queryPost);
    res.locals.postInfo = postInfo;
    next();
  } catch {
    return next({
      log: "couldn't update likes",
      message: "oof couldn't update likes",
    });
  }
};

postssController.addComment = async function (req, res, next) {
  console.log('im in the addComment middleware func');

  try {
    const { postId, comment } = req.body;
    console.log('in the try block', postId, comment);

    const queryString =
      'INSERT INTO comments(comment, post_id) VALUES ($1, $2) RETURNING *';

    const addedComment = await db.query(queryString, [comment, postId]);

    console.log('made the query', addedComment);

    res.locals.addedComment = addedComment;

    return next();
  } catch {
    return next({
      log: 'error in addComment middleware function',
      message: 'error in addComment middleware function',
    });
  }
};

postssController.getComments = async function (req, res, next) {
  console.log('inside comments');
  try {
    console.log('inside try block');
    const allComments = 'SELECT * FROM "comments"';
    const getAllComments = await db.query(allComments);
    console.log('after query');
    res.locals.commentsInfo = getAllComments;
    console.log(res.locals.commentsInfo);
    next();
  } catch {
    return next({
      log: 'error in getComments middleware function',
      message: 'error in getComments middleware function',
    });
  }
};

module.exports = postssController;
