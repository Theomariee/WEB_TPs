const uuidv1 = require('uuid/v1')
const bcrypt = require('bcrypt')

let SALT = "$2b$10$opq1qmtF7TvE.xMc4uON/e"

const users = [
    {
        id: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
        name: 'Pedro Ramirez',
        login: 'pedro',
        password: hashPlainPassword('pwdpedro'),
        age: 44
    }, {
        id: '456897d-98a8-78d8-4565-2d42b21b1a3e',
        name: 'Jesse Jones',
        login: 'jesse',
        password: hashPlainPassword('pwdjesse'),
        age: 48
    }, {
        id: '987sd88a-45q6-78d8-4565-2d42b21b1a3e',
        name: 'Rose Doolan',
        login: 'rose',
        password: hashPlainPassword('pwdrose'),
        age: 36
    }, {
        id: '654de540-877a-65e5-4565-2d42b21b1a3e',
        name: 'Sid Ketchum',
        login: 'sid',
        password: hashPlainPassword('pwdsid'),
        age: 56
    }
]

const get = (id) => {
    const usersFound = users.filter((user) => user.id === id)
    return usersFound.length >= 1
        ? usersFound[0]
        : undefined
}

const getAll = () => {
    return users
}

const add = (user) => {
    const newUser = {
        ...user,
        password: hashPlainPassword(user.password),
        id: uuidv1()
    }
    if (validateUser(newUser)) {
        users.push(newUser)
    } else {
        throw new Error('user.not.valid')
    }
    return newUser
}

const update = (id, newUserProperties) => {
    const usersFound = users.filter((user) => user.id === id)

    if (usersFound.length === 1) {
        const oldUser = usersFound[0]

        if(newUserProperties['password']) {
            const newUser = {
                ...oldUser,
                ...newUserProperties,
                password: hashPlainPassword(newUserProperties.password)
            } 
        }

        else {
            const newUser = {
                ...oldUser,
                ...newUserProperties
            }
        }

        // Control data to patch
        if (validateUser(newUser)) {
            // Object.assign permet d'éviter la suppression de l'ancien élément puis l'ajout
            // du nouveau Il assigne à l'ancien objet toutes les propriétés du nouveau
            Object.assign(oldUser, newUser)
            return oldUser
        } else {
            throw new Error('user.not.valid')
        }
    } else {
        throw new Error('user.not.found')
    }
}

const remove = (id) => {
    const indexFound = users.findIndex((user) => user.id === id)
    if (indexFound > -1) {
        users.splice(indexFound, 1)
    } else {
        throw new Error('user.not.found')
    }
}

function validateUser(user) {
    let result = true
    if (user && user.id && user.login && user.name && user.password) {
        result = true
    }
    return result
}

function hashPlainPassword(pwd) {
    bcrypt.hash(pwd, SALT).then(function (hash) {
        return hash
    })
}

exports.get = get
exports.getAll = getAll
exports.add = add
exports.update = update
exports.remove = remove