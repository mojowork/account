const isEmpty = value => {
    return value == undefined ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.length === 0)
}


module.exports = {
    isEmpty
}