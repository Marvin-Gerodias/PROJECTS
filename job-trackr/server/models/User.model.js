const { Schema, model } = require('mongoose');

const JobSchema = new Schema({
    companyName: {
        type: String
    },
    jobTitle: {
        type: String
    },
    dateApplied: {
        type: String
    },
    salaryRange: {
        type: String
    },
    location: {
        type: String,
    },
    jobLevel: {
        type: String
    },
    jobDescription: {
        type: String
    },
    companyDescription: {
        type: String
    },
    notes: {
        type: String
    },
    applicationSite: {
        type: String
    },
    resume: {
        type: String
    },
    status: {
        type: String
    }
}, { timestamps: true });

const User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true 
    },

    jobs: [JobSchema],
}, { timestamps: true })


module.exports = model('User', User);

