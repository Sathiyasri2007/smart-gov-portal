const Scheme = require('../models/Scheme');
const { validationResult } = require('express-validator');

exports.getAllSchemes = async (req, res, next) => {
  try {
    const { 
      search, 
      category, 
      status, 
      minIncome, 
      maxIncome, 
      ageGroup, 
      state, 
      occupation,
      sortBy,
      sortOrder 
    } = req.query;
    
    let query = {};

    // Text search in name, description, and benefits
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { benefits: { $regex: search, $options: 'i' } },
        { eligibility: { $regex: search, $options: 'i' } }
      ];
    }

    // Category filter
    if (category && category !== 'all') {
      query.category = category;
    }

    // Status filter (default to active)
    if (status) {
      query.status = status;
    } else {
      query.status = 'active';
    }

    // Income range filter
    if (minIncome || maxIncome) {
      query.$and = query.$and || [];
      
      if (minIncome) {
        query.$and.push({
          $or: [
            { minIncome: { $lte: parseInt(minIncome) } },
            { minIncome: { $exists: false } }
          ]
        });
      }
      
      if (maxIncome) {
        query.$and.push({
          $or: [
            { maxIncome: { $gte: parseInt(maxIncome) } },
            { maxIncome: { $exists: false } }
          ]
        });
      }
    }

    // Age group filter
    if (ageGroup && ageGroup !== 'all') {
      const ageRanges = {
        'youth': { min: 18, max: 35 },
        'adult': { min: 36, max: 60 },
        'senior': { min: 60, max: 100 }
      };
      
      if (ageRanges[ageGroup]) {
        query.$and = query.$and || [];
        query.$and.push({
          $or: [
            { 
              minAge: { $lte: ageRanges[ageGroup].max },
              maxAge: { $gte: ageRanges[ageGroup].min }
            },
            { minAge: { $exists: false }, maxAge: { $exists: false } }
          ]
        });
      }
    }

    // State filter
    if (state && state !== 'all') {
      query.$or = query.$or || [];
      query.$or.push(
        { applicableStates: { $in: [state] } },
        { applicableStates: { $exists: false } },
        { applicableStates: { $size: 0 } }
      );
    }

    // Occupation filter
    if (occupation && occupation !== 'all') {
      query.targetOccupations = { $in: [occupation] };
    }

    // Sorting
    let sortOptions = {};
    if (sortBy) {
      switch (sortBy) {
        case 'name':
          sortOptions.name = 1;
          break;
        case 'deadline':
          sortOptions.deadline = 1;
          break;
        case 'newest':
          sortOptions.createdAt = -1;
          break;
        default:
          sortOptions.createdAt = -1;
      }
    } else {
      sortOptions.createdAt = -1;
    }

    const schemes = await Scheme.find(query)
      .populate('createdBy', 'name email')
      .sort(sortOptions);

    res.json({
      success: true,
      count: schemes.length,
      data: schemes,
      filters: {
        search,
        category,
        minIncome,
        maxIncome,
        ageGroup,
        state,
        occupation,
        sortBy,
        sortOrder
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getScheme = async (req, res, next) => {
  try {
    const scheme = await Scheme.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: 'Scheme not found'
      });
    }

    res.json({
      success: true,
      data: scheme
    });
  } catch (error) {
    next(error);
  }
};

exports.createScheme = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    req.body.createdBy = req.user.id;
    const scheme = await Scheme.create(req.body);

    res.status(201).json({
      success: true,
      data: scheme
    });
  } catch (error) {
    next(error);
  }
};

exports.updateScheme = async (req, res, next) => {
  try {
    let scheme = await Scheme.findById(req.params.id);

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: 'Scheme not found'
      });
    }

    scheme = await Scheme.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      data: scheme
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteScheme = async (req, res, next) => {
  try {
    const scheme = await Scheme.findById(req.params.id);

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: 'Scheme not found'
      });
    }

    await scheme.deleteOne();

    res.json({
      success: true,
      message: 'Scheme deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

exports.getRecommendedSchemes = async (req, res, next) => {
  try {
    const user = req.user;
    let query = { status: 'active' };

    if (user.income) {
      query.$or = [
        { minIncome: { $lte: user.income }, maxIncome: { $gte: user.income } },
        { minIncome: { $exists: false }, maxIncome: { $exists: false } }
      ];
    }

    const schemes = await Scheme.find(query).limit(10);

    res.json({
      success: true,
      count: schemes.length,
      data: schemes
    });
  } catch (error) {
    next(error);
  }
};
