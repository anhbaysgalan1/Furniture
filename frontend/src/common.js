import moment from 'moment'
export default  {
    _60TimeFormat: function (milliseconds) {
        let totalMinutes = Math.round(milliseconds / (1000 * 60))
        let hours = Math.floor(totalMinutes / 60);
        let minutes = totalMinutes % 60
        hours = hours < 10 ? '0' + hours : hours
        minutes = minutes < 10 ? '0' + minutes : minutes
        return hours + "." + minutes;
    },
    _10TimeFormat: function (milliseconds) {
        let totalMinutes = milliseconds / (1000 * 60)
        let hours = totalMinutes / 60;
        return hours.toFixed(2)
    },
    getOnlyHoursMinutes: function(time) {
        let convert_time = moment(time).utcOffset(0);
        convert_time.set({ second: 0, millisecond: 0 })
        convert_time.toISOString()
        return new Date(convert_time)
    }
};