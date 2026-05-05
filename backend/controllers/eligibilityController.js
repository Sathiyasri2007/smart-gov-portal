const Scheme = require('../models/Scheme');

exports.checkEligibility = async (req, res, next) => {
  try {
    const { age, income, category, occupation, state } = req.body;

    // Build eligibility query
    let query = { status: 'active' };

    // Check income eligibility
    if (income) {
      query.$or = [
        { 
          minIncome: { $lte: parseInt(income) }, 
          maxIncome: { $gte: parseInt(income) } 
        },
        { minIncome: { $exists: false }, maxIncome: { $exists: false } }
      ];
    }

    // Check age eligibility
    if (age) {
      const ageNum = parseInt(age);
      query.$and = [
        {
          $or: [
            { 'ageLimit.min': { $lte: ageNum }, 'ageLimit.max': { $gte: ageNum } },
            { 'ageLimit.min': { $exists: false }, 'ageLimit.max': { $exists: false } }
          ]
        }
      ];
    }

    // Fetch eligible schemes
    const schemes = await Scheme.find(query).select('-createdBy');

    // Additional filtering based on occupation and category
    const filteredSchemes = schemes.filter(scheme => {
      // Check if scheme description or eligibility mentions the occupation
      const schemeText = `${scheme.description} ${scheme.eligibility?.join(' ')}`.toLowerCase();
      
      if (occupation && occupation !== 'General') {
        const occupationMatch = schemeText.includes(occupation.toLowerCase());
        if (occupationMatch) return true;
      }

      // Check category mentions
      if (category && category !== 'General') {
        const categoryMatch = schemeText.includes(category.toLowerCase());
        if (categoryMatch) return true;
      }

      // Include schemes with no specific restrictions
      return true;
    });

    // Sort by relevance (schemes with more matching criteria first)
    const sortedSchemes = filteredSchemes.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      // Score based on income match
      if (a.minIncome && a.maxIncome) scoreA += 2;
      if (b.minIncome && b.maxIncome) scoreB += 2;

      // Score based on age match
      if (a.ageLimit?.min && a.ageLimit?.max) scoreA += 2;
      if (b.ageLimit?.min && b.ageLimit?.max) scoreB += 2;

      return scoreB - scoreA;
    });

    res.json({
      success: true,
      count: sortedSchemes.length,
      data: sortedSchemes,
      criteria: { age, income, category, occupation, state }
    });
  } catch (error) {
    next(error);
  }
};
