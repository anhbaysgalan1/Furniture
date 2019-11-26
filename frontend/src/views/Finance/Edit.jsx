import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Form, TextField, Validation, MoneyField, DateTimeField } from 'components/Forms'
import { BaseView } from 'views/BaseView'
import { I18n } from 'react-redux-i18n'
import {
   Grid,
   Typography,
   IconButton,
   Icon,
   Tooltip,
   Card,
   Button,
   CardActionArea,
   CardMedia,
   CardContent,
   CardActions,
   CardHeader,
} from '@material-ui/core'
import PaperFade from "components/Main/PaperFade"
import { withRouter } from 'react-router-dom'
import AutoCompleteField, { Option as OptionAuto } from 'components/Forms/AutoCompleteField'
import _ from 'lodash'

const styles = theme => ({
   paper: {
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
   },
   card: {
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
   },

})

class Create extends BaseView {
   constructor(props) {
      super(props)
      this.state = {
         reload: false,
         moneyOut: [],
         moneyIn: []
      }
      this.onHandleChange = this.onHandleChange.bind(this)
      this.addMoneyOut = this.addMoneyOut.bind(this)
      this.signMoneyOut = this.signMoneyOut.bind(this)
      this.addMoneyIn = this.addMoneyIn.bind(this)
      this.signMoneyIn = this.signMoneyIn.bind(this)
   }

   addMoneyOut() {
      let { moneyOut } = this.state || []
      let element = {
         item: '1'
      }
      moneyOut.push(element)
      this.setState({ moneyOut: moneyOut })
      this.setState({ reload: !this.state.reload })
   }
   addMoneyIn() {
      let { moneyIn } = this.state || []
      let element = {
         item: '0'
      }
      moneyIn.push(element)
      this.setState({ moneyIn: moneyIn })
      this.setState({ reload: !this.state.reload })
   }
   signMoneyOut(index) {
      let { moneyOut } = this.state || []
      moneyOut.splice(index, 1)
      this.setState({ moneyOut: moneyOut })
      this.setState({ reload: !this.state.reload })
   }
   signMoneyIn(index) {
      let { moneyIn } = this.state || []
      moneyIn.splice(index, 1)
      this.setState({ moneyIn: moneyIn })
      this.setState({ reload: !this.state.reload })
   }
   onHandleChange(value, name) {
      this.setState({ dataInput: { ...this.state.dataInput, [name]: value } })
      this.setState({ reload: !this.state.reload })
   }

   componentWillReceiveProps(nextProps){
      let moneyIn = _.get(nextProps, 'data.moneyIn', {})
      let moneyOut = _.get(nextProps, 'data.moneyOut', {})
      this.setState({ moneyIn: moneyIn, moneyOut: moneyOut })
      this.setState({ reload: !this.state.reload })
   }

