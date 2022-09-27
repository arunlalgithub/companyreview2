const mongoose = require('mongoose')
const User = require("./user_schema");

const commentSchema = new mongoose.Schema({
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'companies'
    },
    comment: String,
    noOfStars: {
        type: Number,
        default: 0
    },
    date: { type: Date, default: Date.now },
    isActive: {
        type: Boolean,
        default: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

});
commentSchema.set('timestamps', true)
module.exports = mongoose.mongoose.model("comments", commentSchema);
