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
    AppBar, 
    Toolbar
} from '@material-ui/core'


const styles = theme => ({
    button: {
        marginRight: '5px'
    }
})

class Foggy extends BaseView {
    constructor(props) {
        super(props)
    }

    render() {
        const { classes } = this.props
        return (
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div
                        className="card card-image mb-3"
                        style={{ 
                            backgroundImage: "url('https://mettisglobal.news/wp-content/uploads/2018/04/IMG642JSCL-696x438.png')",
                            height: '400px',
                            width: '100%',
                            // filter: 'blur(5px)',
                            backgroundAttachment: 'scroll',
                        }}
                    >
                        <CardContent>
                            <AppBar position="static">
                                <Toolbar variant="dense">
                                    <Typography variant="h5" color='inherit' component='h5'>
                                       Công ty cổ phần JG Global Việt Nam (JS Global VN joint stock company)
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <Typography variant='h5' component='h5'>
                                <ul>
                                    <li>Thành lập 2019 với đại diện luật pháp kinh doanh Nguyễn Thị Hải Anh( Giám đốc )</li>
                                    <li>Lĩnh vực kinh doanh, tư vấn xuất khẩu lao động xuất ngoại Nhật Bản, Hàn Quốc, Đài Loan ...</li>
                                    <li>Với sự nhiệt huyết và sự tận tâm chúng tôi luôn mong muốn giúp các bạn chắp cánh ước mơ bay xa hơn trở
                                        thành lao động xuất ngoại chuyên nghiệp.
                                    </li>
                                    <li>Phương châm làm việc phục vụ khách hàng chúng tôi tự tin sẽ mang tới cơ hội tốt nhất cho bạn và đồng
                                        hành cùng bạn.
                                    </li>
                                    <li>JS Global Phục vụ và luôn đem tới cơ hội cho bạn phát triển</li>
                                </ul>
                            </Typography>
                        </CardContent>
                    </div>
                </div>
            </div>
        )
    }
}

Foggy.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Foggy))