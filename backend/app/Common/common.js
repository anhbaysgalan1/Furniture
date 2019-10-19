const moment = use("moment")
const Auth = use('Auth')
const ApiException = use("App/Exceptions/ApiException")
module.exports = {
    roundingTime: function (timeObj) {
        let { root, range = 15, time, type } = timeObj

        ///get duration time between time and root time
        var duration = moment.duration(moment(time).diff(moment(root)));
        duration = Math.floor(duration.asMinutes())

        //số lần chênh lệch khoảng thời gian làm tròn
        let count = Math.floor(duration / range)
        if (count == duration / range) {
            return moment(time)
        }
        //lam tron len
        let downRoundingTime = moment(root).add(count * range, 'minutes')
        //lam tron xuong
        let upRoundingTime = moment(downRoundingTime).add(range, 'minutes')
        if (type == 2) {
            return upRoundingTime
        }
        if (type == 1) {
            return downRoundingTime
        }
    },
    is_allow_level_2: function () {
        let { permissions = [] } = Auth.user
        if (permissions.includes('allow_level_2')) {
            return true
        } else {
            return false
        }

    },
    string_to_ISO(date) {
        let day = this.checkFormatDate(date)
        day = day + 'T00:00:00.000Z'
        return new Date(day)
    },
    // roundIsoDate(date){
    //     date
    // }
    checkFormatDate(dateString) {
        try {
            let formatDate = moment(dateString).format('YYYY-MM-DD')
            if (dateString !== formatDate) {
                throw new ApiException(422, "Yêu cầu truyền date dạng YYYY-MM-DD!")
            }
            return dateString
        }
        catch (err) {
            throw new ApiException(422, "Yêu cầu truyền date dạng YYYY-MM-DD!")
        }
    },
    getOnlyHoursMinutes(time) {
        let convert_time = moment(time).utcOffset(0);
        convert_time.set({ second: 0, millisecond: 0 })
        convert_time.toISOString()
        return new Date(convert_time)
    },
  
    _60TimeFormat: function (milliseconds) {
        let totalMinutes = Math.round(milliseconds / (1000 * 60))
        let hours = Math.floor(totalMinutes / 60);
        let minutes = totalMinutes % 60
        if(!hours && !minutes){
            return '0'
        }
        hours = hours < 10 ? '0' + hours : hours
        minutes = minutes < 10 ? '0' + minutes : minutes
        return Number(hours + "." + minutes);
    },
    _10TimeFormat: function (milliseconds) {
        let totalMinutes = milliseconds / (1000 * 60)
        let hours = totalMinutes / 60;
        return parseFloat(hours.toFixed(2))
    }
};