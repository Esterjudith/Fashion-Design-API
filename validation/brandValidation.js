const { body, validationResult } = require('express-validator');

const brandRules = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Brand name is required.')
        .isLength({ min: 2 })
        .withMessage('Brand name must be at least 2 characters, e.g. Li'),

    body('founder')
        .trim()
        .notEmpty()
        .withMessage('Founder is required.')
        .isLength({ min: 2 })
        .withMessage('Founder must be at least 2 characters, e.g. Li'),

    body('foundedYear')
        .isInt({ min: 1800, max: new Date().getFullYear() })
        .withMessage('Enter a valid founding year.'),

    body('headquarters')
        .notEmpty()
        .withMessage('Headquarters must be a string.'),

    body('specialization')
        .notEmpty()
        .withMessage('Specialization must be a string.'),

    body('currentCreativeDirector')
        .notEmpty()
        .withMessage('Creative Director must be a string.'),

    body('notableCollections')
        .notEmpty()
        .isArray()
        .withMessage('Notable collections must be an array of strings.'),

    body('slogan')
        .notEmpty()
        .withMessage('Slogan must be a string.'),

    body('website')
        .notEmpty()
        .isURL()
        .withMessage('Website must be a valid URL.'),

    body('status')
        .notEmpty()
        .isIn(['active', 'inactive', 'acquired'])
        .withMessage('Status must be active, inactive, or acquired.'),
];

const validateBrand = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

module.exports = { brandRules, validateBrand };
