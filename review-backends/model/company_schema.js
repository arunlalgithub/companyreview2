const mongoose = require('mongoose')
const companySchema = new mongoose.Schema({

    cname: String,
    caddress: String,
    city: String,
    cdate: String,
    cmplogo: String,

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },

    noOfStars: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
});
companySchema.set('timestamps', true)
module.exports = mongoose.mongoose.model("companies", companySchema);
