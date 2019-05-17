const express = require('express')
const router = express.Router()

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
                "message": "Invalid Tag Value"
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
                        res.json(alertFound)
                    } else {
                        res
                            .status(404)
                            .json({
                                "code": 0,
                                "type": "WRONG_ARGUMENT",
                                "message": "Alert not found"
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
                "message": "Invalid ID Supplied"
              })
    }
})

/* Add a new alert. */
router.post('/', function (req, res, next) {
    const newAlert = req.body

    if (newAlert) {
        try {
            const alert = alertsModel.add(newAlert)
            req
                .res
                .status(200)
                .send(`Successful operation`)
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
            .status(405)
            .send(`Invalid input`)
            .json({
                "code": 0,
                "type": "WRONG_ARGUMENT",
                "message": "Invalid ID Supplied"
              })
    }
})

/* Update a specific alert */
router.patch('/:id', function (req, res, next) {
    const id = req.params.id
    const newAlertProperties = req.body

    if (id && newAlertProperties) {
        try {
            if (id && newUserProperties) {
                const updated = alertsModel.update(id, newAlertProperties)
                res
                    .status(200)
                    .send(`Succesfull operation`)
                    .send(Alert)
            } else {
                res
                    .status(405)
                    .json(`Invalid input`)
            }
        } catch (exc) {
            if (exc.message === 'alert.not.found') {
                res
                    .status(405)
                    .send(`Invalid ID supplied`)
            } else if (exc.message === 'alert.not.valid') {
                res
                    .status(405)
                    .send(`Invalid input`)
            }
        }
    } else {
        res
          .status(405)
          .send(`Invalid input`)
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
                    .send(`Alert not found`)
            } else {
                res
                    .status(400)
                    .send(`Invalid ID supplied`)
            }
        }
    } else {
        res
            .status(400)
            .send(`Invalid ID supplied`)
    }
})

/** return a closure to initialize model */
module.exports = (model) => {
    alertsModel = model
    return router
}
