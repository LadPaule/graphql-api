const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const farm_schema = new Schema({
    name: String,
    type: String,
    description: String,
    address: String,
});
module.exports = mongoose.model('Farm', farm_schema);