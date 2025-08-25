const validateFieldTitle = (req, res, next) => {
    const { body } = req;
    if (body.title === undefined) {
        return res.status(400).json({ message: '"title" is required' });
    } else if (body.title === '') {
        return res.status(400).json({ message: '"title" cannot be empty' });
    } else {
        next();
    }
};
const validateFieldStatus = (req, res, next) => {
    const { body } = req;
    if (body.status === undefined) {
        return res.status(400).json({ message: '"status" is required' });
    } else if (body.status === '') {
        return res.status(400).json({ message: '"status" cannot be empty' });
    } else {
        next();
    }
};

module.exports = {
    validateFieldTitle,
    validateFieldStatus
};