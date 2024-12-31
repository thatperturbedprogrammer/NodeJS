// MongoDB Database Schema
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

// Schema
const urlSchema = new mongoose.Schema({
    redirectURL: {
        type: String,
        required: true,
    },
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    visitHistory: [ {
        timestamp: {
            type: Number,
        }
    } ],

}, { timestamps: true }
);

// Model
const URL = mongoose.model('url', urlSchema);

module.exports = URL;