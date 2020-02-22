const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating schema
const ItemSchema = new Schema({
    ItemName: {
        type: String,
        required: true
    },
    ItemQuantity: {
        type: Number,
        required: true
    }
});

module.exports = Item = mongoose.model('Item', ItemSchema);