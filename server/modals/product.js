const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product_schema = new Schema({
    name: String,
    category: String,
    description: String,
    variants: String,
    farm_id: String
});
module.exports = mongoose.model('Product', product_schema);