
export default {
    LogOut: {
        title: "Thoát đăng nhập",
        contentText: "Bạn có muốn thoát đăng nhập không?",
        agree: "Đồng ý",
        disagree: "Không đồng ý"
    },
    toolTip: {
        print: "In",
        excel: "Export"
    },
    Forbidden: {
        title: "Bạn không có quyền truy cập trang này"
    },
    NotFound: {
        title: "Nội dung không tìm thấy hoặc không tồn tại!"
    },
    Exception: {
        all: 'Tất cả',
        notCheckIn: 'Không có dữ liệu',
        notCheckOut: 'Không có dữ liệu',
        typeDayoff: "Loại ngày nghỉ", //
        listRequest: 'Danh sách xin phép', //
        setCalendar: 'Xin phép đi làm nghỉ thay thế đã được phê duyệt. Vui lòng sắp xếp lịch làm việc cho nhân viên', //
        timeSevenDate: 'Vui lòng chọn ngày nghỉ thay thế cách ngày làm thay thế 1 tuần', //
        excelTypeError: "Vui lòng chọn định dạng file excel!",
        locationAlert: "Hãy cho phép ứng dụng sử dụng địa chỉ của bạn!",
        from: 'Ngày bắt đầu',
        to: 'Ngày kết thúc',
        title: 'Tiêu đề', //
        endDate: "Thời gian kết thúc phải lớn hơn thời gian bắt đầu",
        manyDate: 'Chọn nhiều ngày', //
        sameCalendar: 'Ngày có cùng lịch làm việc', //
        employeeWarning: 'Vui lòng chọn công nhân', //
        warning: 'Vui lòng chọn đầy đủ công nhân và quản lý công trường', //
        manageWarning: 'Vui lòng chọn quản lý công tường', //
        notificationInOut: "Bạn vui lòng nhập giờ check Out",
        errHour: 'Bạn nhập thừa thời gian',
        errMinute: 'Bạn nhập thừa thời gian',
        history: "Lịch sử đi làm",
        errTimeInOut: 'Bạn nhập thời gian nhỏ hơn check In/Out',
        errCheckInOut: 'Không chọn giờ check Out nhỏ hơn giờ check In',
        checkCoincide: 'Bạn đã tạo xin phép loại này trong ngày ',
        inputOkCancel: 'Muốn tiếp tục chọn OK nếu không chọn Hủy bỏ',
        noData: "Không có dữ liệu"
    },
    Form: {
        // Validate User
        codeExcelErr: 'Sai định dạng mã code công trường!',
        noOption: "no options",
        hours: "Giờ phải nhỏ hơn 24",
        hoursRequest: 'Số giờ đi muộn nhỏ hơn 8',
        notValidDate: "Sai định dạng ngày truyền vào!",
        minutes: "Phút phải nhỏ hơn 60",
        maxLeng1000: 'Vui lòng nhập tối đa 1000 kí tự',
        maxLeng1000ContentRequest: 'Lý do xin phép không vượt quá 1000 ký tự',
        maxLeng255: 'Vui lòng nhập tối đa 255 kí tự',
        mangleng11: 'Vui lòng nhập tối đa 11 kí tự',
        max20: 'Vui lòng nhập giá trị nhỏ hơn hoặc bằng 20',
        max60: 'Vui lòng nhập giá trị nhỏ hơn 60',
        number: 'Vui lòng nhập số',
        lengPhone: 'Vui lòng tối đa 11 số',
        lengMoney: 'VUi lòng tối da 10 số',
        User: {
            leng_1_255: 'Vui lòng nhập chữ và số với độ dài 0-255 kí tự và không chứa khoảng trắng',
            leng_255: 'Độ dài',
            password: 'Vui lòng nhập chữ và số với độ dài dưới 18 kí tự và không chứa khoảng trắng',
            code: 'Vui lòng nhập chữ và số với độ dài 1-15 kí tự và không chứa khoảng trắng',
            name: 'Vui lòng nhập chữ độ dài 1-50 kí tự',
            min2: 'Vui lòng nhập lớn hơn 1 kí tự',
            maxLength15: "Vui lòng nhập nhỏ hơn 15 kí tự",
            phone: 'Vui lòng nhập số với độ dài 1-11 kí tự',
            number: 'Vui lòng nhập số nhỏ hơn hoặc bằng 20',
        },
        Role: {
            name: "Vui lòng nhập chữ với độ dài 1-50 kí tự",
        },
        Position: {
            code: "Vui lòng nhập chữ có độ dài 1-15 kí tự và không chứa khoảng trắng",
            name: 'Vui lòng nhập chữ độ dài 1-50 kí tự',
            remuneration: "Vui lòng nhập số có độ dài từ 1-10 kí tự",
        },
        Recruiment: {
            code: "Vui lòng nhập chữ và số có độ dài 1-15 kí tự và không chứa khoảng trắng",
            name: "Vui lòng nhập nhỏ hơn 50 kí tự",
        },
        Construction: {
            code: "Vui lòng nhập chữ và số có độ dài 1-8 kí tự và không chứa khoảng trắng",
            name: "Vui lòng nhập nhỏ hơn 100 kí tự ",
            address: "Vui lòng nhập nhỏ hơn 100 kí tự",
            amount: "Vui lòng nhập số nguyên có độ dài 1-12 kí tự",
            cost: "Vui lòng nhập số nguyên có độ dài 1-12 kí tự",
            number: "Vui lòng nhập số nguyên có độ dài 1 đến 12 chữ số"
        },
        Report: {
            Title: "Vui lòng nhập chữ có độ dài từ 1-100 kí tự", // create- tiêu đề
            Contractor: "Vui lòng nhập chữ có độ dài từ 1-100 kí tự", // nhà thầu
            Content: "Vui lòng nhập chữ có độ dài từ 1-1000 kí tự", // nội dung
            Construction_unit: "Vui lòng nhập chữ có độ dài từ 1-100 kí tự", // Đơn vị thi công
            Problem_report: "Vui lòng nhập chữ có độ dài từ 1-2000 kí tự", // Vấn đề báo cáo
        },
        Request: {
            Content: "Vui lòng nhập kí tự có độ dài nhỏ hơn 1000",
            Hour: "vui lòng nhập giờ nhỏ hơn 24",
            Minute: "Vui lòng nhập phút nhỏ hơn hoặc bằng 60"
        },
        History: {
            endTime: "Ngày Check Out phải lớn hơn ngày check In"
        },


        CheckInOut: {
            number: 'Chỉ được phép nhập số',
            checkTime: 'Thời gian nhập vào không được lớn hơn khoảng thời gian check out trừ check in, vui lòng kiểm tra lại!',
            totalHour: 'Vui lòng xác nhận tổng giờ làm hôm nay của bạn',
            maxTotal: "Thời gian nhập vào phải nhỏ hơn tổng giờ làm"
        },
        buttonOK: "OK",
        buttonClear: 'Clear',
        required: "Vui lòng nhập đầy đủ thông tin",
        min: "Vui lòng nhập giá trị nhỏ nhất là ${arguments[0]}",
        max: "Vui lòng nhập giá trị lớn nhất là ${arguments[0]}",
        minLength: "Vui lòng nhập tối thiểu ${arguments[0]} ký tự",
        maxLength: "Vui lòng nhập tối đa ${arguments[0]} ký tự",
        lessThan: "Vui lòng nhập giá trị nhỏ hơn ${arguments[0]}",
        greatherThan: "Vui lòng nhập giá trị lớn hơn ${arguments[0]}",
        incorrectPassword: "Tài khoản hoặc mật khẩu không chính xác. Nếu bạn đã quên thông tin, vui lòng liên hệ quản trị viên để được trợ giúp.",
        duplicateDate: "Ngày này đã tồn tại. Vui lòng chọn ngày khác !",
        pastDate: "Đây là ngày trong quá khứ. Vui lòng chọn ngày khác !",
        lessHour: "giờ phải nhỏ hơn giờ tiếp theo",
        userName: "vui lòng nhập từ 6 đến 16 ký tự bao gồm chữ cái và số!",
        noSpace: "Vui lòng không nhập khoảng trắng!"
    },
    Common: {
        start: "Bắt đầu",
        end: "Kết thúc",
        from: 'Từ',
        to: 'Đến',
        time: "Thời Gian",
        hour: "Giờ",
        minute: "Phút",
        ceil: "Làm tròn lên",
        floor: "Làm tròn xuống",
        minute: "Phút",
        monday: "Thứ hai",
        tuesday: "Thứ ba",
        wednesday: "Thứ tư",
        thursday: "Thứ năm",
        friday: "Thứ sáu",
        saturday: "Thứ bảy",
        sunday: "Chủ nhật"
    },
    Input: {
        hourType: 'Chọn kiểu giờ',
        choseDate: 'Lọc theo ngày', //
        filterDate: 'Chọn ngày', //
        month: "Tháng",
        latLong: 'Tọa độ',
        hours: "Giờ",
        minutes: "Phút",
        Filter: "Lọc...",
        hourCheckIn: 'Giờ check In',
        totalTime: "Tổng thời gian",
        hourCheckOut: 'Giờ check Out',
        notProfit: 'Bạn không có quyền Profit',
        notSortUser: 'Bạn không có quyền Sort User',
        errorCheckOut: 'Giờ check Out không được nhỏ hơn giờ check In',
        dateStart: 'Ngày bắt đầu',
        dateEnd: 'Ngày kết thúc',
        pickMonth: "Chọn tháng",
        _date: "Ngày làm thay thế",
        replaceDate: 'Ngày nghỉ thay thế',
        createFormatContent: 'Nội dung báo cáo',
        listUser: 'DS Nhân viên',
        username: "Tên nhân viên",
        subject: "Tiêu đề báo cáo",
        amount: "Tiền hợp đồng",
        cost: "Tiền công",
        costAmount: "Tỉ lệ lợi nhuận",
        name: "Nhân viên",
        userCode: "Mã nhân viên",
        manage: "Người phê duyệt",
        warning: "Khẩn cấp",
        manage1: "Người phê duyệt cấp 1",
        manage2: "Người phê duyệt cấp 2",
        address: "Địa chỉ",
        constructionCode: "Mã công trường",
        constructionName: "Tên công trường",
        contractor: "Nhà thầu",
        construction_unit: "Đơn vị thi công",
        content: "Vấn đề liên lạc",
        report: "Nội dung báo cáo",
        account: "Tài khoản",
        wokingDayOff: "Ngày Làm thay thế",
        dateDayOff: "Ngày nghỉ thay thế",
        filter: "Lọc",
        phonenumber: "Số điện thoại",
        group: "Nhóm",
        password: "Mật khẩu",
        rePassword: "Nhập lại mật khẩu",
        date: "Ngày",
        name: "Tên nhân viên",
        code: "Mã Nhân viên",
        groupCode: "Mã nhóm",
        groupName: "Tên nhóm",
        title: "Tiêu đề",
        calendarUser: "Lịch làm việc",
        content: "Nội dung",
        construction_unit: "Đơn vị thi công",
        problem_report: "Vấn đề liên lạc",
        classify: "Phân loại khu vực",
        dateRequest: "Ngày xin phép",
        dateReplace: "Ngày nghỉ thay thế",
        typeRequest: "Loại xin phép",
        checkbox: "Xin đi làm ngày nghỉ thay thế",
        roundStart: "Bắt đầu",
        roundEnd: "Kết thúc",
        roundType: "Kiểu làm tròn",
        holidayInProvision: 'Nghỉ theo quy định nhà nước',
        holidayOutProvision: "Nghỉ ngoài quy định nhà nước",
        holidayName: 'Tên ngày nghỉ',
        holidayType: 'Loại ngày nghỉ',
        chooseDate: "Chọn số ngày cùng lịch làm việc",
        user: {
            username: "Tên Đăng Nhập",
            code: 'Mã Nhân Viên',
            name: 'Tên Nhân Viên',
            phone: 'Số Điện Thoại',
            role: "Vai trò",
            position: 'Chức Vụ',
            group: 'Nhóm',
            recruiment: 'Khu Vực',
            joining_date: 'Ngày Vào Công Ty',
            password: "Mật Khẩu",
            rePassword: "Nhập Lại Mật Khẩu",
            remainLastYear: "Năm trước",
            remainThisYear: "Năm nay",
            remainTotal: "Tổng số",
            dayOff: "有給繰越日数", //"Số ngày nghỉ có tính lương", 

        },
        changePassword: {
            title: "Thay đổi mật khẩu người dùng",
            // notice: "Khi thay đổi mật khẩu thì tài khoản của người dùng cũng sẽ",
        },
        role: {
            name: "Tên Vai Trò",
            permission: "Khả Năng Truy Cập",
        },

        position: {
            code: "Mã Chức Vụ",
            name: "Tên Chức Vụ",
            remuneration: "Tiền Thù Lao",
        },

        recruiment: {
            code: "Mã Khu Vực",
            name: "Tên Khu Vực",
        },

        construction: {
            titleContent: 'Tiêu đề nội dung',
            formatContent: 'Nội dung công việc',
            time: "Thời gian",
            info: "Thông tin công trường",
            date: "Ngày",
            code: "Mã công trường",
            name: "Tên công trường",
            address: 'Địa chỉ',
            amount: 'Tiền hợp đồng',
            slideTime: "Slide Time",
            cost: 'Dự tính tiền công',
            profit: "Tỉ lệ lợi nhuận",
            contractors: "Nhà thầu",
            content: 'Nội dung công việc',
            manage: "Quản lý công trường",
            typeRequests: "Loại xin phép",
            workNight: "Ca đêm"
        },
        request: {
            type: "Loại xin phép",
            type_1: "OT sáng sớm",
            typeEarlyLate: "Đi muộn/về sớm",
            typeOT: "Xin OT",
            typeSalary: "Nghỉ có lương",
            // typeWorkOnDayOff: "Xin đi làm vào ngày nghỉ",
            typeCompensated: "Nghỉ bù",
            typeReplace: "Xin đi làm và nghỉ thay thế",
            typeHoliday: "Xin nghỉ",
            type_2: "Về sớm",
            workingHoliday: "Đi làm ngày nghỉ",
            dayOffSalary: "Ngày nghỉ có lương",
            holidaysInstead: "Ngày nghỉ bù",
            dayLeft: "ngày"
        }
    },
    Label: {
        hourSetting: "Cài đặt hiển thị giờ",
        settingWorkingTime: "Cài đặt thời gian làm việc",
        workingTime: "Thời gian làm việc",
        overTimeBefore: "Thời gian OverTime sáng sớm",
        overTime: "Thời gian OverTime",
        overTimeNight: "Thời gian OverTime đêm muộn",
        settingRound: "Cài đặt cách làm tròn",
        settingHoliday: "Cài đặt ngày nghỉ",
        settingWeekHoliday: "Cài đặt ngày nghỉ trong tuần",
        settingWorkDay: "Cài đặt ngày làm việc",
        updateHoliday: "Cập nhật ngày nghỉ",
        calendar: "Lịch làm việc",
        settingEmployees: 'Chọn nhân viên cho công trường',
        Chat: "Trao đổi",
        failLine: "Bạn liên kết tài khoản Line không thành công!",
        successLine: "Bạn liên kết tài khoản Line thành công!",
        noonBreak: "Thời gian nghỉ trưa",
    },
    Button: {
        formatContent: "Format content",
        refreshExcel: 'Làm mới',
        line_account: "Tài khoản Line",
        changePassword: 'Đổi MK',
        chose: "Chọn",
        listContent: 'Create content', //
        createInput: 'Thêm thủ công',
        createContainer: 'Tạo nội dung',
        create: "Thêm",
        edit: "Sửa",
        delete: "Xóa",
        importFile: 'import',
        back: "Back",
        createUser: "Thêm người dùng",
        createGroup: "Tạo nhóm",
        createRecruiment: "Tạo Khu Vực",
        createUser: "Tạo nhân viên",
        createGroup: "Tạo nhóm",
        approved: '承認',//"承認",
        unApproved: '非承認',  //"非承認",
        ok: "OK",
        view: "Đã xem",
        unview: "Chưa xem",
        cancel: "Hủy bỏ",
        report: "Báo cáo",
        request: "Xin phép",
        unRequest: 'Xin phép lại',
        detail: "Chi tiết",
        detailReport: '詳細',
        search: "Search",
        logout: "Log Out",
        submit: "Xác nhận",
        addDayOff: "Thêm ngày nghỉ",
        confirmAllow: "Bạn đồng ý phê duyệt xin phép",
        confirmSkip: "Bạn đồng ý bỏ qua xin phép",
        changeConfirmAllow: 'Bạn có muốn thay đổi trạng thái xác nhận',
        allow: "Allow",
        allow_one: "Allow",
        allow_two: "Allow",
        skip: 'Skip',
        skip_one: 'Skip',
        skip_two: 'Skip',
        round: "Round",
        unRound: "UnRound"
    },
    Sidebar: {
        
        order: "Quan ly don hang",
        goods: "Quan ly hang hoa",
        bad: 'Giường ngủ',
        diningRoom: 'Phòng bếp',
        tableEat: 'Bàn ăn',
        tableRestaurant: 'Bàn nhà hàng',
        question: 'Câu hỏi thường gặp',
        contact: 'Liên hệ',
        center: "Trang chủ",
        info: 'Giới thiệu',
        registration: 'Đăng kí nhận tin tức',
        partner: 'Đối tác',
        new: 'Tin tức',
        introduce: 'Giới thiệu',
        job: 'Ngành nghề',
        user: "Trang chủ",
        group: "Nhóm",
        role: "Vai Trò",
        position: "Chức Vụ",
        recruiment: "Tin tuyển dụng",
        dayoff: "Ngày nghỉ đặc biệt",
        report: "Báo cáo",
        construction: "Quản lý công trường",
        labor: "Quản lý lao động",
        history: "Danh sách lịch sử đi làm",
        worker: "Check in/out",
        request: "Phê duyệt xin phép",
        settingTime: "Cài đặt thời gian",
        hour: "Quản lý giờ làm",
        hourDetail: "Tình hình chấm công",
        calendar: "Lịch làm việc",
        timekeeping: "Bảng chấm công của từng nhân viên",
        distance_fuel: "Bảng lịch sử chấm công theo ngày"
    },
    Breadcrumb: {
        postsChangeTable: 'Chọn vị trí bàn ăn',
        postsSizebad: 'Chọn kích thước giường',
        postsExport: 'Đạt tiêu chuẩn xuất khẩu',
        postsQuality: 'Tiêu chuẩn xuất khẩu',
        postsGuarantee: 'Bảo hành chu đáo',
        postsQuality: 'Tiêu chuẩn xuất khẩu',
        goodsIndex: 'Quan ly hang hoa',
        orderIndex: 'Quan ly don hang',
        badIndex: 'Giường ngủ',
        diningRoomIndex: 'Phòng bếp',
        tableEatIndex: 'Bàn ăn',
        tableRestaurantIndex: 'Bàn nhà hàng',
        centerIndex: 'Đồ gỗ nội thất Dodo',
        infoIndex: 'Giới thiệu',
        contactIndex: 'Liên hệ',
        registrationIndex: "Đăng kí",
        partnerIndex: 'Đối tác',
        introduceIndex: 'Giới thiệu',
        jobIndex: 'Công việc',
        newIndex: 'Tin tức',
        recruimentIndex: "Tuyển dụng",
        questionIndex: 'Câu hỏi thường gặp',

        userIndex: "Trang chủ",
        userCreate: "Thêm mới người dùng",
        userEdit: "Sửa thông tin người dùng",

        groupCreate: "Thêm mới nhóm",

        roleIndex: "Vai trò",
        roleCreate: "Thêm Vai Trò",
        roleEdit: "Sửa Vai Trò",

        positionIndex: "Chức Vụ",
        positionCreate: "Thêm Chức Vụ",
        positionEdit: "Sửa Chức Vụ",


        recruimentCreate: "Thêm Khu Vực",
        recruimentEdit: "Sửa Khu Vực",

        settingTime: "Cài đặt thời gian",

        dayoffIndex: "Ngày nghỉ đặc biệt",
        dayoffCreate: "Thêm",
        dayoffEdit: "Sửa",

        reportIndex: "Báo cáo",
        reportCreate: "Tạo báo cáo",
        reportDetail: "Chi tiết báo cáo",

        constructionIndex: "Danh sách Công trường",
        constructionCreate: "Thêm Công Trường",
        constructionEdit: "Sửa Công Trường",

        laborIndex: "Quản lí lao động",
        laborDetail: "Chi tiết quản lí lao động",

        historyIndex: "Danh sách lịch sử đi làm",
        historyEdit: "Sửa lịch sử đi làm",
        historyDetail: "Chi tiết lịch sử lao động",

        worker: "Check in/out", // 'Công nhân',

        hourIndex: 'Quản lý giờ làm',
        hourDetail: "Tình hình chấm công",

        requestIndex: "Phê duyệt xin phép",
        requestCreate: "Tạo xin phép",
        requestDetail: "Chi tiết xin phép",
        requestEdit: 'Xin phép lại',

        calendarIndex: "Lịch làm việc",
        timekeepingIndex: "Bảng chấm công của từng nhân viên",
        distance_fuel: "Bảng lịch sử chấm công theo ngày",

        contentsIndex: 'Danh sách nội dung',
        contentsCreate: 'Tạo nội dung',
        contentsEdit: 'Sửa nội dung',

        notFound: "Không tìm thấy"
    },
    Table: {
        header: {
            row: "Hàng",
            index: "STT",
            code: 'Code',
            name: 'Tên',
            username: 'Tài Khoản',
            status: 'Trạng thái',
            createdAt: 'Ngày Tạo',
            action: 'Hành Động',
            content: "Nội dung",
            date: 'Ngày',
            dateRequest: "Ngày xin phép",
            allow: "Trạng thái",
            user: {
                username: "Tài Khoản",
                index: "STT",
                code: 'Mã Nhân viên',
                name: 'Tên Nhân viên',
                phone: 'Số Điện Thoại',
                positionCode: "Mã Chức Vụ",
                positionName: "Tên Chức Vụ",
                recruimentName: "Khu Vực",
                countUsed: "Số ngày nghỉ có lương đã sử dụng",
                remain: "Số ngày nghỉ có lương còn lại",
                remainByWorkingOnDayOff: "Số ngày nghỉ bù còn lại",
                dayOffInFuture: "Ngày Dự Định Nghỉ",
            },
            role: {
                code: 'Mã Vai Trò',
                name: 'Tên Vai Trò',
                permission: 'Khả Năng Access',
                userCount: 'Số lượng user',
            },
            position: {
                code: 'Mã Chức Vụ',
                name: 'Tên Chức Vụ',
                remuneration: 'Tiền Thù Lao',
                number: "Số lượng user",
            },
            recruiment: {
                code: 'Mã Khu Vực',
                name: 'Tên Khu Vực',
            },
            construction: {
                timeConstruction: 'Giờ làm tại công trường',
                totalPeople: "Tổng số người",
                totalDate: 'Tổng số ngày',
                totalProfit: 'Tổng Phí lao động',
                code: 'Mã Công Trường',
                name: 'Tên Công Trường',
                cost: 'Tiền hợp đồng',
                amount: 'Dự tính tiền công',
                userName: "Tên nhân viên",
                notCheckOut: "Chưa check out",
                startTime: 'Giờ đi làm thực tế',
                endTime: 'Giờ tan làm thực tế',
                dateStart: 'Ngày bắt đầu',
                dateEnd: 'Ngày kết thúc',
                _startTime: 'Giờ đi làm (Đã làm tròn)',
                _endTime: 'Giờ tan làm (Đã làm tròn)',
                date: 'Ngày',
                address: 'Địa chỉ',
                workTime: "Giờ làm việc",
                // workTime: "Giờ đi làm",
                workingTime: "Giờ đi làm",
                workingTimeInOut: "Giờ làm thực tế",
                _workingTimeInOut: "Giờ đã làm tròn",
                total: "Tổng",
                manage: "Người phê duyệt",
            },
            report: {
                title: "Tiêu đề",
                type: "Loại xin phép",
            },
            request: {
                dateDayOff: "getErrorTime thay thế",
                dateRequest: "Ngày xin phép",
                typeRequest: "Loại xin phép ",
                manage: "Người phê duyệt",
            },
            labor: {
                workTime: "Thời gian lao động tại công trường",
                laborTotal: "Tổng",
                totalWorkers: "Tổng số người",
                totalSalary: "Tổng phí lao động",
                profit: "Phí lao động tại công trường",
                detail: "chi tiết"
            },
            hour: {
                totalDays: "Số ngày đi làm",
                standardHour: "Số giờ làm việc trong thời gian làm việc tiêu chuẩn",
                morningOT: "Số giờ OT Sáng",
                nomalOT: "Số giờ OT bình thường",
                nightOT: "Số giờ OT đêm",
                statutoryDays_standardHour: "Số giờ làm việc trong thời gian làm việc tiêu chuẩn ngày nghỉ theo luật định",
                statutoryDays_morningOT: "Số giờ OT sáng sớm trong ngày nghỉ luật định",
                statutoryDays_nomalOT: "Số giờ OT bình thường trong ngày nghỉ luật định",
                statutoryDays_nightOT: "Số giờ OT đêm muộn trong ngày nghỉ luật định",
                nonStatutoryDays_standardHour: "Số giờ làm việc trong thời gian tiêu chuẩn ngày nghỉ ngoài quy định nhà nước",
                nonStatutoryDays_morningOT: "Số giờ OT sáng sớm trong ngày nghỉ ngoài luật định",
                nonStatutoryDays_nomalOT: "Số giờ OT bình thường trong ngày nghỉ ngoài luật định",
                nonStatutoryDays_nightOT: "Số giờ OT đêm muộn trong ngày nghỉ ngoài luật định",
                lateWork: "Đi muộn về sớm",
                totalTime: "Tổng thời gian lao động",
                rosteredDayOff: "Số ngày đã nghỉ bù"
            },
            timekeeping: {
                work_distance: "Khoảng cách di chuyển đi làm",
                personal_distance: "Khoảng cách di chuyển cá nhân",
                fuel: "Nhiên liệu đã dùng"
            }
        }
    },
    Message: {
        failedRequest: "Kiểm tra kết nối internet!",
        createDataSuccess: "Thêm mới dữ liệu thành công",
        crearteDataConstruction: "Thêm mới dữ liệu thành công",
        editDataSuccess: "Cập nhật dữ liệu thành công",
        deleteDataSuccess: "Đã xóa dữ liệu thành công",
        deleteDialogTitle: "Bạn có muốn xóa dữ liệu đã chọn không?",
        deleteDialogContent: "Dữ liệu sẽ không thể khôi phục sau khi xóa, vì vậy hãy cẩn trọng trong thao tác này.",
        deleteGroupDataSuccess: 'Xóa dữ liệu thành công',
        createGroupSuccess: "Thêm mới nhóm thành công",
        passwordNotMatch: "Mật Khẩu Không Khớp. Hãy Nhập Lại !",
        failHour: "Giờ nhập vào không chính xác, vui lòng xem lại !",
        userName: "Tên đăng nhập phải từ 6 đến 15 ký tự",
        erroeName: "Tên vai trò đã tồn tại",
        importExcel: "Bạn vừa thêm mới ${arguments[0]} công trường và update ${arguments[1]} công trường!",
        excelError: '${arguments[0]} công trường chưa đủ hoặc sai thông tin. Vui lòng xem lỗi bên dưới và cập nhật lại vào file excel gốc, sau đó bấm vào nút "Làm mới" để upload lại.'

    },
    User: {
        username: "Tài khoản",
        password: "Mật khẩu",
        remember: "Ghi nhớ tài khoản",
        signin: "Đăng nhập"
    },
    DayOff: {
        addDayOff: "Thêm ngày nghỉ",
        chooseDayOff: "Chọn ngày nghỉ",
        remain: "Còn lại",
        day: "ngày",
        type: {
            label: "Chọn Kiểu Nghỉ",
            hasSalary: "Nghỉ Có Lương",
            compensatoryLeave: "Nghỉ Bù",
            unpaidLeave: "Nghỉ không lương",
        }
    },
    Calendar: {
        manageName1: "Quản lý cấp 1",
        manageName2: "Quản lý cấp 2",
        note: 'Chú thích',
        request: 'Xin phép',
        dayOff: 'getErrorTime',
        checkInOut: 'Check In/Out',
        construction: 'Công trường',
        notCheckOut: "Chưa báo cáo giờ về",
        request: "Xin phép",
        unRequest: "Xin phép lại",
        titleRequest: "Tạo xin phép",
        report: "Báo cáo",
        listConstruction: "Danh sách công trường",
        createRequest: "Tạo xin phép",
        checkIn: "Check In",
        checkOut: "Check Out",
        localizer: "vi",
        today: "Hôm nay",
        back: "Tháng trước",
        next: "Tháng sau"
    },
    Construction: {
        choose: "Chọn lịch làm việc cho công trường",
        info: 'Thông tin công trường',
        code: 'Mã công trường',
        name: "Tên công trường",
        employees: 'Công nhân',
        address: "Địa chỉ",
        warning: 'Vui lòng lựa chọn đầy đủ công nhân và quản lý công trường',
        manage: "Quản lý công trường",
        content: "Nội dung công việc",
        amount: "Tiền hợp đồng($)",
        cost: "Dự tính tiền công($)",
        profit: 'Tỉ lệ lợi nhuận(%)',
        contructionProfit: "Tỉ lệ lợi nhuận(%)",
        manage: 'Admin Công trường',
        content: 'Nội dung công việc'
    },
    History: {
        detailHistory: "Chi tiết lịch sử",
        editHistory: "Sửa lịch sử",
        coordinates: "Tọa độ",
    },
    Report: {

    },
    Request: {
        signConstruction: "Xóa công trường", // crete
        pushConstruction: "Thêm công trường"
    },
    Worker: {
        request: "Xin phép",
        detailConstruction: "Chi tiết công trường",
    },
    PagingPanel: {
        rowPerPage: "Rows Per Page",
        of: " ",
        format: "of"
    },
    Backend: {
        DbObject: {
            Id_Required: "Id of Object is required",
            No_Object: "Object not found or Id is incorrect"
        },
        User: {
            User_Code_Exist: "Tên đăng nhập hoặc mã nhân viên đã tồn tại. \nVui lòng nhập tên hoặc mã khác",
            User_Permission: "Bạn không có quyền quản lý người dùng",
            Del_User_Warn: "Bạn không thể xóa người dùng đã có lịch sử đi làm"
        },
        Recruiment: {
            Recruiment_Code_Exist: "Mã khu vực hoặc tên khu vực đã tồn tại. \nVui lòng nhập tên hoặc mã khác",
            Recruiment_Update_Warning: "Bạn không thể sửa khu vực này",
            Recruiment_Del_Warning: "Bạn không thể xóa khu vực này"
        },
        Role: {
            Role_Name_Exist: "Tên vai trò đã tồn tại. Vui lòng nhập tên khác",
            Permission_Not_Exist: "Không tồn tại quyền bạn chọn trong hệ thống",
            Role_Has_User: "Bạn không thể xóa vai trò do đang có người áp dụng"
        },
        Request: {
            New_Req_Warn: "Không thể tạo xin phép trong quá khứ. Vui lòng kiểm tra lại",
            Invalid_Req_Type: "Loại xin phép không hợp lệ",
            Req_DayOff_Warn: "Không thể xin nghỉ vào ngày nghỉ. Vui lòng chọn ngày khác",
            Req_Holiday_Warn: "Không thể xin nghỉ vào ngày lễ. Vui lòng chọn ngày khác",
            Req_ReDate_Warn: "Không thể xin đi làm thay thế vào ngày đã được phân công đi làm ",
            Choose_ReDate_Warn: "Chỉ được chọn ngày nghỉ thay thế trước hoặc sau 1 tuần tính từ ngày đi làm thay thế",
            User_Req_Check: "Bạn không phải là người xin phép",
            Input_Time_Warn: "Thời gian đi muộn/về sớm phải lớn hơn 0. Vui lòng kiểm tra lại",
            Input_OT_Warn: "Thời gian kết thúc phải lớn hơn thời gian bắt đầu"
        },
        Position: {
            Position_Code_Exist: "Mã chức vụ đã tồn tại. Vui lòng nhập mã khác",
            Position_Has_User: "Bạn không thể xóa chức vụ do có người đang áp dụng"
        },
        Worker: {
            Check_In_Once: "Bạn chỉ có thể check in 1 lần trong ngày",
            Not_Check_In: "Bạn chưa check in. Vui lòng kiểm tra lại",
            Expired_Update_Warning: "Đã hết hạn sửa thời gian. Vui lòng liên hệ với quản lý của bạn",
            User_Not_Exist: "Tài khoản bạn không có trong hệ thống. Vui lòng kiểm tra lại",
            No_Position: "Người dùng chưa được gán chức vụ nào. Vui lòng kiểm tra lại",
            No_ConstructionId: "Không tồn tại mã công trường trong hệ thống. Vui lòng kiểm tra lại",
            Update_Check_Out_Warning: "Thời gian nhập vào phải nhỏ hơn tổng giờ làm"
        },
        DayOff: {
            No_Add_Permission: "Bạn không có quyền thêm ngày nghỉ",
            DayOff_Exist: "Đã tồn tại ngày nghỉ trong hệ thống. Vui lòng chọn ngày khác",
            Out_Of_DayOff: "Người dùng đã hết ngày nghỉ có lương",
            Out_Of_DayOff_By_Working_On_DayOff: "Người dùng đã hết ngày nghỉ bù",
            DayOff_Warning: "Ngày đã chọn trùng với ngày nghỉ theo quy định. Vui lòng chọn ngày khác",
            Holiday_Warning: "Ngày đã chọn trùng với ngày nghỉ lễ. Vui lòng chọn ngày khác",
            No_Del_Permission: "Bạn không có quyền xóa ngày nghỉ !!!"
        },
        Construction: {
            No_Add_Permission: "Bạn không có quyền thêm công trường",
            Construction_Code_Exist: "Mã công trường đã tồn tại. Vui lòng nhập mã khác",
            No_Del_Permission: "Bạn không có quyền xóa công trường",
            Del_Construction_Warn: "Bạn không thể xóa Công trường đang được sử dụng",
            // Edit_Schedules_Warn: "Ngày  ${arguments[0]}  chưa có công nhân/quản lý. Vui lòng kiểm tra lại"
        },
        History: {
            Expired_Update_Warn: "Đã hết hạn sửa lịch sử. Vui lòng liên hệ với quản lý của bạn",
            Input_Construct_Warn: "Gửi thiếu hoặc thừa dữ liệu công trường",
            Input_WorkTime_Warn: "Thời gian nhập vào lớn hơn tổng thời gian làm"
        },
        Content: {
            Title_Exist: "Đã tồn tại tiêu đề trong hệ thống. Vui lòng nhập tiêu đề khác"
        }
    }


}