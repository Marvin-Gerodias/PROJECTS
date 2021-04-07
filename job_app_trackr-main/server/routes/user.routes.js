const routesCtl = require('../controllers/users.controller');

module.exports = (app) => {
    app.get('/api/users', routesCtl.getAllUsers)
    app.get('/api/users/:id', routesCtl.getOneUser)
    app.post('/api/users', routesCtl.createUser)
    app.put('/api/users/:id', routesCtl.updateUser)
    app.post('/api/users/:id/jobs', routesCtl.addJobToUser)
    app.put('/api/users/:user_id/:job_id/updateJob', routesCtl.updateJob)
}