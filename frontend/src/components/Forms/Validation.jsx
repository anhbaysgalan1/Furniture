export const required = (message = "required!") => value => {
    if(value && value.length){
        value = value.toString()
        value = value.replace(/ /g, '')
        if(value == ' ')
            return message
    }
    if (!value || value.length === 0 || value === '') {
        return message
    }
}

export const customRequired = (message = "required!") => value => {
    if (value.length === 0) {
        return message
    }
}

export const number = (numberValue, message = "The minimum value is ${arguments[0]}") => {
    try {
        eval(`message=\`${message}\``)
    }
    catch (e) {
        console.error("can not build message for min function.")
    }
    return value => {
        if (parseInt(value) == numberValue) return message
    }
}

export const min = (minValue, message = "The minimum value is ${arguments[0]}") => {
    try {
        eval(`message=\`${message}\``)
    }
    catch (e) {
        console.error("can not build message for min function.")
    }
    return value => {
        if (parseInt(value) < minValue) return message
    }
}

export const max = (maxValue, message = "The maximum value is ${arguments[0]}") => {
    try {
        eval(`message=\`${message}\``)
    }
    catch (e) {
        console.error("can not build message for max function.")
    }
    return value => {
        if (value && (parseInt(value) > maxValue)) return message
    }
}

export const greaterThan = (minValue, message = "Value must be greater than ${arguments[0]}") => {
    try {
        eval(`message=\`${message}\``)
    }
    catch (e) {
        console.error("can not build message for greaterThan function.")
    }
    return value => {
        if (parseInt(value) <= minValue) return message
    }
}

export const lessThan = (maxValue, message = "Value must be less than ${arguments[0]}") => {
    try {
        eval(`message=\`${message}\``)
    }
    catch (e) {
        console.error("can not build message for lessThan function.")
    }
    return value => {
        if (parseInt(value) >= maxValue) return message
    }
}

export const minLength = (minLength, message = "The minimum length is ${arguments[0]}") => {
    try {
        eval(`message=\`${message}\``)
    }
    catch (e) {
        console.error("can not build message for minLength function.")
    }
    return value => {
        if (String(value).length < minLength) return message
    }
}

export const maxLength = (maxLength, message = "The maximum length is ${arguments[0]}") => {
    try {
        eval(`message=\`${message}\``)
    }
    catch (e) {
        console.error("can not build message for maxLength function.")
    }
    return value => {
        if (String(value).length > maxLength) return message
    }
}

export const CustomRegex = (reGex, message = "") => value => {
    if (message === "" || !reGex || !value) {
        return false
    }
    let regEx = new RegExp(reGex)
    let isValid = regEx.test(String(value))
    if (!isValid) {
        return message
    }
}
