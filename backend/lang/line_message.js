const Env = use('Env');
const LANG = Env.get("LANG", "")
module.exports = {
    getRequestLineMessage: function (name, type, content) {
        let line_message = []
        if (LANG === "vi") {
            line_message = [
                "",
                `Bạn vừa nhận được một xin phép đi muộn về sớm từ ${name}.`,
                `Bạn vừa nhận được một xin phép OT từ ${name}.`,
                `Bạn vừa nhận được một xin nghỉ có lương từ ${name}.`,
                `Bạn vừa nhận được một xin nghỉ không lương từ ${name}.`,
                `Bạn vừa nhận được một xin nghỉ bù từ ${name}.`,
                `Bạn vừa nhận được một xin nghỉ thay thế từ ${name}.`,
            ]
        } else {
            line_message = [
                "",
                `${name}から遅刻・早退の申請を受け取りました。`,
                `${name}から残業の申請を受け取りました。`,
                `${name}から有給休暇の申請を受け取りました。`,
                `Bạn vừa nhận được một xin nghỉ không lương từ ${name}. Nội dung: ${content}`,
                `${name}から代休の申請を受け取りました。`,
                `${name}から振替休日出勤の申請を受け取りました。`,
            ]
        }

        return line_message[type]
    },
    getReportLineMessage: function (name, content) {
        let line_message = ""
        if (LANG === "vi") {
            line_message = `Bạn vừa nhận được một báo cáo từ ${name}.`
        } else {
            line_message = `${name}から作業報告を受け取りました。`
        }
        return line_message
    }
}
