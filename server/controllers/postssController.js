const { queryResult } = require('pg-promise');
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

module.exports = postssController;
