const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required:true
    },
    password: {
        required: true,
        type:String
    }
});

personSchema.pre('save', async function (next) {
    const person = this;
    //hash the password only if it has modified (or is now)
    if (!person.isModified('password')) return next();
    try {
        //hash password  generation
        // const salt = "this is salt";
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashPassword = await bcrypt.hash(person.password, salt);

        //override the plain with the hashed one
        person.password = hashPassword;

        next();
    } catch (error) {
        return next(error);
    }
});

personSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

const Person = mongoose.model('Person', personSchema);
module.exports = Person;
