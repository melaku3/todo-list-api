import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel';
import { userSchema } from '../utils/validation';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = expressAsyncHandler(async (req, res) => {
    const body = req.body;

    const validate = userSchema.safeParse(body);
    if (!validate.success) {
        res.status(400);
        throw new Error(`${validate.error.errors[0].path}: ${validate.error.errors[0].message}`);
        return;
    }
    
    const userExists = await User.findOne({ email: validate.data.email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
        return;
    }

    validate.data.password = await bcrypt.hash(validate.data.password, 10);

    const user = new User(validate.data);
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = expressAsyncHandler(async (req, res) => {
    const body = req.body;

    
    const validate = userSchema.pick({ email: true, password: true }).safeParse(body);

    if (!validate.success) {
        res.status(400);
        throw new Error(`${validate.error.errors[0].path}: ${validate.error.errors[0].message}`);
        return;
    }

    const user = await User.findOne({ email: validate.data.email });

    if (!user) {
        res.status(401);
        throw new Error('Invalid email');
        return;
    }

    const passwordMatch = await bcrypt.compare(validate.data.password, user.password);
    if (!passwordMatch) {
        res.status(401);
        throw new Error('Invalid password');
        return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '30d' });
    res.clearCookie('token');
    res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }); 
    res.json({ message: 'User logged in successfully' });
});