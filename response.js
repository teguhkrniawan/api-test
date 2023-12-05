const response = (statuscode, data, msg, res) => {
    res.status(statuscode).json({
        'MSG'  : msg,
        'STATUS_CODE' : statuscode,
        'DATA' : data
    })
}

module.exports = response