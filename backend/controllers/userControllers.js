const User = require('../models/usersModel');
const jwt = require('jsonwebtoken')

//login user
const loginUser = async (req, res) => { 
    try {
        const user = await User.findOne({ email: req.body.email }).exec();

        if (user) {
            if (user.authenticate(req.body.password)) {
                const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
                const { _id, firstName, lastName, email, role, fullName } = user;
                
                return res.status(200).json({
                    token,
                    user: { _id, firstName, lastName, email, role, fullName }
                });
            } else {
                return res.status(400).json({ message: 'Invalid password' });
            }
        } else {
            return res.status(400).json({ message: 'User not found' });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong', error: error.message });
    }

}
//user signup
const signupUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).exec();
        
        if (user) {
            return res.status(400).json({
                message: 'User already registered'
            });
        }

        const { firstName, lastName, email, password } = req.body;
        const _user = new User({
            firstName,
            lastName,
            email,
            password,
            username: Math.random().toString()
        });

        const data = await _user.save();

        return res.status(201).json({
            message: 'User created successfully..!',
            data
        });
    } catch (error) {
        return res.status(400).json({
            message: 'Something went wrong',
            error: error.message
        });
    }
}
module.exports = {loginUser,signupUser}