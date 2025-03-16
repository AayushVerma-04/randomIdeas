const mongoose = require('mongoose');

const IdeaSchema = mongoose.Schema({
    text:{
        type: String,
        required: [true, 'Please add text field']
    },
    tag:{
        type: String
    },
    username:{
        type: String
    },
    date:{
        type:Date,
        default: () => new Date()
    }
});

module.exports = mongoose.model('Idea', IdeaSchema);