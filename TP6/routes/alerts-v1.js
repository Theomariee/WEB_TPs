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
    if (newAlert) {
        try {
            newAlert["_id"] = uuidv4()
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
            .send(`Invalid input`)
            .json({
                "code": 0,
                "type": "WRONG_ARGUMENT",
                "message": "Invalid ID supplied"
              })
    }
})

/* Update a specific alert */
router.patch('/:id', function (req, res, next) {
    const id = req.params.id
    const newAlert = req.body

    if (id && newAlert) {
        try {
            if (id && newUserProperties) {
                alertsModel.update(id, newAlert)
                const freshAlert = alertsModel.get(id)
                freshAlert["message"] = `Successful operation`
                res
                    .status(200)
                    .json(freshAlert)
            } else {
                res
                    .status(405)
                    .json({
                            "code": 0,
                            "type": "WRONG_ARGUMENT",
                            "message": `Invalid input`
                          })
            }
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
        try {
            alertsModel.remove(id)
            req
                .res
                .status(200)
                .end()
        } catch (exc) {
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
        }
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
