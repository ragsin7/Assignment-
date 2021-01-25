const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    role: { type: Object },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    file_path: { type: Array },
    otp: { type: String },
    is_active: { type: Number },
    created_by: { type: String, select: false },
    updated_by: { type: String, select: false },
    createdAt: { type: Date, default: Date.now, select: false },
    updatedAt: { type: Date, default: Date.now, select: false }
});


const UserModel = mongoose.model('mst_user', UserSchema);

module.exports = UserModel;
