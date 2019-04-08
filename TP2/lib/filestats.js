const fs = require('fs')
const async = require('async')

const getFileStats = (directory, callback) => {
    fs.readdir(directory, (err, files) => {
        if (err) {
            callback(err)
        } else {
            async.reduce(files, [], (memo, file, callback) => {
                fs.stat(directory + '/' + file, (err_fsstat, properties) => {
                    if (err_fsstat) {
                        callback(err_fsstat, null)
                    } 
                    else {
                        memo.push({
                            name: file, 
                            properties: properties
                        })
                        callback(null, memo)
                    }
                })
            }, (err, result) => {
                callback(err, result)
            })
        }
    })

}

module.exports = {
    getFileStats
}