import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/lab/Skeleton';
import withStyles from '@material-ui/core/styles/withStyles'
import BaseView from 'views/BaseView'
import { withRouter } from 'react-router-dom'

const styles = theme => ({
    button: {
        marginRight: '5px'
    },
    width300: {
        maxWidth: 300,
    },
    media: {
        height: 190,
    },
})

class Media extends BaseView {
    constructor(props) {
        super(props)
    }

    render() {
        const { classes } = this.props
        let arrData = [
            {
                _id: '0',
                img: 'https://dongphucsaoviet.vn/hoanghung/0/images/ext(1).jpg',
                title: 'Tuyển dụng 40 kĩ sư IT cho thị trường nhật bản ',
                content: 'Được thành lập vào tháng 6/2013 với hơn 10 thành viên, MQ ICT SOLUTIONS với 85 nhân sự,',
                describe: 'Công Ty MQ ICT SOLUTIONS, làm trong lĩnh vực phát triển web, game, iOS, Android, Java, Trí Tuệ'
            },
            {
                _id: '1',
                img: 'https://dongphucsaoviet.vn/hoanghung/0/images/ext(1).jpg',
                title: 'Chuyên gia nhật bản',
                content: '株式会社パイプドビッツ　美歴カンパニープレジデント　鈴木一輝　様 ',
                describe: 'Công Ty MQ ICT SOLUTIONS (http://mqsolutions.vn) tuyển dụng kỹ sư biết tiếng Nhật, làm trong lĩnh vực phát triển web, game, iOS, Android, Java, Trí Tuệ'
            },
            {
                _id: '3',
                img: 'https://dongphucsaoviet.vn/hoanghung/0/images/ext(1).jpg',
                title: 'Chuyên Gia Tokyo ',
                content: 'Giám đôc tập đoàn tài chính tuyển dụng kỹ sư biết tiếng Nhật, làm trong lĩnh vực phát triển web, game, iOS, Android, Java, ',
                describe: 'Công Ty MQ ICT SOLUTIONS (http://mqsolutions.vn) tuyển dụng kỹ sư biết tiếng Nhật, làm trong lĩnh vực phát triển web, game, iOS, Android, Java, Trí Tuệ'
            },
            {
                _id: '4',
                img: 'https://dongphucsaoviet.vn/hoanghung/0/images/ext(1).jpg',
                title: 'Chuyên gia nhật bản',
                content: '株式会社パイプドビッツ　美歴カンパニープレジデント　鈴木一輝　様 ',
                describe: 'Công Ty MQ ICT SOLUTIONS (http://mqsolutions.vn) tuyển dụng kỹ sư biết tiếng Nhật, làm trong lĩnh vực phát triển web, game, iOS, Android, Java, Trí Tuệ'
            }
        ]
        return (
            <div>
                {
                    arrData.map((item, index) => { 
                        return (
                            <Button key={index}>
                                <span className={classes.width300}>
                                    <CardMedia className={classes.media} title="Ted talk" image={item.img}/>
                                    <CardContent>
                                        <Typography variant="h6" color="textSecondary" component="h6">
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {item.content}
                                        </Typography>
                                    </CardContent>
                                </span>
                            </Button>
                        )
                    })
                }
            </div>
        )
    }
}



Media.propTypes = {
    loading: PropTypes.bool,
}

export default withStyles(styles)(withRouter(Media))
