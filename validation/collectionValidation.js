const { body, validationResult } = require('express-validator');

const collectionRules = [
    body('title')
        .trim()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage('Title must be at least 2 characters, e.g. Li'),

    body('season')
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage('Season must be at least 2 characters, e.g. Li'),

    body('year')
        .isInt({ min: 1900, max: 2100 })
        .withMessage('Enter a valid year.'),
        
    body('designer')
        .trim()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage('Designer must be at least 2 characters, e.g. Li'),

    body('theme')
        .notEmpty()
        .withMessage('Theme is required.'),

    body('description')
        .notEmpty()
        .withMessage('Description is required.'),

    body('launchDate')
        .isISO8601()
        .withMessage('Enter a valid date (YYYY-MM-DD).'),

    body('numberOfPieces')
        .isInt({ min: 1 })
        .withMessage('Number of pieces must be a positive integer.'),

    body('status')
        .notEmpty()
        .isIn(['active', 'archived', 'upcoming'])
        .withMessage('Status must be active, archived, or upcoming.'),
];

const validateCollection = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

module.exports = { collectionRules, validateCollection };
