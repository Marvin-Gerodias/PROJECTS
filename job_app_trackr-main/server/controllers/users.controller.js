const User = require('../models/User.model');

module.exports = {
createUser: (req, res) => {
    User.create(req.body)
    .then(user => res.json(user))
    .catch(err => {
        console.log(err);
        res.status(400).json(err)})
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
updateUser: (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
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
updateJob: (req, res) => {
    // Find user by ID
    let updateObj = {$set: {}};
        for(let param in req.body) {
        updateObj.$set['jobs.$.'+param] = req.body[param];
        }
    console.log(updateObj);

    User.findById(req.params.user_id)
    .then(user => {
        
        let tempID = req.params.job_id;
        console.log(tempID);
        for(var i = 0; i < user.jobs.length; i++){
            console.log('first', user.jobs[i]._id);
            let tempID2 = user.jobs[i]._id
            
            try {
                console.log("Try this...");
                if(tempID2.toString() == tempID){
                    // console.log('second', req.params.job_id);
                    // let temp = user.jobs[i]; 
                    // console.log(User);
                    console.log('Found a match!');
                    user.update(
                        {'jobs._id': req.params.job_id},
                        {$set: {
                            'jobs.$.companyName': req.body.companyName,
                            'jobs.$.jobTitle': req.body.jobTitle,
                            'jobs.$.dateApplied': req.body.dateApplied,
                            'jobs.$.salaryRange': req.body.salaryRange,
                            'jobs.$.location': req.body.location,
                            'jobs.$.jobLevel': req.body.jobLevel,
                            'jobs.$.jobDescription': req.body.jobDescription,
                            'jobs.$.companyDescription': req.body.companyDescription,
                            'jobs.$.notes': req.body.notes,
                            'jobs.$.applicationSite': req.body.applicationSite,
                            'jobs.$.resume': req.body.resume,
                            'jobs.$.status': req.body.status
                        }},
                        (err, result) => {
                            console.log('Inside callback function now!')
                            if(err) {
                                res.status(400).json({Error: 'Unable to update.'})
                            } else {
                                console.log(user.jobs[i])
                                res.status(200).json(result)
                            }
                        }
                    )

                    // User.jobs.updateOne(req.params.job_id, req.body, {new: true, runValidators: true})

                    // .then(updatedUser => res.json(updatedUser))
                } 

            }
            catch (error) {
                res.json(error)
            }

        
        } // for loop

    }) // .then
    .catch(err => res.status(400).json({error: err}))

    } // updateJob

    
// Module.exports closing bracket
}

        // console.log(`This is the user job ID: ${user.jobs[0]._id}`)
        // console.log(`This is the job we want to update: ${temp}`)
        // user.jobs.findByIdAndUpdate(req.params.job_id, req.body, {new: true, runValidators: true})

    // let current_user = User.findById(req.params.user_id);
    // console.log(current_user);
    // let user_jobs = current_user.jobs;
    // console.log(user_jobs);
    // for(let i = 0; i < user_jobs.length; i++){
    //     if(user_jobs[i]._id === req.params.job_id){
    //         User.jobs.findByIdAndUpdate(req.params.job_id, req.body)
    //         .then(updated => res.status(200).json({success: true, job: updated}))
    //     } else {
    //         res.status(400).json({error: err})
    //         // .catch(err => res.status(400).json({error: err}))
    //     }
    // }
