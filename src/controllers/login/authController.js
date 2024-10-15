const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/userSchema'); 
require('dotenv').config();

// @Desc - To Create a new user
// @route - POST /api/auth/register
// @access - Public
// TESTED - YES
const registerUser = 
async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @Desc - To login existing user
// @route - POST /api/auth/login
// @access - Public
// TESTED - YES
const loginUser =  async (req, res) => {
   const { email, password } = req.body;
 
   try {
     // Check if the user exists
     const user = await User.findOne({ email });
     if (!user) {
       return res.status(400).json({ message: 'Invalid email or password' });
     }
 
     // Check if the password is correct
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) {
       return res.status(400).json({ message: 'Invalid email or password' });
     }
 
     // Generate JWT token
     const token = jwt.sign(
       { userId: user._id, email: user.email },
       process.env.JWT_SECRET,
       { expiresIn: '1h' } // Token expires in 1 hour
     );
 
     res.status(200).json({ token });
   } catch (err) {
     res.status(500).json({ message: 'Server error', error: err.message });
   }
 };
 
 
module.exports = {registerUser, loginUser}