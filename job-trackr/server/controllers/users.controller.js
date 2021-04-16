const User = require('../models/User.model');

module.exports = {
    createUser: (req, res) => {
        User.create(req.body)
            .then(user => res.json(user))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    getOneUser: (req, res) => {
        User.findById(req.params.id)
            .then(user => res.json(user))
            .catch(err => res.status(400).json(err))
    },
    getAllUsers: (req, res) => {
        User.find()
            .then(users => res.json(users))
            .catch(err => res.status(400).json(err))
    },

    deleteUser: (req, res) => {
        //ID comes from req.params
        User.findByIdAndDelete(req.params.id)
            .then(() => res.json({ success: true }))
    },

    updateUser: (req, res) => {
        User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .then(user => res.json(user))
            .catch(err => res.status(400).json(err))
    },
    addJobToUser: (req, res) => {
        User.findById(req.params.id)
            .then(user => {
                user.jobs.addToSet(req.body)
                user.save()
                    .then(user => res.json(user))
            })
            .catch(err => res.status(400).json(err))
    },
}