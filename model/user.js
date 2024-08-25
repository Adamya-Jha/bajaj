const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema
const responseSchema = new Schema({
    data: {
        type: String, // Store as a string
        validate: {
            validator: function (value) {
                try {
                    // Parse the string into an array
                    const array = JSON.parse(value);
                    // Validate that the parsed array contains only letters and numbers
                    return Array.isArray(array) && array.every(item => /^[a-zA-Z0-9]+$/.test(item));
                } catch (error) {
                    return false; // Parsing failed, so it's invalid
                }
            },
            message: props => `Data field must be a valid JSON array with letters and numbers.`
        }
    }
});

const ResponseModel = mongoose.model('Response', responseSchema);

module.exports = ResponseModel;
