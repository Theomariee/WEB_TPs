const mongoose = require('mongoose')
const uuidv4 = require('uuid/v4')

const AlertSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['sea', 'transport', 'weather'],
        required: true,
        unique: false
    },
    label: {
        type: String,
        required: true,
        unique: false
    },
    status: {
        type: String,
        enum: ['warning', 'threat', 'danger', 'risk'],
        required: true,
        unique: false
    },
    from: {
        type: Date,
        required: true,
        unique: false,
        default: Date.now
    },
    to: {
        type: Date,
        required: true,
        unique: false,
        default: Date.now
    },

}, { _id : false })

const ErrorSchema = new mongoose.Schema({
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

let Alert = mongoose.model('Alert', AlertSchema)
let Error = mongoose.model('Error', ErrorSchema)

const get = (id) => {
    return Alert.findById(id)
}

const getFromSearch = (status) => {
    return Alert.find({
        status: {
            $in : status
        }
    })
}

const add = (alert) => {
    alert._id = uuidv4()
    const newAlert = new Alert(alert)
    return newAlert.save()
        .catch(err => (console.log(err)))
}

const update = (id, newAlertProperties) => {
   return Alert.findByIdAndUpdate(id, newAlertProperties)
        .catch(err => (console.log(err)))
}

const remove = (id) => {
    return Alert.findOneAndDelete(id)
        .catch(err => console.log(err))
}

exports.get = get
exports.getFromSearch = getFromSearch
exports.add = add
exports.update = update
exports.remove = remove
exports.Alert = Alert