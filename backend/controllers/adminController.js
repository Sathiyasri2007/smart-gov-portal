const User = require('../models/User');
const Scheme = require('../models/Scheme');
const Application = require('../models/Application');

exports.getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalSchemes = await Scheme.countDocuments();
    const totalApplications = await Application.countDocuments();
    const pendingApplications = await Application.countDocuments({ status: 'pending' });
    const approvedApplications = await Application.countDocuments({ status: 'approved' });
    const rejectedApplications = await Application.countDocuments({ status: 'rejected' });

    res.json({
      success: true,
      data: {
        totalUsers,
        totalSchemes,
        totalApplications,
        pendingApplications,
        approvedApplications,
        rejectedApplications
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getAnalytics = async (req, res, next) => {
  try {
    const applicationsByStatus = await Application.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const applicationsByScheme = await Application.aggregate([
      {
        $group: {
          _id: '$scheme',
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'schemes',
          localField: '_id',
          foreignField: '_id',
          as: 'schemeDetails'
        }
      },
      {
        $unwind: '$schemeDetails'
      },
      {
        $project: {
          schemeName: '$schemeDetails.name',
          count: 1
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      }
    ]);

    const applicationsByCategory = await Application.aggregate([
      {
        $lookup: {
          from: 'schemes',
          localField: 'scheme',
          foreignField: '_id',
          as: 'schemeDetails'
        }
      },
      {
        $unwind: '$schemeDetails'
      },
      {
        $group: {
          _id: '$schemeDetails.category',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    const monthlyApplications = await Application.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': -1, '_id.month': -1 }
      },
      {
        $limit: 12
      }
    ]);

    res.json({
      success: true,
      data: {
        applicationsByStatus,
        applicationsByScheme,
        applicationsByCategory,
        monthlyApplications
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: 'user' })
      .select('-password')
      .sort('-createdAt');

    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};
