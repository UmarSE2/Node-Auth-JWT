const mongoose = require('mongoose');
const { isEmail } = require('validator')
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Password must be at least 6 characters"],
    }
})

// Fire a function after doc saved to db
userSchema.post("save", function (doc, next) {
    console.log("New User is created and saved", doc)
    next()
})

// Fire a function before doc saved to db
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const User = mongoose.model("user", userSchema)

module.exports = User;