const express = require('express');
const { toggleBookmark, getBookmarkedSchemes } = require('../controllers/bookmarkController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/toggle', toggleBookmark);
router.get('/', getBookmarkedSchemes);

module.exports = router;
