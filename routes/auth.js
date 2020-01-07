const express = require('express')
const UserModel = require('../models/user')
const bcrypt = require('bcryptjs')
const {validateRegister, validateLogin} = require('../validate/validation')

const router = express.Router()


router.post('/register', async (req, res) => {
    //VALIDATE OUR DATA MEETS THE REQUIREMENTS
    const validate = validateRegister(req.body)
    if (validate.error) {
        return res.status(400).send({ message: validate.error.details[0].message });
    }
    //CHECK IF USER (email) ALREADY EXISTS IN DATABASE
    const emailExists = await UserModel.findOne({
        email: req.body.email
    })
    if (emailExists) {
        return res.status(400).send('Email already exists')
    }
    //HASH THE PASSWORD
    const salt = await bcrypt.genSalt(8)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    //CREATE THE USER
    const user = UserModel({
        "name": req.body.name,
        "email": req.body.email,
        "password": hashedPassword,
    })
    try {
        const savedUser = await user.save()
        res.redirect('/login')
    } catch (err) {
        res.status(400).send(err)
    }
})


router.post('/login', async (req, res) => {
    const validate = validateLogin(req.body)
    if (validate.error) {
        return res.status(400).send({message: validate.error.details[0].message})
    }

    const userExist = await UserModel.findOne({
        email: req.body.email
    })
    if (!userExist) {
        return res.status(400).send('User with that email does not exist')
    }
    
    const validPassword = await bcrypt.compare(req.body.password, userExist.password)
    if (!validPassword) {
        return res.status(400).send('Invalid login details')
    }

    res.redirect('/use')
})



module.exports = router