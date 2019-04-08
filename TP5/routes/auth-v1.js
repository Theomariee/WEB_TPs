const express = require('express')
const router = express.Router()

let authModel = undefined

/* Control usermodel initialisation */
router.use((req, res, next) => {
    if (!authModel) {
        res
            .status(500)
            .json({message: `model not initialised`})
    }
    next()
})

/* POST login credentials to log in */
router.post('/login', function (req, res, next) {
    const login = req.params.login
    const password = req.params.password

    if (login && password) {
        try {
            const auth = authModel.auth(login, password)
            
            if (auth.isAuthorized) {
                res
                    .json(auth.successObject)
            } else {
                res
                    .status(401)
                    .json(auth.failureObject)
            }
        } catch (exc) {
            res
                .status(400)
                .json({message: exc.message})
        }

    } else {
        res
            .status(400)
            .json({message: `Wrong parameter`})
    }
})