   moneyInOut() {
      const { classes, onSubmit, data } = this.props
      let { moneyOut = [], moneyIn = [] } = this.state
      let date = _.get(data, 'date', '')
      return (
         <Form className={classes.card} onSubmit={onSubmit}>
            <Card>
               <CardContent>
                  <Grid container spacing={32}>
                     <Grid item xs={4}>
                        <Typography color='primary' variant='h6'> Nội dung chi tiêu </Typography>
                     </Grid>
                     <Grid item xs={4}>
                        <DateTimeField
                           style={{ marginTop: '-10px' }}
                           label=''
                           name="date"
                           ampm="false"
                           value={date}
                           clearable={false}
                           showTime={false}
                           showDate={true}
                        />
                     </Grid>
                  </Grid>
                  {
                     moneyOut.map((item, index) => {
                        let user = _.get(item, 'user', '')
                        let content = _.get(item, 'content', '')
                        let money = _.get(item, 'money', '')
                        return (
                           <Grid key={index} container direction="row" alignItems="center" spacing={8}>
                              <Grid item xs={3}>
                                 <TextField
                                    fullWidth
                                    label={I18n.t("Input.finance.date.Người thanh toán tiền")}
                                    onChange={(value) => this.onHandleChange(value, 'user', index)}
                                    defaultValue={user}
                                    name={`moneyOut[${index}][user]`}
                                 />
                              </Grid>
                              <Grid item xs={6}>
                                 <TextField
                                    fullWidth
                                    multiline={true}
                                    defaultValue={content}
                                    label={I18n.t("Input.finance.date.Nội dung thanh toán")}
                                    onChange={(value) => this.onHandleChange(value, 'content', index)}
                                    name={`moneyOut[${index}][content]`}
                                 />
                              </Grid>
                              <Grid item xs={2}>
                                 <MoneyField
                                    fullWidth
                                    label={I18n.t("Input.finance.money.Số tiền")}
                                    defaultValue={money}
                                    onChange={(value) => this.onHandleChange(value, 'money', index)}
                                    name={`moneyOut[${index}][money]`}
                                 />
                              </Grid>
                              <Grid item xs={1}>
                                 <IconButton onClick={() => this.signMoneyOut(index)} style={{ marginTop: '30px' }}>
                                    <Icon style={{ color: 'red' }} >delete</Icon>
                                 </IconButton>
                              </Grid>
                           </Grid>
                        )
                     })
                  }
                  <IconButton color='primary' onClick={() => this.addMoneyOut()}>
                     <Icon>add_circle_outline</Icon>
                  </IconButton>
                  <hr></hr>
                  <Typography color='primary' variant='h6'> Nội dung thu tiền </Typography>
                  {
                     moneyIn.map((item, index) => {
                        return (
                           <Grid key={index} container direction="row" alignItems="center" spacing={8}>
                              <Grid item xs={3}>
                                 <TextField
                                    fullWidth
                                    label={I18n.t("Input.finance.date.Người thanh toán tiền")}
                                    onChange={(value) => this.onHandleChange(value, 'user', index)}
                                    name={`moneyIn[${index}][user]`}
                                 />
                              </Grid>
                              <Grid item xs={6}>
                                 <TextField
                                    fullWidth
                                    multiline={true}
                                    label={I18n.t("Input.finance.date.Nội dung thanh toán")}
                                    onChange={(value) => this.onHandleChange(value, 'content', index)}
                                    name={`moneyIn[${index}][content]`}
                                 />
                              </Grid>
                              <Grid item xs={2}>
                                 <MoneyField
                                    fullWidth
                                    label={I18n.t("Input.finance.money.Số tiền")}
                                    onChange={(value) => this.onHandleChange(value, 'money', index)}
                                    name={`moneyIn[${index}][money]`}
                                 />
                              </Grid>
                              <Grid item xs={1}>
                                 <IconButton onClick={() => this.signMoneyIn(index)} style={{ marginTop: '30px' }}>
                                    <Icon style={{ color: 'red' }} >delete</Icon>
                                 </IconButton>
                              </Grid>
                           </Grid>
                        )
                     })
                  }
                  <IconButton color='primary' onClick={() => this.addMoneyIn()}>
                     <Icon>add_circle_outline</Icon>
                  </IconButton>
                  <CardActions>
                     <Button variant="contained" color="primary" onClick={() => this.goto("/finance")}>
                        <Icon>keyboard_arrow_left</Icon>{I18n.t("Button.back")}
                     </Button>
                     <Button type="submit" variant="contained" color="primary">{I18n.t("Button.submit")}</Button>
                  </CardActions>
               </CardContent>
            </Card>
         </Form>
      )
   }

   render() {
      const { classes } = this.props
      return (
         <div className={classes.paper}>
            <Grid container spacing={32}>
               <Grid item xs={1}></Grid>
               <Grid item xs={10}>
                  {
                     this.moneyInOut()
                  }
               </Grid>
               <Grid item xs={1}></Grid>
            </Grid>
         </div>
      )
   }
}

Create.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Create))