const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema
const responseSchema = new Schema({
    data: {
        numbers: {
            type: [String], // Array of strings
            validate: {
                validator: function (array) {
                    // Validate that the array contains only numeric strings
                    return array.every(item => /^\d+$/.test(item));
                },
                message: props => `Numbers array contains non-numeric elements.`
            }
        },
        alphabets: {
            type: [String], // Array of strings
            validate: {
                validator: function (array) {
                    // Validate that the array contains only letters
                    return array.every(item => /^[a-zA-Z]+$/.test(item));
                },
                message: props => `Alphabets array contains non-letter elements.`
            }
        },
        highest_lowercase_alphabet: {
            type: [String], // Array of strings
            validate: {
                validator: function (array) {
                    // Validate that the array contains only lowercase letters
                    return array.every(item => /^[a-z]+$/.test(item));
                },
                message: props => `Highest lowercase alphabet array contains non-lowercase elements.`
            }
        }
    }
});

const ResponseModel = mongoose.model('Response', responseSchema);

module.exports = ResponseModel;
