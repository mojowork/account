const Validator = require('validator')
const utils = require('./utils')

module.exports = validateLoginData = data => {
    let errors = {}
    data.email = !utils.isEmpty(data.email) ? data.email : ''
    data.password = !utils.isEmpty(data.password) ? data.password : ''

    if (Validator.isEmpty(data.email)) {
        errors.msg = 'email不能为空'
    } else if (!Validator.isEmail(data.email)) {
        errors.msg = 'email不合法！'
    } else if (Validator.isEmpty(data.password)) {
        errors.msg = 'password不能为空'
    }

    return {
        errors,
        isValid: utils.isEmpty(errors)
    }

}