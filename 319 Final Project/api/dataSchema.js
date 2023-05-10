const mongoose = require('mongoose');
const dataSchema = mongoose.Schema;

const TodoSchema = new dataSchema({
    _id: {
        type: Number},
    text: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        //default: false
    }
    // timestamp: {
    //     type: String,
    //     default: Date.now()
    // }
})

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;