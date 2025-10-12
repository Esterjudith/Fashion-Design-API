const { body, validationResult } = require('express-validator');

const showRules = [
    body('collectionId')
        .notEmpty()
        .withMessage('Collection ID is required.'),

    body('location')
        .notEmpty()
        .withMessage('Location is required.'),

    body('date')
        .isISO8601()
        .withMessage('Date must be valid (YYYY-MM-DD).'),

    body('venue')
        .notEmpty()
        .withMessage('Venue is required.'),
        
    body('specialGuests')
        .notEmpty()
        .isArray()
        .withMessage('Special guests must be an array of strings.'),
];

const validateShow = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

module.exports = { showRules, validateShow };
