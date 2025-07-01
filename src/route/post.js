const express = require('express');
const router = express.Router();
const {isViewedPost} = require('../app/midlewares/checkViewedMidleware');

const postController = require('../app/controllers/postController');

router.get('/post-listing',postController.showListPost);
router.get('/:slug',isViewedPost,postController.showPost);
module.exports = router;