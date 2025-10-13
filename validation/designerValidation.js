const { body, validationResult } = require('express-validator');

const designerRules = [
    body('name')
        .trim()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage('Designer name must be at least 2 characters, e.g. Li'),

    body('birthYear')
        .notEmpty()    
        .withMessage('Enter a valid birth year.')
        .isInt({ min: 1800, max: new Date().getFullYear() }),
        
    body('nationality')
        .trim()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage('Nationality must be at least 2 characters, e.g. Li'),

    body('style')
        .notEmpty()
        .withMessage('Style must be a string.'),

    body('famousFor')
        .notEmpty()
        .withMessage('FamousFor must be a string.'),

    body('activeYears')
        .notEmpty()
        .withMessage('Active years must be a string (e.g., "1990–2020").'),

    body('awards')
        .notEmpty()
        .isArray()
        .withMessage('Awards must be an array of strings.'),

    body('website')
        .notEmpty()
        .isURL()
        .withMessage('Website must be a valid URL.'),
];

const validateDesigner = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

module.exports = { designerRules, validateDesigner };
