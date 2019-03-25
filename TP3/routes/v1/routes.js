const express = require('express')
const uuidv4 = require('uuid/v4')
const bp = require('body-parser')

var router = express.Router()

// Non-persistent list of users initialized with 2 members
let userList = [
    {
        id: '5b449887-a5d5-49f3-b020-fd4afadfe024',
        login: 'voodoo',
        name: 'Marlon Kuqi',
        age: 21
    },
    {
        id: '95822075-33ad-4f1a-b16b-af4680725861',
        login: 'chococo35',
        name: 'Corentin Duchatelet',
        age: 21
    }
]

router.use(bp.json())
router.use(bp.urlencoded({
    extended: true
}))

// Get list of all users 
router.get('/users', function(req, res) {
    res.send(userList)
})

// Get user with specific id
router.get('/users/:id', function(req, res) {
    const userSearchedFor = userList.find(user => user.id == req.params.id)
    if(!userSearchedFor) {
        res.send('The id specified does not correspond to any user.')
    }
    res.send(userSearchedFor)
})

// Create a new user with the given params in the req.body
router.post('/users', function(req, res){
    const newUser = req.body
    if(!newUser) {
        res.send('You must specify a login, a name and an age.')
    }

    const newUuid = uuidv4()
    newUser.id = newUuid
    userList.push(newUser)
    
    res.send('Successfully created user with id ' + newUuid)
})

// Patch user with specific id with the given params in the req.body
router.patch('/users/:id', function(req, res) {
    const userSearchedFor = userList.find(user => user.id == req.params.id)
    const tmpUserMemo = userSearchedFor

    if(!userSearchedFor) {
        res.send('The id specified does not correspond to any user.')
    }

    const patchUser = req.body
    Object.keys(patchUser).forEach(function(property) {
        if(userSearchedFor[property]) {
            userSearchedFor[property] = patchUser[property]
        }
    })
    
    // Make changes effective in userList
    userList[tmpUserMemo] = userSearchedFor

    res.send('Successfully applied patch:' + JSON.stringify(userSearchedFor))
})

router.delete('/users/:id', function(req, res) {
    const indexUserSearchedFor = userList.findIndex(user => user.id == req.params.id)
    if(indexUserSearchedFor == -1) {
        res.send('The id specified does not correspond to any user.')
    }
    userList.splice(indexUserSearchedFor, 1)
})

module.exports = router