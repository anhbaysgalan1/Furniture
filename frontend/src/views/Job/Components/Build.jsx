import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import BaseView from '../../../views/BaseView'
import PaperFade from 'components/Main/PaperFade'
import { I18n } from 'react-redux-i18n'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import _ from 'lodash'
import ExportExcel from 'components/ExportExcel/ExportExcel'
import { Link } from 'react-router-dom'
import MailIcon from '@material-ui/icons/MailOutline'
import { Form, TextField, DateTimeField, Validation } from 'components/Forms'
import HomeIcon from '@material-ui/icons/Home'
import PhoneIcon from '@material-ui/icons/LocalPhone'
import CardMediaImg from './CardMediaImg'
import {
    IconButton,
    Icon,
    Grid,
    Tooltip,
    Button,
    Card,
    Typography,
    CardActions,
    CardContent,
} from '@material-ui/core'


const styles = theme => ({
    button: {
        marginRight: '5px'
    }
})

class Build extends BaseView {
    constructor(props) {
        super(props)
    }

    renderBuild(){
        return (
            <span>
                <Typography variant='h5'>
                    Kỹ sư xây dựng tại nhật bản
                </Typography>
                <Typography>
                    LỢI ÍCH KHI THAM GIA CÁC ĐƠN HÀNG KỸ SƯ XÂY DỰNG <br></br>
            
                    1. Ứng viên sẽ được ứng tuyển và phỏng vấn trực tiếp với công ty tuyển dụng bên phía Nhật Bản <br></br>
                    2. Làm việc tại Nhật đúng chuyên ngành mà bạn đã được đào tạo. Nhờ đó bạn có thể học hỏi kiến thức, nâng cao tay nghề phát triển sự nghiệp sau này. <br></br>
                    3. Được tuyển dụng trực tiếp từ công ty ở Nhật, và hưởng mức lương cũng như các chế độ làm việc như người bản xứ, có thể lên đến 2 triệu/ngày.<br></br>
                    4. Được tư vấn và hướng dẫn hoàn thành các thủ tục Visa, xuất nhập cảnh trong thời gian sớm nhất, chỉ sau 2 tháng. <br></br>
                    5. Được xuất cảnh ngay khi đậu phỏng vấn với công ty bên Nhật (tối đa 3 tháng) <br></br>
                    6. Hỗ trợ học tiếng Nhật cấp tốc với những ứng viên chưa có năng lực tiếng Nhật để đáp ứng được yêu cầu về ngoại ngữ khi sang Nhật làm việc <br></br>
                </Typography>
            </span>
        )
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                {
                    this.renderBuild()
                }
                <CardMediaImg />
            </div>
        )
    }
}

Build.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Build))