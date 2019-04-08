const express = require('express')
const bp = require('body-parser')
const mod = require('../../modules/module.js')


let router = express.Router()
let module = new mod.Module()


router.use(bp.json())
router.use(bp.urlencoded({
    extended: true
}))

// Get list of all users 
router.get('/users', function(req, res) {
    res.send(module.getAll())
})

// Get user with specific id
router.get('/users/:id', function(req, res) {
    const user = module.get(req.params.id)
    if(!user) {
        res.send('The id specified does not correspond to any user.')
    }
    res.send(user)
})

// Create a new user with the given params in the req.body
router.post('/users', function(req, res){
    const newUser = req.body
    const newUuid = module.add(newUser)
    if(!newUuid) {
        // TODO - Manage errors
        res.send('Error.')
    }
    res.send('Successfully created user with id ' + newUuid)
})

// Patch user with specific id with the given params in the req.body
router.patch('/users/:id', function(req, res) {
    const patchUser = req.body
    const userIdToPatch = req.params.id

    if(!module.update(userIdToPatch, patchUser)) {
        // TODO - Manage errors
        res.send('Error.')
    }
    
    res.send('Successfully applied patch.')
})

router.delete('/users/:id', function(req, res) {
    const userIdToRemove = req.params.id
    if(!module.remove(userIdToRemove)) {
        // TODO - Manage errors
        res.send('Error.')
    }

    res.send('Successfully deleted user with id ' + userIdToRemove)
})

module.exports = router