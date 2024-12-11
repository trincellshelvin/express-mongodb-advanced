import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

const User = mongoose.model('User', userSchema);

export default User;
