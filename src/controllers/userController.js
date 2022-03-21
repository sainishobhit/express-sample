const { jwt } = require('../utils')
const { userModel } = require('../models')
const bcrypt = require('bcrypt');

const registerUser = async function (req, res) {
    try {
        const requestBody = req.body;
        
        const { name, email, password } = requestBody;

        const isEmailAlreadyUsed = await userModel.findOne({ email });

        if (isEmailAlreadyUsed) {
            res.status(400).send({ status: false, message: `${email} is already registered` })
            return
        };


        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashed,
        };

        const newUser = await userModel.create(userData)
        res.status(201).send({ status: true, message: 'User created successfully', data: newUser })


    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const loginUser = async function (req, res) {
    try {
        const requestBody = req.body;
       

        const { email, password } = requestBody;


        const user = await userModel.findOne({ email });

        if (!user) {
            res.status(401).send({ status: false, message: `Invalid Login Credentials` })
            return
        };

        const validPassword = await bcrypt.compare(requestBody.password, user.password);

        if (!validPassword) {
            res.status(401).json({ Status: false, message: "Invalid password" });
        }

        const token = await jwt.createToken(user._id);
        res.header('x-api-key', token);
        res.status(200).send({ status: true, message: 'user Login Successfull', data: { token } });

    } catch (error) {
        console.log(error)
        res.status(500).send({ Status: false, Msg: error.message })
    }
}

module.exports = { registerUser, loginUser};
