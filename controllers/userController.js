const {check, validationResult} = require("express-validator")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const Users = require("../models/users")
const loadSignup = (req, res) => {
    title = "Create new acount"
    const errors = []
    res.render("register", {title, errors, inputs:{}, login: false });
}
const loadlogin =  (req, res) => {
    title = "User login"
    res.render("login", {title, errors: [], inputs: {}, login: false })
}
const loginvalidations =  [
    check('email').not().isEmpty().withMessage('enter a valid email'),
    check('password').not().isEmpty().withMessage(' password is required')
]
const postlogin = async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.render("login", {title: 'user login',errors: errors.array(), inputs: req.body, login: false })
    }else {
        const checkEmail = await Users.findOne({email})
        if (checkEmail !== null) {
            const id = checkEmail._id;
            const dbPassword = checkEmail.password;
            const passwordverify = await bcrypt.compare(password, dbPassword)
            if(passwordverify) {
            // crerate token
            const token = jwt.sign({userID: id}, process.env.JWT_SECRET, {
                expiresIn: "7d"
            })
            console.log("user token:", token)
            //create session variable
            req.session.user = token;
            res.redirect("/profile");
            }else {
                res.render("login", {title: 'user login',errors: [{msg: 'your password is wrong'}], inputs: req.body, login: false })
            }
        }else {
            res.render("login", {title: 'user login',errors: [{msg: 'Email is not found'}], inputs: req.body, login: false })
        }
    }
}

const registervalidations =  [
    check('name').isLength({ min: 3}).withMessage('Name is require and must be 4 characters long'),
    check('email').isEmail().withMessage('enter a valid email'),
    check('password').isLength({ min: 6 }).withMessage('The password must be 6characters long')
]
const postRegister = async(req, res) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const title = "Create new acount"
        res.render("register", { title, errors: errors.array(), inputs: req.body, login: false  })
    } else {
        try{
            const userEmail = await Users.findOne({ email})
           if (userEmail === null) {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(password, salt)
            console.log("your salt: ", salt) 
            
            const newUser = new Users({
                name: name,
                email: email,
                password: hashed

            })
            try {
                const createdUser = await newUser.save();
                req.flash('success', "your account has been created successfully")
                res.redirect('/login')

            }catch (err) {
                console.log(err.message)
            }
           }else {
            res.render("register", { title: 'Create new account', errors:  [{msg: 'Email is already exist'}], inputs: req.body, login: false  })
           }
        } catch(err){
            console.log(err.message)
        }
      

    }
}
module.exports = {
    loadSignup,
    loadlogin,
    registervalidations,
    postRegister,
    postlogin,
    loginvalidations
}