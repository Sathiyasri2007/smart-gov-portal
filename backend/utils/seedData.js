const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Scheme = require('../models/Scheme');

dotenv.config();

const sampleSchemes = [
  {
    name: 'Pradhan Mantri Awas Yojana',
    description: 'Housing for All scheme providing financial assistance for construction of houses to eligible beneficiaries. The scheme aims to provide pucca houses with basic amenities to all houseless and those living in kutcha houses.',
    category: 'Housing',
    eligibility: [
      'Annual household income below ₹3 lakhs for EWS',
      'Annual household income between ₹3-6 lakhs for LIG',
      'First-time home buyer',
      'Indian citizen',
      'No pucca house in family name'
    ],
    benefits: 'Interest subsidy on home loans ranging from ₹2.67 lakhs for EWS/LIG categories. Direct financial assistance for house construction.',
    requiredDocuments: [
      'Aadhaar Card',
      'Income Certificate',
      'Property Documents',
      'Bank Account Details',
      'Passport Size Photos'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active',
    minIncome: 0,
    maxIncome: 600000
  },
  {
    name: 'Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana',
    description: 'World\'s largest health insurance scheme providing coverage of ₹5 lakhs per family per year for secondary and tertiary care hospitalization. Covers over 10 crore poor and vulnerable families.',
    category: 'Healthcare',
    eligibility: [
      'Families identified as per SECC 2011 database',
      'BPL card holders',
      'Annual income below ₹2.5 lakhs',
      'No existing health insurance'
    ],
    benefits: 'Free healthcare coverage up to ₹5 lakhs per family per year. Covers 1,393 procedures including hospitalization, medicines, and diagnostics.',
    requiredDocuments: [
      'Aadhaar Card',
      'Ration Card',
      'Income Certificate',
      'Family ID Proof'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active',
    minIncome: 0,
    maxIncome: 250000
  },
  {
    name: 'PM Kisan Samman Nidhi',
    description: 'Direct income support scheme for farmers providing ₹6000 per year in three equal installments. Aims to supplement financial needs of farmers for procuring various inputs.',
    category: 'Agriculture',
    eligibility: [
      'Small and marginal farmers',
      'Land ownership proof required',
      'Cultivable land holding',
      'Indian citizen farmer'
    ],
    benefits: '₹6000 per year paid in three installments of ₹2000 each directly to bank account. No upper limit on family income.',
    requiredDocuments: [
      'Aadhaar Card',
      'Land Ownership Documents',
      'Bank Account Details',
      'Passport Size Photo'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active'
  },
  {
    name: 'National Scholarship Portal',
    description: 'Centralized scholarship scheme for students from various categories including SC/ST/OBC/Minorities. Covers pre-matric, post-matric, and merit-based scholarships.',
    category: 'Education',
    eligibility: [
      'Students from SC/ST/OBC/Minority communities',
      'Annual family income below ₹2.5 lakhs',
      'Minimum 50% marks in previous examination',
      'Regular student in recognized institution'
    ],
    benefits: 'Scholarship amount varies from ₹3000 to ₹20000 per year based on course and category. Covers tuition fees and maintenance allowance.',
    requiredDocuments: [
      'Aadhaar Card',
      'Income Certificate',
      'Caste Certificate',
      'Previous Year Marksheet',
      'Bank Account Details',
      'Bonafide Certificate'
    ],
    deadline: new Date('2026-11-30'),
    status: 'active',
    maxIncome: 250000,
    ageLimit: { min: 10, max: 35 }
  },
  {
    name: 'Pradhan Mantri Mudra Yojana',
    description: 'Provides loans up to ₹10 lakhs to non-corporate, non-farm small/micro enterprises. Three categories: Shishu (up to ₹50,000), Kishore (₹50,001 to ₹5 lakhs), Tarun (₹5 lakhs to ₹10 lakhs).',
    category: 'Employment',
    eligibility: [
      'Indian citizen',
      'Age between 18-65 years',
      'Business plan required',
      'No existing loan default'
    ],
    benefits: 'Collateral-free loans up to ₹10 lakhs. Lower interest rates. No processing fees for Shishu category.',
    requiredDocuments: [
      'Aadhaar Card',
      'PAN Card',
      'Business Plan',
      'Address Proof',
      'Bank Statements',
      'Quotations for equipment'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active',
    ageLimit: { min: 18, max: 65 }
  },
  {
    name: 'Beti Bachao Beti Padhao',
    description: 'Scheme to address declining Child Sex Ratio and promote education of girl child. Provides financial incentives and awareness programs.',
    category: 'Education',
    eligibility: [
      'Girl child born in India',
      'Parents are Indian citizens',
      'Account opened before girl turns 10',
      'One account per girl child'
    ],
    benefits: 'Higher interest rates on savings. Tax benefits under Section 80C. Maturity amount after 21 years for education and marriage.',
    requiredDocuments: [
      'Birth Certificate',
      'Parents Aadhaar Card',
      'Address Proof',
      'Passport Size Photos'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active',
    ageLimit: { min: 0, max: 10 }
  },
  {
    name: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Crop insurance scheme providing financial support to farmers in case of crop failure. Covers all food & oilseed crops and annual commercial/horticultural crops.',
    category: 'Agriculture',
    eligibility: [
      'All farmers including sharecroppers and tenant farmers',
      'Cultivating notified crops in notified areas',
      'Valid land records or crop cultivation proof'
    ],
    benefits: 'Premium subsidy ranging from 1.5% to 5% of sum insured. Full claim amount in case of crop loss. Coverage for pre-sowing to post-harvest losses.',
    requiredDocuments: [
      'Aadhaar Card',
      'Land Records',
      'Bank Account Details',
      'Sowing Certificate',
      'Passport Size Photo'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active'
  },
  {
    name: 'Atal Pension Yojana',
    description: 'Pension scheme for unorganized sector workers. Guaranteed minimum pension of ₹1000 to ₹5000 per month after 60 years based on contribution.',
    category: 'Social Welfare',
    eligibility: [
      'Indian citizen aged 18-40 years',
      'Bank account holder',
      'Aadhaar card mandatory',
      'Not covered under any statutory social security scheme'
    ],
    benefits: 'Guaranteed pension from ₹1000 to ₹5000 per month after 60 years. Government co-contribution for eligible subscribers. Spouse pension and return of corpus to nominee.',
    requiredDocuments: [
      'Aadhaar Card',
      'Bank Account Details',
      'Mobile Number',
      'Nominee Details'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active',
    ageLimit: { min: 18, max: 40 }
  },
  {
    name: 'Pradhan Mantri Ujjwala Yojana',
    description: 'Free LPG connection scheme for women from BPL households. Aims to replace traditional cooking fuels with clean cooking fuel.',
    category: 'Social Welfare',
    eligibility: [
      'Women from BPL households',
      'Age 18 years or above',
      'No LPG connection in household',
      'SECC 2011 beneficiary or from priority list'
    ],
    benefits: 'Free LPG connection with deposit-free cylinder. Financial assistance of ₹1600 per connection. EMI facility for stove and refill.',
    requiredDocuments: [
      'Aadhaar Card',
      'BPL Ration Card',
      'Bank Account Details',
      'Address Proof',
      'Passport Size Photo'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active',
    ageLimit: { min: 18, max: 100 }
  },
  {
    name: 'Pradhan Mantri Kaushal Vikas Yojana',
    description: 'Skill development scheme providing free training to youth. Covers 40+ sectors with placement assistance and certification.',
    category: 'Employment',
    eligibility: [
      'Indian citizen',
      'Age between 15-45 years',
      'School/college dropout or unemployed',
      'Basic literacy required'
    ],
    benefits: 'Free skill training with stipend. Industry-recognized certification. Placement assistance. Average placement rate of 70%.',
    requiredDocuments: [
      'Aadhaar Card',
      'Educational Certificates',
      'Bank Account Details',
      'Passport Size Photos'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active',
    ageLimit: { min: 15, max: 45 }
  },
  {
    name: 'Sukanya Samriddhi Yojana',
    description: 'Small deposit scheme for girl child with attractive interest rates. Part of Beti Bachao Beti Padhao campaign.',
    category: 'Education',
    eligibility: [
      'Girl child below 10 years',
      'Parents/legal guardians are Indian citizens',
      'Maximum two girl children per family',
      'Account can be opened till girl turns 10'
    ],
    benefits: 'High interest rate (currently 8.2% p.a.). Tax benefits under Section 80C. Maturity after 21 years. Partial withdrawal allowed for education after 18 years.',
    requiredDocuments: [
      'Birth Certificate of girl child',
      'Parents Aadhaar Card',
      'Address Proof',
      'Passport Size Photos',
      'Initial deposit of minimum ₹250'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active',
    ageLimit: { min: 0, max: 10 }
  },
  {
    name: 'Stand Up India Scheme',
    description: 'Facilitates bank loans between ₹10 lakh to ₹1 crore for SC/ST and women entrepreneurs for setting up greenfield enterprises.',
    category: 'Employment',
    eligibility: [
      'SC/ST and/or Women entrepreneurs',
      'Age above 18 years',
      'Greenfield project in manufacturing, services or trading sector',
      'Borrower should not be in default to any bank/financial institution'
    ],
    benefits: 'Loans from ₹10 lakh to ₹1 crore. Composite loan including term loan and working capital. Margin money requirement of 25% (15% by borrower, 10% by government schemes).',
    requiredDocuments: [
      'Aadhaar Card',
      'PAN Card',
      'Caste Certificate (for SC/ST)',
      'Business Plan',
      'Address Proof',
      'Bank Statements'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active',
    ageLimit: { min: 18, max: 100 }
  },
  {
    name: 'PM Vishwakarma Scheme',
    description: 'Scheme for traditional artisans and craftspeople providing skill training, toolkit incentive, and credit support.',
    category: 'Employment',
    eligibility: [
      'Traditional artisans and craftspeople',
      'Age 18 years or above',
      'Engaged in relevant trade on self-employment basis',
      'Not availed similar benefits under other schemes'
    ],
    benefits: 'Skill training with stipend of ₹500/day. Toolkit incentive of ₹15,000. Collateral-free credit up to ₹3 lakh. Digital marketing support.',
    requiredDocuments: [
      'Aadhaar Card',
      'Proof of traditional occupation',
      'Bank Account Details',
      'Mobile Number',
      'Passport Size Photos'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active',
    ageLimit: { min: 18, max: 100 }
  },
  {
    name: 'Pradhan Mantri Matru Vandana Yojana',
    description: 'Maternity benefit scheme providing cash incentive to pregnant and lactating mothers for first live birth.',
    category: 'Healthcare',
    eligibility: [
      'Pregnant women and lactating mothers',
      'First live birth in the family',
      'Age 19 years or above',
      'Registered with Anganwadi or approved health facility'
    ],
    benefits: 'Cash benefit of ₹5000 in three installments. Direct bank transfer. Promotes institutional delivery and proper nutrition.',
    requiredDocuments: [
      'Aadhaar Card',
      'Bank Account Details',
      'MCP Card',
      'Institutional Delivery Proof',
      'Identity Proof'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active',
    ageLimit: { min: 19, max: 45 }
  },
  {
    name: 'National Rural Livelihood Mission',
    description: 'Poverty alleviation scheme mobilizing rural poor into Self Help Groups (SHGs) and providing financial assistance and skill training.',
    category: 'Social Welfare',
    eligibility: [
      'Rural poor households',
      'Women from BPL families',
      'Willing to form or join SHG',
      'Age 18 years or above'
    ],
    benefits: 'Revolving fund of ₹15,000 per SHG. Community investment fund up to ₹2.5 lakh. Interest subvention on loans. Skill training and placement support.',
    requiredDocuments: [
      'Aadhaar Card',
      'BPL Card',
      'Bank Account Details',
      'SHG Membership Proof',
      'Address Proof'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active',
    ageLimit: { min: 18, max: 100 }
  },
  {
    name: 'Pradhan Mantri Jan Dhan Yojana',
    description: 'Financial inclusion scheme providing universal access to banking facilities with zero balance account, RuPay debit card, and insurance cover.',
    category: 'Social Welfare',
    eligibility: [
      'Indian citizen',
      'Age 10 years or above',
      'No existing bank account',
      'Valid identity proof'
    ],
    benefits: 'Zero balance bank account. RuPay debit card with ₹2 lakh accident insurance. ₹30,000 life insurance cover. Overdraft facility up to ₹10,000.',
    requiredDocuments: [
      'Aadhaar Card',
      'Address Proof',
      'Passport Size Photos',
      'Mobile Number'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active',
    ageLimit: { min: 10, max: 100 }
  },
  {
    name: 'Pradhan Mantri Suraksha Bima Yojana',
    description: 'Accident insurance scheme providing coverage of ₹2 lakh for accidental death or permanent disability at premium of just ₹12 per year.',
    category: 'Social Welfare',
    eligibility: [
      'Indian citizen',
      'Age between 18-70 years',
      'Bank account holder',
      'Aadhaar card mandatory'
    ],
    benefits: '₹2 lakh for accidental death or permanent total disability. ₹1 lakh for permanent partial disability. Annual premium of only ₹12.',
    requiredDocuments: [
      'Aadhaar Card',
      'Bank Account Details',
      'Consent Form',
      'Nominee Details'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active',
    ageLimit: { min: 18, max: 70 }
  },
  {
    name: 'Pradhan Mantri Jeevan Jyoti Bima Yojana',
    description: 'Life insurance scheme providing coverage of ₹2 lakh for natural or accidental death at premium of ₹436 per year.',
    category: 'Social Welfare',
    eligibility: [
      'Indian citizen',
      'Age between 18-50 years',
      'Bank account holder',
      'Good health condition'
    ],
    benefits: '₹2 lakh life cover for any reason of death. Renewable annually. Coverage till age 55. Premium of ₹436 per year.',
    requiredDocuments: [
      'Aadhaar Card',
      'Bank Account Details',
      'Consent Form',
      'Nominee Details'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active',
    ageLimit: { min: 18, max: 50 }
  },
  {
    name: 'Swachh Bharat Mission - Toilet Construction',
    description: 'Scheme providing financial assistance for construction of individual household toilets in rural and urban areas.',
    category: 'Housing',
    eligibility: [
      'Households without toilet facility',
      'BPL or economically weaker section',
      'Willing to construct toilet',
      'Land ownership or permission'
    ],
    benefits: 'Financial assistance of ₹12,000 for toilet construction. Technical support and guidance. Water supply connection support.',
    requiredDocuments: [
      'Aadhaar Card',
      'BPL Card or Income Certificate',
      'Land Ownership Proof',
      'Bank Account Details',
      'Passport Size Photos'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active'
  },
  {
    name: 'Pradhan Mantri Gram Sadak Yojana',
    description: 'Rural road connectivity scheme providing all-weather road access to unconnected habitations.',
    category: 'Infrastructure',
    eligibility: [
      'Unconnected rural habitations',
      'Population above 250 (general areas)',
      'Population above 100 (tribal/hilly areas)',
      'Gram Panchayat application required'
    ],
    benefits: 'All-weather road connectivity. Improved market access. Better healthcare and education access. Employment generation during construction.',
    requiredDocuments: [
      'Gram Panchayat Resolution',
      'Population Certificate',
      'Route Survey Report',
      'Land Acquisition NOC'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active'
  },
  {
    name: 'National Apprenticeship Promotion Scheme',
    description: 'Scheme promoting apprenticeship training by providing financial incentives to employers and stipend support to apprentices.',
    category: 'Employment',
    eligibility: [
      'Youth aged 14-25 years',
      'Minimum 5th pass for optional trade',
      'Minimum 8th pass for designated trade',
      'Indian citizen'
    ],
    benefits: 'Stipend during training period. Industry exposure and practical skills. Certificate recognized by NCVT. 25% of stipend shared by government.',
    requiredDocuments: [
      'Aadhaar Card',
      'Educational Certificates',
      'Age Proof',
      'Bank Account Details',
      'Passport Size Photos'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active',
    ageLimit: { min: 14, max: 25 }
  },
  {
    name: 'Pradhan Mantri Vaya Vandana Yojana',
    description: 'Pension scheme for senior citizens providing assured return of 7.4% per annum with monthly/quarterly/yearly pension options.',
    category: 'Social Welfare',
    eligibility: [
      'Senior citizens aged 60 years and above',
      'Indian citizen',
      'Investment between ₹1.5 lakh to ₹15 lakh',
      'Policy period of 10 years'
    ],
    benefits: 'Assured return of 7.4% per annum. Monthly/quarterly/half-yearly/yearly pension. Loan facility up to 75% of purchase price. Premature exit option.',
    requiredDocuments: [
      'Aadhaar Card',
      'Age Proof',
      'Bank Account Details',
      'PAN Card',
      'Address Proof'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active',
    ageLimit: { min: 60, max: 100 }
  },
  {
    name: 'Soil Health Card Scheme',
    description: 'Scheme providing soil health cards to farmers with information on nutrient status and recommendations for appropriate dosage of nutrients.',
    category: 'Agriculture',
    eligibility: [
      'All farmers',
      'Land ownership or cultivation proof',
      'Registered with agriculture department',
      'Willing to provide soil samples'
    ],
    benefits: 'Free soil testing. Customized fertilizer recommendations. Improved crop yield. Reduced input costs. Soil health monitoring.',
    requiredDocuments: [
      'Aadhaar Card',
      'Land Records',
      'Bank Account Details',
      'Mobile Number'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active'
  },
  {
    name: 'Pradhan Mantri Krishi Sinchai Yojana',
    description: 'Irrigation scheme providing end-to-end solutions for water conservation and efficient water use in agriculture.',
    category: 'Agriculture',
    eligibility: [
      'All farmers',
      'Land ownership proof',
      'Willing to adopt micro-irrigation',
      'Group or individual application'
    ],
    benefits: 'Subsidy on drip/sprinkler irrigation (up to 55% for small farmers). Water conservation structures. Improved water use efficiency. Increased crop productivity.',
    requiredDocuments: [
      'Aadhaar Card',
      'Land Ownership Documents',
      'Bank Account Details',
      'Quotation for equipment',
      'Passport Size Photos'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active'
  },
  {
    name: 'National Rural Employment Guarantee Scheme',
    description: 'Employment guarantee scheme providing 100 days of wage employment to rural households willing to do unskilled manual work.',
    category: 'Employment',
    eligibility: [
      'Rural household',
      'Adult members willing to do unskilled work',
      'Job card holder',
      'Indian citizen'
    ],
    benefits: 'Guaranteed 100 days of employment per household per year. Minimum wage payment. Work within 5 km of residence. Payment within 15 days.',
    requiredDocuments: [
      'Aadhaar Card',
      'Address Proof',
      'Bank Account Details',
      'Passport Size Photos',
      'Job Card Application'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active',
    ageLimit: { min: 18, max: 100 }
  },
  {
    name: 'Pradhan Mantri Garib Kalyan Anna Yojana',
    description: 'Food security scheme providing free food grains (5 kg per person per month) to priority households under National Food Security Act.',
    category: 'Social Welfare',
    eligibility: [
      'Priority households under NFSA',
      'Ration card holders',
      'BPL families',
      'Antyodaya Anna Yojana beneficiaries'
    ],
    benefits: 'Free food grains - 5 kg per person per month. Additional 1 kg pulses per household. Subsidized kerosene and sugar.',
    requiredDocuments: [
      'Aadhaar Card',
      'Ration Card',
      'Income Certificate',
      'Address Proof'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active'
  },
  {
    name: 'Digital India Initiative - CSC Services',
    description: 'Digital empowerment scheme providing various government and private services through Common Service Centers in rural areas.',
    category: 'Infrastructure',
    eligibility: [
      'All citizens',
      'Access to nearby CSC',
      'Valid identity proof',
      'Service-specific eligibility'
    ],
    benefits: 'Access to 300+ government services. Banking, insurance, and utility services. Digital literacy training. Aadhaar enrollment and updates.',
    requiredDocuments: [
      'Aadhaar Card',
      'Service-specific documents',
      'Mobile Number'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active'
  },
  {
    name: 'Pradhan Mantri Shram Yogi Maandhan',
    description: 'Pension scheme for unorganized workers providing monthly pension of ₹3000 after 60 years with minimal contribution.',
    category: 'Social Welfare',
    eligibility: [
      'Unorganized workers',
      'Age between 18-40 years',
      'Monthly income up to ₹15,000',
      'Not covered under EPF/ESIC/NPS'
    ],
    benefits: 'Assured monthly pension of ₹3000 after 60 years. Minimal contribution (₹55 to ₹200 per month). Family pension in case of death. Voluntary exit option.',
    requiredDocuments: [
      'Aadhaar Card',
      'Bank Account Details',
      'Mobile Number',
      'Self-declaration of income'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active',
    ageLimit: { min: 18, max: 40 },
    maxIncome: 180000
  },
  {
    name: 'One Nation One Ration Card',
    description: 'Portability scheme allowing beneficiaries to access PDS benefits from any Fair Price Shop across India using same ration card.',
    category: 'Social Welfare',
    eligibility: [
      'Existing ration card holders',
      'Aadhaar seeding mandatory',
      'Biometric authentication required',
      'NFSA beneficiaries'
    ],
    benefits: 'Access food grains from any FPS in India. Useful for migrant workers. Biometric authentication for transparency. Real-time transaction updates.',
    requiredDocuments: [
      'Aadhaar Card',
      'Existing Ration Card',
      'Mobile Number for SMS alerts'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active'
  },
  {
    name: 'PM Daksh Scheme',
    description: 'Skill development scheme for marginalized communities including SC/ST/OBC/Minorities providing free training in various trades.',
    category: 'Employment',
    eligibility: [
      'SC/ST/OBC/Minority communities',
      'Age 18-45 years',
      'Annual family income below ₹3 lakhs',
      'Minimum educational qualification varies by course'
    ],
    benefits: 'Free skill training in 50+ trades. Stipend during training. Placement assistance. Industry-recognized certification. Post-placement tracking.',
    requiredDocuments: [
      'Aadhaar Card',
      'Caste Certificate',
      'Income Certificate',
      'Educational Certificates',
      'Bank Account Details'
    ],
    deadline: new Date('2026-12-31'),
    status: 'active',
    ageLimit: { min: 18, max: 45 },
    maxIncome: 300000
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Get admin user
    const admin = await User.findOne({ role: 'admin' });
    
    if (!admin) {
      console.log('Please run seedAdmin.js first to create admin user');
      process.exit(1);
    }

    // Clear existing schemes
    await Scheme.deleteMany({});
    console.log('Cleared existing schemes');

    // Add createdBy field to all schemes
    const schemesWithAdmin = sampleSchemes.map(scheme => ({
      ...scheme,
      createdBy: admin._id
    }));

    // Insert sample schemes
    const schemes = await Scheme.insertMany(schemesWithAdmin);
    console.log(`✅ ${schemes.length} schemes added successfully`);

    console.log('\nSample schemes created:');
    schemes.forEach((scheme, index) => {
      console.log(`${index + 1}. ${scheme.name} (${scheme.category})`);
    });

    console.log('\n✅ Database seeded successfully!');
    console.log('\nYou can now:');
    console.log('1. Login as admin: admin@smartgov.in / admin123');
    console.log('2. View schemes at: http://localhost:3000/schemes');
    console.log('3. Register as user and apply for schemes');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedData();
