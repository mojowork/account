const Validator = require('validator')
const utils = require('./utils')

module.exports = validateRegisterData = data => {
    let errors = {}
    data.name = !utils.isEmpty(data.name) ? data.name : ''
    data.email = !utils.isEmpty(data.email) ? data.email : ''
    data.password = !utils.isEmpty(data.password) ? data.password : ''
    if (Validator.isEmpty(data.name)) {
        errors.msg = 'name不能为空'
    } else if (!Validator.isLength(data.name, {
            min: 2,
            max: 12
        })) {
        errors.msg = 'name长度应在2到12个字符！'
    } else if (Validator.isEmpty(data.email)) {
        errors.msg = 'email不能为空'
    } else if (!Validator.isEmail(data.email)) {
        console.log(Validator.isEmail(data.email), data.email)
        errors.msg = 'email不合法！'
    } else if (Validator.isEmpty(data.password)) {
        errors.msg = 'password不能为空'
    }

    return {
        errors,
        isValid: utils.isEmpty(errors)
    }

}