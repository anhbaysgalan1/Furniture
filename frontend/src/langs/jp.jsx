export default {

    LogOut: {
        title: 'ログアウト',
        contentText: 'ログアウトしますが、よろしいでしょうか？',
        agree: 'はい',
        disagree: 'いいえ'
    },
    toolTip: {
      print: "印刷",
      new: "追加",
      excel: "CSVへ出力",
      delete: "削除",
      edit: "編集",
    //   sort: "並べ替え",
    //   access: "Khả năng truy cập",
      import: "Excelから入力"

    },
    DateTimeField: {
        cancel: "キャンセル",
        locale: "ja",
        AM: "午前",
        PM: "午後",
        year: "年"
    },
    NotFound: {
        title: "お探しのページは見つかりませんでした。"
    },
    Form: {
        codeExcelErr: '工事現場コードのフォーマットが正しくないです。',
        noOption: "選択肢がありません",
        buttonOK: 'OK',
        buttonClear: '削除',
        checkLocale: "ja",
        required: 'この項目は必須項目です。',
        min: '最小値が ${arguments[0]} で入力してください。',
        max: '最大値が ${arguments[0]} で入力してください。',
        minLength: '最小 ${arguments[0]} 桁を入力してください。',
        maxLength: '最大 ${arguments[0]} 桁を入力してください。',
        lessThan: '${arguments[0]}以下入力してください。',
        greatherThan: '${arguments[0]}以上入力してください。',
        incorrectPassword: 'IDまたはパスワードが間違っています。アカウントの情報が忘れた場合、管理者に連絡してください。',
        duplicateDate: 'この日時は既に存在しています。別の日時を選んでください。',
        pastDate: '過去の日ですので、別の日を選んでください。',
        User: {
            userName: '6桁から24桁までの文字列（空白桁を含まない）を入力してください。',
            password: '18桁以内に（空白桁を含まない）入力してください。',
            code: '1桁から15桁までの文字列（空白桁を含まない）を入力してください。',
            name: '1桁から50桁までの文字列を入力してください。',
            min2: '1桁以上入力してください。',
            maxLength15: '15桁以内に数字を入力してください',
            phone: '1桁から11桁までの数字列を入力してください。',
            number: '20より小さい値を入力してください。',
            leng_1_255: '0桁から255桁までの文字列（空白桁を含まない）を入力してください。',
            leng_255: '文字列の長さ'
        },
        Role: {
            name: '1桁から50桁までの文字列を入力してください。'
        },
        Position: {
            code: '1桁から15桁までの文字列（空白桁を含まない）を入力してください。',
            name: '1桁から50桁までの文字列を入力してください。',
            remuneration: '1桁から10桁までの数字列を入力してください。'
        },
        Area: {
            code: '1桁から15桁までの文字列（空白桁を含まない）を入力してください。',
            name: '50桁以内に入力してください'
        },
        Construction: {
            code: '1桁から8桁までの文字列（空白桁を含まない）を入力してください。',
            name: '100桁以内に入力してください ',
            address: '100桁以内に入力してください',
            amount: '1桁から12桁までの数字列を入力してください。',
            cost: '1桁から12桁までの数字列を入力してください。',
            number: '１桁から12桁までの数字列を入力してください。'
        },
        Report: {
            Title: '100桁以内に入力してください',
            Contractor: '100桁以内に入力してください',
            Content: '1000桁以内に入力してください',
            Construction_unit: '100桁以内に入力してください',
            Problem_report: '2000桁以内に入力してください'
        },
        Request: {
            Content: '1000桁以内に入力してください',
            Hour: '時間は24時間以内の値を入力してください。',
            Minute: '分数は60以内の値を入力してください。'
        },
        History: {
            endTime: '退勤日は出勤日以降にしなければなりません。'
        },
        CheckInOut: {
            number: '数字のみを入力してください。',
            checkTime: '入力した労働時間はシステムに記録された時間を超えました。再度確認してください!',
            totalHour: '　労働時間を確定してください。',
            maxTotal: '振り分けした時間の合計はシステムに記録された時間を超えられません。',      
            splitTime: "少なくとも1つの工事現場に労務時間を振り分ける必要があります。"
        },
        lessHour: '退勤時間は出勤時間の以降にしなければなりません。',
        userName: '6桁から16桁までの文字や数字を両方入力してください。',
        noSpace: '空白を入力しないでください!',
        hours: '時間は24時間以内の値を入力してください。',
        hoursRequest: '時間は8時間以内の値を入力してください。',
        notValidDate: '日付のフォーマットが不正です。',
        minutes: '分数は60以内の値を入力してください。',
        maxLeng1000: '1000桁以内に入力してください',
        maxLeng255: '255桁以内に入力してください',
        mangleng11: '11桁以内に入力してください',
        max20: '20より小さい値を入力してください。',
        max60: '60より小さい値を入力してください。',
        number: '数字のみ入力してください。',
        lengPhone: '11桁の数字以内に入力してください',
        lengMoney: '10桁の数字以内に入力してください'
    },
    Common: {
        start: '開始',
        end: '終了',
        from: 'から',
        to: 'まで',
        ceil: '切り上げ',
        floor: '切り捨て',
        minute: '分',
        monday: '月',
        tuesday: '火',
        wednesday: '水',
        thursday: '木',
        friday: '金',
        saturday: '土',
        sunday: '日',
        time: '時間',
        hour: '時'
    },
    Input: {
        hourType: '勤務時間表記の方法',
        month: "月",
        username: 'ユーザーID',
        name: '従業員名',
        userCode: '社員コード',
        manage: '認証者',
        constructionCode: '現場コード',
        constructionName: '現場名',
        account: 'ユーザーID',
        filter: '絞り込み',
        phonenumber: '電話番号',
        group: 'グループ',
        area: {
            code: 'エリアコード',
            name: 'エリア区分'
        },
        password: 'パスワード',
        rePassword: 'パスワードをもう一度入力してください。',
        amount: '金額',
        date: '日時',
        code: '社員コード',
        groupCode: 'エリアコード',
        groupName: 'エリアの名称',
        title: '件名',
        calendarUser: '勤怠カレンダー:',
        content: '内容',
        construction_unit: '施行班',
        problem_report: '連絡事項',
        classify: '区分',
        user: {
            username: 'ユーザーID',
            code: '社員コード',
            name: '従業員名',
            phone: '電話番号',
            position: '役職',
            group: 'グループ',
            area: 'エリア',
            joining_date: '入社日',
            password: 'パスワード',
            rePassword: 'パスワードをもう一度入力してください。',
            role: '役割',
            remainLastYear: '前々年',
            remainThisYear: '前年',
            remainTotal: '合計',
            dayOff: '有給繰越日数'
        },
        role: {
            name: '役割',
            permission: 'アクセス許可'
        },
        position: {
            code: '役職コード',
            name: '役職',
            remuneration: '労務費'
        },
        construction: {
            formatContent: 'Format báo cáo', //
            info: '工事情報',
            date: '日時',
            code: '工事コード',
            name: '工事名',
            address: '住所',
            amount: '請負金額',
            cost: '工事予算',
            profit: '利益率',
            contractors: '元請',
            content: '工事内容',
            manage: '工事管理',
            titleContent: '作業報告フォーマット',
            formatContent: '内容',
            time: '時間',
            slideTime: 'スライド勤務',
            typeRequests: '申請種別',
            workNight: '勤務時間変更（夜勤）'
        },
        request: {
            type: '申請種別',
            type_1: '早朝残業',
            typeEarlyLate: '早上がり',
            typeOT: '残業申請',
            typeSalary: '有給休暇',
            typeWorkOnDayOff: "Xin đi làm vào ngày nghỉ",
            typeCompensated: '代休',
            typeReplace: '振替休日出勤',
            typeHoliday: '休暇申請',
            type_2: '早退',
            workingHoliday: '休日出勤',
            dayOffSalary: '有給休暇',
            holidaysInstead: '代休',
            hourLeft: "時",
            dayLeft: "日"
        },
        roundStart: '開始',
        roundEnd: '終了',
        roundType: '丸め',
        selectWorkingDayInWeek: '労働日',
        holidayInProvision: '法定内休日',
        holidayOutProvision: '法定外休日',
        holidayName: '祝日',
        holidayType: '休日の種類',
        notProfit: '利益率を閲覧する権限がありません。',
        errorCheckOut: '退勤時間は出勤時間以降にしなければなりません。',
        dateStart: '工期始まり',
        dateEnd: '工期終わり',
        pickMonth: '月を選択',
        createFormatContent: '工事内容',
        listUser: '作業員リスト',
        subject: '件名',
        cost: '工事予算',
        costAmount: '利益率',
        warning: '緊急',
        manage1: '認証者 1',
        manage2: '認証者 2',
        address: '住所',
        contractor: '施工班',
        report: '工事内容',
        wokingDayOff: '振替出勤日',
        dateDayOff: '振替休日',
        dateRequest: '申請日',
        dateReplace: '振替休日',
        typeRequest: '申請種別',
        checkbox: '振替休日',
        chooseDate: '就職予定が同じな期間を選択します。',
        changePassword: {
            title: 'パスワード変更'
        },
        latLong: '座標',
        hours: '時',
        minutes: '分',
        Filter: '絞り込み',
        hourCheckIn: '出勤時間',
        totalTime: '労働時間の合計',
        hourCheckOut: '退勤時間',
        _date: '振替の出勤日',
        replaceDate: '振替の休日'
    },
    Label: {
        hourSetting: "勤務時間表記",
        settingWorkingTime: '勤務時間設定',
        workingTime: '勤務時間',
        overTimeBefore: '早朝残業時間',
        overTime: '残業時間',
        overTimeNight: '深夜残業時間',
        settingRound: '丸め設定',
        settingHoliday: '祝日設定',
        updateHoliday: '休日編集',
        settingWeekHoliday: '毎週の休日設定',
        settingWorkDay: '営業日設定',
        calendar: '予定カレンダー',
        settingEmployeesForConstruction: '現場人員配置',
        settingEmployees: '作業員選択',
        Chat: 'やり取り',
        chatHolder: " メッセージを入力する",
        failLine: 'LINEアカウントとリンクできませんでした！',
        successLine: 'LINEアカウントとリンクできました！',
        noonBreak: '休憩時間'
    },
    Button: {
        refreshExcel: "リフレッシュ",
        create: '追加',
        edit: '編集',
        delete: '削除',
        back: '戻る',
        formatContent: 'Format Nội dung', // 
        listContent: 'Tạo format', //
        createUser: '従業員作成',
        createGroup: '班作成',
        createArea: 'エリア作成',
        ok: 'OK',
        cancel: 'キャンセル',
        report: '報告',
        search: '検索',
        logout: 'ログアウト',
        chose: '選択',
        createInput: '追加',
        createContainer: '工事内容入力',
        importFile: 'Excelからインポート',
        approved: '承認',
        unApproved: '非承認',
        view: '既読',
        unview: '未読',
        request: '申請',
        unRequest: '再申請',
        detail: '詳細',
        submit: '確定',
        addDayOff: '休日追加',
        confirmAllow: 'この申請を承認しますが、よろしいでしょうか？',
        confirmSkip: 'この申請の非承認しますが、よろしいでしょうか？',
        changeConfirmAllow: '承認状態を変更しますが、よろしいでしょうか？',
        allow: '承認',
        allow_one: '認証者',
        allow_two: '認証者',
        skip: '非承認',
        skip_one: '非承認者',
        skip_two: '非承認者',
        line_account: 'LINEアカウント',
        changePassword: 'パスワード変更',
        listContent: 'フォーマット追加',
        round: '丸め有り',
        unRound: '丸め無し'
    },
    Sidebar: {
        user: 'ユーザー',
        group: '施工班',
        role: '役割',
        position: '役職',
        area: 'エリア',
        dayoff: '特別休暇',
        report: '作業報告',
        construction: '工事現場管理',
        labor: '労務管理',
        history: '出勤履歴',
        worker: '出勤・退勤',
        request: '申請認証',  // 申請申請
        settingTime: '基本設定',
        hour: '勤怠管理',
        calendar: '勤怠カレンダー',
        hourDetail: '勤怠確認',
        timekeeping: '個人別勤怠日計表',
        distance_fuel: '個人別勤怠日計表'
    },
    Breadcrumb: {
        userIndex: 'ユーザーリスト',
        userCreate: 'ユーザー作成',
        userEdit: 'ユーザー情報編集',
        groupCreate: '班作成',
        roleIndex: '役割',
        roleCreate: '役割作成',
        roleEdit: '役割編集',
        positionIndex: '役職',
        positionCreate: '役職作成',
        positionEdit: '役職編集',
        areaIndex: 'エリア',
        areaCreate: 'エリア作成',
        areaEdit: 'エリア編集',
        settingTime: '基本設定',
        dayoffIndex: '特別休暇管理',
        dayoffCreate: '追加',
        dayoffEdit: '編集',
        reportIndex: '報告一覧',
        reportCreate: '報告作成',
        reportEdit: '報告編集',
        constructionIndex: '工事現場一覧',
        constructionCreate: '新規登録',
        constructionEdit: '工事現場編集',
        laborIndex: '労務管理一覧',
        laborDetail: '労務管理詳細',
        historyIndex: '出勤履歴一覧',
        historyEdit: '出勤履歴編集',
        historyDetail: '出勤履歴詳細',
        worker: '出勤・退勤',
        hourIndex: '勤怠管理',
        requestIndex: '申請認証',
        requestCreate: '申請作成',
        requestEdit: '申請編集',
        calendarIndex: '個人カレンダー',
        reportDetail: '報告の詳細',
        hourDetail: '勤怠状況',
        requestDetail: '申請詳細',
        timekeepingIndex: '個人別勤怠日計表',
        distance_fuel: '個人別勤怠日計表',
        contentsIndex: '作業報告フォーマットリスト',
        contentsCreate: 'フォーマット作成',
        contentsEdit: 'フォーマット編集',
        notFound: "見つかりません"
    },
    Table: {
        column: {
            chooser: " 表示項目を選択する", //,
            noColumn: "あなたは表示する項目を選択していません"
        },
        header: {
            row : "Hàng",
            sorting: "並べ替え",
            code: 'コード',
            name: '名前',
            username: 'ユーザーID',
            status: '状況',
            createdAt: '登録日',
            action: '操作',
            content: '内容',
            date: '日時',
            user: {
                username: 'ユーザーID',
                code: '社員コード',
                name: '従業員名',
                phone: '電話番号',
                positionCode: '役職コード',
                positionName: '役職',
                areaName: 'エリア',
                countUsed: '有給休暇実施日数',
                remain: '有給休暇残日数',
                remainByWorkingOnDayOff: '代休可能日数',
                dayOffInFuture: '特別休暇実施予定日',
                index: 'No.'
            },
            role: {
                code: '役割コード',
                name: '役割',
                permission: 'アクセス許可',
                userCount: 'ユーザー人数'
            },
            position: {
                code: '役職コード',
                name: '役職',
                remuneration: '労務費',
                number: 'ユーザー人数'
            },
            area: {
                code: 'エリアコード',
                name: 'エリア'
            },
            construction: {
                code: '工事コード',
                name: '工事名',
                userName: '従業員名',
                date: '日時',
                address: '住所',
                workTime: '労務時間',
                workTimeIn: '出勤時間',
                workTimeOut: '退勤時間',
                workingTimeIn: '就労開始時刻',
                _workingTimeInOut: '丸めた時刻',
                workingTimeOut: '就労終了時刻',
                _timeConstruction:'現場労務時間',

                total: '合計',
                cost: '請負金額',
                amount: '工事予算',
                notCheckOut: '未退勤',
                startTime: '開始時刻',
                endTime: '終了時刻',
                dateStart: '工期始まり',
                dateEnd: '工期終わり',
                _startTime: '就労開始時刻',
                _endTime: '就労終了時刻',
                workingTime: '就労時刻',
                workingTimeInOut: '実際の就労時刻',
                manage: '認証者',
                timeConstruction: '現場労務時間',
                totalPeople: '合計人数',
                totalDate: '合計日数',
                totalProfit: '合計労務費'
            },
            report: {
                title: '件名',
                type: '申請種別'
            },
            labor: {
                profit: "現場労務費",
                workTime: '現場労務時間',
                laborTotal: '合計',
                totalWorkers: '合計人数',
                totalSalary: '合計労働費',
                detail: '詳細'
            },
            hour: {
                totalDays: '出勤日数',
                standardHour: '基準内労働時間',
                morningOT: '早朝残業時間',
                nomalOT: '残業時間',
                nightOT: '深夜残業時間',
                statutoryDays_standardHour: '法廷内休日労働時間',
                statutoryDays_morningOT: '法廷内休日早朝時間',
                statutoryDays_nomalOT: '法廷内休日残業時間',
                statutoryDays_nightOT: '法廷内休日深夜残業時間',
                nonStatutoryDays_standardHour: '法廷外休日労働時間',
                nonStatutoryDays_morningOT: '法廷外休日早朝時間',
                nonStatutoryDays_nomalOT: '法廷外休日残業時間',
                nonStatutoryDays_nightOT: '法廷外休日深夜残業時間',
                lateWork: '遅早',
                totalTime: '合計就労時間',
                paidWorkInHoliday: '代休実施日数',
                rosteredDayOff: '代休実施日数'
            },
            dateRequest: '申請日',
            allow: '状態',
            request: {
                dateDayOff: '振替休日',
                dateRequest: '振替出勤日',
                typeRequest: '申請種別 ',
                manage: '認証者'
            },
            timekeeping: {
                work_distance: '業務走行距離',
                personal_distance: '私用走行距離',
                fuel: '給油量'
            },
            index: 'No.'
        }
    },
    Message: {
        SomethingWrong: "エラーが発生しました。再度お試しください。",
        createDataSuccess: 'データが作成されました。',
        editDataSuccess: 'データが編集されました。',
        deleteDataSuccess: 'データが削除されました。',
        deleteDialogTitle: '選択したデータを削除しますか?',
        deleteDateDialogTitle: '選択した日を削除しますが、よろしいでしょうか？',
        deleteDialogContent: 'データが削除されると復旧できませんので、ご注意ください。',
        createGroupSuccess: '班が作成されました。',
        passwordNotMatch: 'パスワードが間違っています。再び入力してください。',
        crearteDataConstruction: 'データを追加しました。',
        failHour: '入力した時間は正しくないです。再度ご確認をお願いいたします。',
        userName: 'ユーザーIDは6桁から15桁まで入力しないといけないです。',
        failedRequest: 'インターネットと接続できませんでした。',
        deleteGroupDataSuccess: 'データが削除されました。',
        erroeName: '役割の名称が存在しました。',
        importExcel: '新規追加された工事現場の数量：${arguments[0]} \n情報が更新された工事現場の数量：　${arguments[1]}',
        excelError: 'Excelファイルをインポートする時、エラーが発生しました。エラーについて以下の表を参照してください。'
    },
    User: {
        username: 'ユーザーID',
        password: 'パスワード',
        remember: 'ユーザー保存',
        signin: 'ログイン'
    },
    DayOff: {
        addDayOff: '休日追加',
        chooseDayOff: '休日選択',
        chooseHourOff: 'Chọn giờ nghỉ', //
        remain: "可能日数",
        day: "日",
        hour: '時', //
        type: {
            label: '休日種別選択',
            hasSalary: '有給休暇',
            compensatoryLeave: '代休',
            unpaidLeave: '休暇'
        }
    },
    Calendar: {
        notCheckOut: '就労終了時刻はまだ登録されていません。',
        request: '申請',
        report: '報告',
        detailConstruction: '工事詳細',
        createRequest: '申請作成',
        checkIn: '出勤',
        checkOut: '退勤',
        calendar: '出勤予定カレンダー',
        note: '備考',
        requestAllows: '承認申請',
        requestSkip: '非承認申請',
        dayOff: '休日',
        checkInOut: '出勤・退勤',
        construction: '工事現場',
        unRequest: '再申請',
        titleRequest: '作成',
        manageName1: '認証者 1',
        manageName2: '認証者 2',
        listConstruction: '工事現場リスト',
        localizer: "ja",
        today: "今月",
        back: "前へ",
        next: "次へ"
    },
    Construction: {
        choose: '人員配置',
        info: '工事現場情報',
        code: '工事コード',
        name: '工事名',
        address: '住所',
        manage: '現場監督',
        content: '工事内容',
        employees: '作業員',
        warning: '作業員や現場監督を選択してください。',
        amount: '請負金額',
        cost: '工事予算',
        profit: '利 益 率(%)',
        contructionProfit: '利 益 率(%)'
    },
    History: {
        detailHistory: '履歴詳細',
        editHistory: '履歴編集',
        coordinates: '座標',
        hour: "時",
        minute: "分"
    },
    Report: {},
    Worker: {
        request: '申請',
        detailConstruction: '工事詳細'
    },
    Forbidden: {
        title: 'このページにアクセス権限がありません。'
    },
    Request: {
        signConstruction: '削除',
        pushConstruction: '追加'
    },
    Exception: {
        excelTypeError: "インポートファイルはExcelファイルの形ではありません。",
        typeSettingTime: 'Kiểu cài đặt thời gian', //
        all: 'すべて',
        deletedByAdmin: 'あなたの休暇が削除されました。',
        notCheckIn: 'データがありません',
        notCheckOut: 'データがありません',
        typeDayoff: "休暇の種類",
        listRequest: '申請一覧',
        setCalendar: '振替休暇申請が認証されました。作業員に出勤スケージュールを配置してください',
        endDate: "終了日は開始日の前の日付にしないでください。",
        timeSevenDate: "１週間以内だけの平日と休日を入れ替えることができます。",
        locationAlert: "ウェブサイトにあなたの位置情報の使用を許可してください。",
        title: '件名',
        notificationInOut: '退勤時間を入力してください。',
        errHour: '入力した時間の合計は労働時間を超えました。',
        errMinute: '入力した時間の合計は労働時間を超えました。',
        history: '出勤履歴',
        errTimeInOut: '労働時間より小さい時間を入力しました。',
        errCheckInOut: '退勤時間は出勤時間の以降にしなければなりません。',
        inputOkCancel: '本日にこの申請種別を申請しましたが、操作を続けますか？',
        noData: 'データがありません'
    },
    ComfirmDialog: {
        cancel: 'キャンセル',
    },
    PagingPanel: {
        rowPerPage: "表示",
        of: "件",
        format: "/"
    },

    Backend: {
        DbObject: {
            Id_Required: "Id of Object is required",
            No_Object: "Object not found or Id is incorrect"
        },
        User: {
            User_Code_Exist: "ユーザー名または社員コードが存在しました。\n他のユーザー名または社員コードを入力してください。",
            User_Permission: "ユーザー管理の権限がありません！",
            Del_User_Warn: "出勤履歴があった社員を削除できません。"

        },
        Area: {
            Area_Code_Exist: "エリア名称またはエリアコードが存在しました。",
            Area_Update_Warning: "このエリアを編集できません。",
            Area_Del_Warning: "このエリアを削除できません。",
        },
        Role: {
            Role_Name_Exist: "役割の名称が存在しました。他の名称を入力してください。",
            Permission_Not_Exist: "No permission existed",
            Role_Has_User: "割り当てられているユーザーがある役割を削除できません。"

        },
        Request: {
            New_Req_Warn: " 過去の日に申請することができません。",
            Invalid_Req_Type: "申請種別が不正です。再度確認してください。",
            Req_DayOff_Warn: "休日に休暇申請ができません。他の日を選択してください。",
            Req_Holiday_Warn: "この日は既にある休日なので、他の日を選択してください。",
            Choose_ReDate_Warn: "１週間以内だけの平日と休日を入れ替えることができます。",
            User_Req_Check: "User_Req_Check",
            Input_Time_Warn: "遅刻・早退時間は０分より大きい値入力してください。",
            Input_OT_Warn: "終了時間は開始時間以降にしなければなりません。",
            User_Level_Warn: " 認証者を再度選択してください。"
        },
        Position: {
            Position_Code_Exist: "役職コードが存在しました。他の役職コードを入力してください。",
            Position_Has_User: "割り当てられているユーザーがある役職を削除できません。"

        },
        Worker: {
            Check_In_Once: "1日中に出勤が1回のみ行えます。",
            Not_Check_In: "出勤がまだ行われていないです。",
            Expired_Update_Warning: "現在、この項目は編集不能になりました。編集したい場合、管理者に連絡してください。",
            User_Not_Exist: "このユーザーが存在していません。再度確認してください。",
            No_Position: "現在、ユーザーは役職がありません。",
            No_ConstructionId: "工事現場はシステムで不在なので、再度確認してください。",
            Update_Check_Out_Warning: "入力する時間は実際の労働時間を超えることができません。"
        },
        DayOff: {
            No_Add_Permission: "休暇を追加する権限を持っていません。",
            DayOff_Exist: "この日は既にある休日なので、他の日を選択してください。",
            Out_Of_DayOff: "有給休暇残日数が切りました。有給休暇を選択できません。",
            Out_Of_DayOff_By_Working_On_DayOff: "Số giờ nghỉ bù còn lại ít hơn số giờ nhập vào. Vui lòng chọn lại",
            DayOff_Warning: "この日は既にある休日なので、他の日を選択してください。",
            Holiday_Warning: "この日は既にある休日なので、他の日を選択してください。",
            Type_Not_Exist: "Loại ngày nghỉ không tồn tại. Vui lòng kiểm tra lại",

            No_Del_Permission: "休暇を削除する権限を持っていません。"
        },
        Construction: {
            No_Add_Permission: "工事現場を追加する権限を持っていません。",
            Construction_Code_Exist: "工事現場コードは存在しました。他の現場コードを入力してください。",
            No_Del_Permission: "工事現場を削除する権限を持っていません。",
            Del_Construction_Warn: "出勤・退勤のデータがあったり、出勤予定があったりする工事現場を削除できません。",
        },
        History: {
            Expired_Update_Warn: "出勤履歴の編集可能時間が切れました。編集したい場合、管理者に連絡してください。",
            Input_Construct_Warn: "Input_Construct_Warn",
            Input_WorkTime_Warn: "入力した時間は実際の労働時間を超えました。"
        },
        Content: {
            Title_Exist: "フォーマットの名称が存在しました。他の名称を入力してください。"
        }
    }

}