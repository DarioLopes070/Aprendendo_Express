const validateBody = (req, res, next) => {
    const { body } = req;
    if (body.title === undefined) {
        return res.status(400).json({ message: '"title" is required' });
    } else if (body.title === '') {
        return res.status(400).json({ message: '"title" cannot be empty' });
    } else {
        next();
    }
};

module.exports = {
    validateBody,
};