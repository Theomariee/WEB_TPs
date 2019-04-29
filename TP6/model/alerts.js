const mongoose = require('mongoose')

const CategoryModel = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        unique: true
    }
})

const StatusModel = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        unique: true
    }
})

const AlertModel = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true,
        unique: false
    },
    label: {
        type: String,
        required: true,
        unique: false
    },
    status: {
        type: mongoose.Schema.ObjectId,
        ref: 'Status',
        required: true,
        unique: false
    },
    from: {
        type: Date,
        required: true,
        unique: false
    },
    to: {
        type: Date,
        required: true,
        unique: false
    },

})

const ErrorModel = new mongoose.Schema({
    code: {
        type: Number,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        unique: false
    },
    message: {
        type: String,
        required: true,
        unique: false
    }
})

function initModels () {
    let Alert = mongoose.model('Alert', AlertModel)
    let Error = mongoose.model('Error', ErrorModel)
    let Category = mongoose.model('Category', CategoryModel)
    let Status = mongoose.model('Status', StatusModel)
    
    const categoryEnum = ['weather', 'sea', 'transport']
    const statusEnum = ['warning', 'threat', 'danger', 'risk']
    
    Category.collection.insert(categoryEnum, onInsert)
    Status.collection.insert(statusEnum, onInsert)
    
    function onInsert(err, docs) {
        if(err) {
    
        } else {
            console.log('Successfully stored.')
        }
    }
}

const get = (id) => {
    return Alert.findOne(id)
}

const getAll = () => {
    return users
}

const add = (alert) => {
    const newAlert = new Alert(alert)
    return newAlert.save()
        .catch(err => (console.log(err)))
}

const update = (id, newUserProperties) => {
   
}

const remove = (id) => {
    return Alert.findOneAndDelete(id)
        .catch(err => console.log(err))
}

exports.get = get
exports.getAll = getAll
exports.add = add
exports.update = update
exports.remove = remove
exports.initModels = initModels