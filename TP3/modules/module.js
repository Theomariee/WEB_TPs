const uuidv4 = require('uuid/v4')

class Module {

    constructor(){
        // Non-persistent list of users initialized with 2 members
        this.userList = [
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
    }

    getAll() {
        return this.userList
    }

    get(id) {
        const userSearchedFor = this.userList.find(user => user.id == id)
        if(!userSearchedFor) {
            return null
        }
        return userSearchedFor
    }

    update(id, patch) {
        const userSearchedFor = this.userList.find(user => user.id == id)
        const tmpUserMemo = userSearchedFor
    
        if(!userSearchedFor) {
            return false
        }
    
        const patchUser = patch
        Object.keys(patchUser).forEach(function(property) {
            if(userSearchedFor[property]) {
                userSearchedFor[property] = patchUser[property]
            }
        })
    
        // Make changes effective in this.userList
        this.userList[tmpUserMemo] = userSearchedFor

        return true
    }

    remove(id) {
        const indexUserSearchedFor = this.userList.findIndex(user => user.id == id)
        if(indexUserSearchedFor == -1) {
            return false
        }
        this.userList.splice(indexUserSearchedFor, 1)

        return true
    }

    add(user) {
        const newUser = user
        if(!newUser) {
            return null
        }
    
        const newUuid = uuidv4()
        newUser.id = newUuid
        this.userList.push(newUser)
        
        return newUuid
    }
}

module.exports = Module