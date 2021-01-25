const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String },
    summary: { type: String },
    is_active: { type: Number },
    created_by: { type: String, select: false },
    updated_by: { type: String, select: false },
    createdAt: { type: Date, default: Date.now, select: false },
    updatedAt: { type: Date, default: Date.now, select: false }
});


const MovieModel = mongoose.model('mst_movie', MovieSchema);

module.exports = MovieModel;
