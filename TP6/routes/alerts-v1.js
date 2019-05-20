const express = require('express')
const router = express.Router()
const uuidv4 = require('uuid/v4')

let alertsModel = undefined

/* Control alertsModel initialisation */
router.use((req, res, next) => {
    if (!alertsModel) {
        res
            .status(500)
            .json({message: `model not initialised`})
    }
    next()
})

/* GET alerts by searching for criterias */
router.get('/search', function (req, res, next) {
    const statusList = alertsModel.Alert.schema.path('status').enumValues
    const status = req.query.status && req.query.status.split(',')

    function checkStatus(status) {
        return !statusList.includes(status)
    }

    const wrongStatus = status.filter(checkStatus)

    if(wrongStatus.length > 0) {
        res
            .status(400)
            .json({
                "code": 0,
                "type": "WRONG_ARGUMENT",
                "message": "Invalid tag value"
              })
    }

    else {
        alertsModel.getFromSearch(status)
            .then(function(alerts){
                res
                    .status(200)
                    .json(alerts)
            })
    }
})

/* GET a specific alert by id */
router.get('/:id', function (req, res, next) {
    const id = req.params.id
    if (id) {
        try {
            alertsModel.get(id)
                .then(function(alertFound) {
                    if (alertFound) {
                        alertFound["message"] = `Successful operation`
                        res.json(alertFound)
                    } else {
                        res
                            .status(404)
                            .json({
                                "code": 0,
                                "type": "WRONG_ARGUMENT",
                                "message": `Alert not found`
                              })
                    }
                })
        } catch (exc) {
            res
            .status(400)
            .json({
                "code": 0,
                "type": "EXCEPTION_CAUGHT",
                "message": exc.message
              })
        }
    } else {
        res
            .status(400)
            .json({
                "code": 0,
                "type": "WRONG_ARGUMENT",
                "message": "Invalid ID supplied"
              })
    }
})

/* Add a new alert. */
router.post('/', function (req, res, next) {
    const newAlert = req.body
    if (newAlert.type && newAlert.status && newAlert.label) {
        try {
            alertsModel.add(newAlert)
        } catch (exc) {
            res
                .status(400)
                .json({
                    "code": 0,
                    "type": "EXCEPTION_CAUGHT",
                    "message": exc.message
                  })
        }
        newAlert["message"] = `Successful operation`
           req 
                .res
                .status(200)
                .json(newAlert)
    } else {
        res
            .status(405)
            .json({
                "code": 0,
                "type": "WRONG_ARGUMENT",
                "message": "Invalid object supplied"
              })
    }
})

/* Update a specific alert */
router.put('/:id', function (req, res, next) {
    const id = req.params.id
    const newAlert = req.body
    console.log("put")
    if (id && newAlert.type && newAlert.status && newAlert.label) {
        try {
            console.log("TRY")
            const upAlert = alertsModel.update(id, newAlert)
            console.log(upAlert.type)
            res
               .status(200)
               .json({"message" : `Successful operation`})
        } catch (exc) {
            if (exc.message === 'alert.not.found') {
                res
                    .status(405)
                    .json({
                        "code": 0,
                        "type": "WRONG_ARGUMENT",
                        "message": `Invalid ID supplied`
                      })
            } else if (exc.message === 'alert.not.valid') {
                res
                    .status(405)
                    .json({
                        "code": 0,
                        "type": "WRONG_ARGUMENT",
                        "message": `Invalid input`
                      })
            }
        }
    } else {
        res
          .status(405)
          .json({
            "code": 0,
            "type": "WRONG_ARGUMENT",
            "message": `Invalid input`
          })
    }
})

/* REMOVE a specific alert by id */
router.delete('/:id', function (req, res, next) {
    const id = req.params.id
    if (id) {
            alertsModel.remove(id).then(() =>{
            req
            .res
            .status(200)
            .json({"message" :`Alert removed from DB`})
            }).catch ((exc) => {
                if (exc.message === 'alert.not.found') {
                    res
                        .status(404)
                        .json({
                            "code": 0,
                            "type": "WRONG_ARGUMENT",
                            "message": `Alert not found`
                        })
                } else {
                    res
                        .status(400)
                        .json({
                            "code": 0,
                            "type": "WRONG_ARGUMENT",
                            "message": `Invalid ID supplied`
                        })
                }
            })
    } else {
        res
            .status(400)
            .json({
                "code": 0,
                "type": "WRONG_ARGUMENT",
                "message": `Invalid ID supplied`
              })
    }
})

/** return a closure to initialize model */
module.exports = (model) => {
    alertsModel = model
    return router
}
