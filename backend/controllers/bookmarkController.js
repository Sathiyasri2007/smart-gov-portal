const User = require('../models/User');

exports.toggleBookmark = async (req, res, next) => {
  try {
    const { schemeId } = req.body;
    const user = await User.findById(req.user.id);

    const bookmarkIndex = user.bookmarkedSchemes.indexOf(schemeId);
    
    if (bookmarkIndex > -1) {
      // Remove bookmark
      user.bookmarkedSchemes.splice(bookmarkIndex, 1);
      await user.save();
      res.json({
        success: true,
        message: 'Bookmark removed',
        bookmarked: false
      });
    } else {
      // Add bookmark
      user.bookmarkedSchemes.push(schemeId);
      await user.save();
      res.json({
        success: true,
        message: 'Scheme bookmarked',
        bookmarked: true
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.getBookmarkedSchemes = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('bookmarkedSchemes');

    res.json({
      success: true,
      count: user.bookmarkedSchemes.length,
      data: user.bookmarkedSchemes
    });
  } catch (error) {
    next(error);
  }
};
