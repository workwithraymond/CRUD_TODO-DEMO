//What two elements do I want to write on my database?
//Title and Content and Date field

//Step one:
const mongoose = require('mongoose')
const todoTaskSchema = new mongoose.Schema({
    title: {
        type: String, //will this be an array or a number, or string
        require: true //this field should be required so the user has to enter the string and not by pass it.
    },
    content: {
        type: String, //will this be an array or a number, or string
        require: true //this field should be required so the user has to enter the string and not by pass it.
    },
    date: {
        type: Date, //will this be an array or a number, or string
        default: Date.now
    }

})

module.exports = mongoose.model('TodoTask', todoTaskSchema, 'tasks')//this is where we add the collections