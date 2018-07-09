const mongoose = require('mongoose');
const { Schema } = mongoose;

const JobdetailSchema = new Schema({
    _id: Schema.Types.ObjectId,
    job: {type: mongoose.Schema.Types.ObjectId, ref:'Job', required: true}
});


module.exports = mongoose.model('Jobdetail', JobdetailSchema);