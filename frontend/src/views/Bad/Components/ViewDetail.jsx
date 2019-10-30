import React, { Component } from "react"
import ReactDOM from "react-dom"
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import BaseView from 'views/BaseView'
import PaperFade from 'components/Main/PaperFade'
import { I18n } from 'react-redux-i18n'
import ConfirmDialog from 'components/Dialogs/ConfirmDialog'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Form, TextField, DateTimeField, Validation } from 'components/Forms'
import FacebookIcon from '@material-ui/icons/Facebook'
import {
    IconButton,
    Icon,
    Tooltip,
    Button,
    Card,
    Grid,
    CardContent,
    CardActions,
    Typography,
    AppBar,
    DialogTitle,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Toolbar,
} from '@material-ui/core'
import moment from 'moment'
import _ from 'lodash'

const styles = theme => ({
    
})

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    onCancel(){
        this.props.onCancel()
    }

    renderDialog(classes){
        let img = [
            {
                img: 'http://vilahome.com.vn/wp-content/uploads/2018/05/Mau-giuong-da-nang-thong-minh-hien-dai-1.jpg'
            },
            {
                img: 'http://sofabella.vn/wp-content/uploads/2015/03/GIUONG-NGu-B1240.jpg'
            },
            {
                img: 'https://noithatthanglong.com/wp-content/uploads/2018/08/giuong-ngu-tlg001-1.jpg'
            }
        ]
        return (
           <Card>
               <Dialog
                    fullWidth={true}
                    // onClose={this.onCancel}
                    open={true}
                    maxWidth='md'
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogContent>
                        <Typography variant="h6"> 
                            Giường gỗ GG22 - 2.000.000đ
                        </Typography>
                        <Grid container spacing={8}>
                            <Grid item xs={5}>
                                <img src={img[0].img} height='250' width='350'/>
                                {
                                    img.map((item, index) => {
                                        return (
                                            <img 
                                                key={index} 
                                                src={item.img} 
                                                height='35' 
                                                width='50'
                                            />
                                        )
                                    })
                                }
                            </Grid>
                            <Grid item xs={7}>
                            </Grid>
                        </Grid>
                        <Grid container spacing={32}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label={I18n.t("Input.bad.Tên người mua")}
                                    onChange={(value) => this.onHandleChange(value, 'code')}
                                    name="code"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label={I18n.t("Input.bad.Số lượng")}
                                    onChange={(value) => this.onHandleChange(value, 'code')}
                                    name="code"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label={I18n.t("Input.bad.SDT")}
                                    onChange={(value) => this.onHandleChange(value, 'name')}
                                    name="phone"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label={I18n.t("Input.bad.Dia chi giao hang")}
                                    onChange={(value) => this.onHandleChange(value, 'name')}
                                    name="name"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label={I18n.t("Input.bad.Số tiền hàng")}
                                    onChange={(value) => this.onHandleChange(value, 'name')}
                                    name="name"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label={I18n.t("Input.bad.Phí vận chuyển")}
                                    onChange={(value) => this.onHandleChange(value, 'name')}
                                    name="name"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label={I18n.t("Input.bad.hinh thuc thanh toan")}
                                    onChange={(value) => this.onHandleChange(value, 'name')}
                                    name="name"
                                />
                            </Grid>
                            <CardActions>
                                <Button type="submit" variant="contained" color="primary">{I18n.t("Button.submit")}</Button>
                            </CardActions>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button color='primary' onClick={() => this.onCancel()}>
                            Thoát
                        </Button>
                        <Button color='primary' onClick={() => this.onCancel()}>
                            Mua Hang
                        </Button>
                    </DialogActions>
                  </Dialog>
           </Card>
        )
    }

    render() {
        let { classes } = this.props
        return (
            <div>
                {this.renderDialog(classes)}
            </div>
        );
    }
}


App.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(App))
// ReactDOM.render(<App />, document.getElementById("root"));