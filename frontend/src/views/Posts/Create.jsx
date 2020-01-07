import React from 'react'
import PropTypes, { element } from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Form, TextField, Validation } from 'components/Forms'
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
   Dialog,
   DialogActions,
   DialogContent

} from '@material-ui/core'
import PaperFade from "components/Main/PaperFade"
import Previews from './Previews'
import { withRouter } from 'react-router-dom'
import AutoCompleteField, { Option as OptionAuto } from 'components/Forms/AutoCompleteField'
import _ from 'lodash'

const styles = theme => ({
   paper: {
      // padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
   },
   card: {
      padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
   },
   form: {
      padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
      // padding: '10px 10px 10px 10px'
   },
   imgZoom: {
      transition: "transform .5s, filter 3s ease-in-out",
      filter: "grayscale(100%)",
   },
   imgZoom: {
      "&:hover": {
         filter: "grayscale(0)",
         transform: "scale(1.1)",
         transitionDuration: "1s",
         transitionTimingFunction: "linear",
      }
   },
})

class Create extends BaseView {
   constructor(props) {
      super(props)
      this.state = {
         reload: false,
         open: false,
         dataInput: {
            title: '',
            image: '',
            number: '',
            summary: '',
            contentStart: '',
            contentEnd: '',
            data: [ 
               {
                  title: '',
                  image: '',
                  content: [
                     { 
                        listConten: '' 
                     }
                  ],
               }
            ]
         },
      }
      this.onHandleChange = this.onHandleChange.bind(this)
      this.onChangeData = this.onChangeData.bind(this)
      this.onChangeContent = this.onChangeContent.bind(this)
      this.addItem = this.addItem.bind(this)
      this.signItem = this.signItem.bind(this)
      this.addContent = this.addContent.bind(this)
      this.signContent = this.signContent.bind(this)
   }

   addItem() {
      let { dataInput } = this.state
      let data = _.get(dataInput, 'data', [])
      let item = {
         title: '',
         image: '',
         content: [{ listConten: '' }],
      }
      data.push(item)
      this.setState({ dataInput: dataInput })
      this.setState({ reload: !this.state.reload })
   }
   signItem(index) {
      let { dataInput } = this.state
      let data = _.get(dataInput, 'data', [])
      data.splice(index, 1)
      this.setState({ dataInput: dataInput })
      this.setState({ reload: !this.state.reload })
   }
   addContent(index) {
      let { dataInput } = this.state
      let data = _.get(dataInput, 'data', [])
      let item = { listConten: '' }
      data[index].content.push(item)
      this.setState({ dataInput: dataInput })
      this.setState({ reload: !this.state.reload })
   }
   signContent(index, count) {
      let { dataInput } = this.state
      let data = _.get(dataInput, 'data', [])
      data[index].content.splice(count, 1)
      this.setState({ dataInput: dataInput })
      this.setState({ reload: !this.state.reload })
   }

   onHandleChange(value, name) {
      let { dataInput } = this.state
      this.setState({ dataInput: { ...dataInput, [name]: value } })
      this.setState({ reload: !this.state.reload })
   }

   onChangeData(value, name, index){
      let { dataInput } = this.state
      let data = _.get(dataInput, 'data', [])
      data[index][name] = value
      this.setState({ dataInput: dataInput })
      this.setState({ reload: !this.state.reload })
   }

   onChangeContent(value, name, index, count) {
      let { dataInput } = this.state
      let data = _.get(dataInput, 'data', [])
      data[index].content[count][name] = value
      this.setState({ dataInput: dataInput })
      this.setState({ reload: !this.state.reload })
   }

   onShow = () => {
      this.setState({open: true})
   }
   onCancel = () => {
      this.onHide()
   }

   onHide = () => {
      this.setState({open: false})
   }

   renderPreviews( dataRow ){
      let { classes } = this.props
      return (
          <Card>
              <Dialog
                  fullWidth={true}
                  data={dataRow}
                  onClose={this.onCancel}
                  open={this.state.open}
                  maxWidth='lg'
                  aria-labelledby="draggable-dialog-title"
              >
                  <DialogContent>
                      <Typography variant="h6"> 
                          Xem chi tiết đơn hàng
                      </Typography>
                      <Previews data={dataRow}/>
                  </DialogContent>
                  <DialogActions>
                     <Button className={classes.button} variant='contained' color="primary" onClick={this.onHide}>
                        {I18n.t("Button.exit")}
                     </Button>
                  </DialogActions>
              </Dialog>
          </Card>
      )
   }

   renderPosts(classes) {
      let { onSubmit } = this.props
      let { dataInput } = this.state
      let data = _.get(dataInput, 'data', []) || []
      return (
         <Form className={classes.form} onSubmit={onSubmit}>
            <Card className={classes.card}>
               <Typography variant='h5' color='primary'>
                  Thêm tin tức
               </Typography>
               <Grid container spacing={32}>
                  <Grid item xs={6}>
                     <TextField
                        fullWidth
                        label={I18n.t("Input.goods.Tiêu đề tin tức")}
                        onChange={(value) => this.onHandleChange(value, 'title')}
                        name="title"
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label={I18n.t("Input.goods.Ảnh")}
                        onChange={(value) => this.onHandleChange(value, 'image')}
                        name="image"
                     />
                  </Grid>
                  <Grid item xs={2}>
                     <TextField
                        fullWidth
                        label={I18n.t("Input.goods.Số lượt truy cập")}
                        onChange={(value) => this.onHandleChange(value, 'number')}
                        name="number"
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        multiline
                        rows={4}
                        rowsMax={20}
                        variant="outlined"
                        fullWidth
                        label={I18n.t("Input.goods.Tóm tắt nội dung")}
                        onChange={(value) => this.onHandleChange(value, 'summary')}
                        name="summary"
                     />
                  </Grid>
                  <Grid item xs={8}>
                     <TextField
                        multiline
                        rows={4}
                        rowsMax={20}
                        variant="outlined"
                        fullWidth
                        label={I18n.t("Input.goods.content.Lời dẫn giới thiệu")}
                        onChange={(value) => this.onHandleChange(value, 'contentStart')}
                        name="contentStart"
                     />
                  </Grid>
               </Grid>
               {
                  data.map((_item, index) => {
                     let content = _.get(_item, 'content', [])
                     return (
                        <Grid container spacing={16} key={index}>
                           <Grid item xs={12}>
                              <div style={{ textAlign: 'right' }} >
                                 <IconButton style={{ color: 'red' }} onClick={() => this.signItem(index)} >
                                    <Icon>highlight_off</Icon>
                                 </IconButton>
                              </div>
                              <div style={{ borderStyle: 'groove', padding: '10px' }}>
                                 <Grid container spacing={16}>
                                    <Grid item xs={6}>
                                       <TextField
                                          fullWidth
                                          label={I18n.t("Input.goods.Tiêu đề nội dung")}
                                          onChange={(value) => this.onChangeData(value, 'title', index)}
                                          name={`data[${index}][title]`}
                                       />
                                    </Grid>
                                    <Grid item xs={5}>
                                       <TextField
                                          fullWidth
                                          label={I18n.t("Input.goods.Link ảnh")}
                                          onChange={(value) => this.onChangeData(value, 'image', index)}
                                          name={`data[${index}][image]`}
                                       />
                                    </Grid>
                                 </Grid>
                                 <IconButton color='primary' onClick={() => this.addContent(index)}>
                                    <Icon>add_circle_outline</Icon>
                                 </IconButton>
                                 {
                                    content.map((element, count) => {
                                       return (
                                          <Grid key={count} container direction='row' alignItems="center" spacing={8}>
                                             <Grid item xs={11}>
                                                <TextField
                                                   multiline
                                                   rows={4}
                                                   rowsMax={20}
                                                   variant="outlined"
                                                   fullWidth
                                                   value={element.listConten}
                                                   label={I18n.t("Input.goods.List Item nội dung")}
                                                   onChange={(value) => this.onChangeContent(value, 'listConten', index, count)}
                                                   name={`data[${index}][content][${count}][listConten]`}
                                                />
                                             </Grid>
                                             <Grid item xs={1}>
                                                <center>
                                                   <IconButton onClick={() => this.signContent(index, count)} >
                                                      <Icon style={{ color: 'red' }} >delete</Icon>
                                                   </IconButton>
                                                </center>
                                             </Grid>
                                          </Grid>
                                       )
                                    })
                                 }
                              </div>
                           </Grid>
                        </Grid>
                     )
                  })
               }
               <br></br>
               <center>
                  <Button color='primary' variant='outlined' onClick={() => this.addItem()}>
                     Thêm Nội dung
                  </Button>
               </center>
               <Grid container spacing={32}>
                  <Grid item xs={12}>
                     <TextField
                        multiline
                        rows={4}
                        rowsMax={20}
                        variant="outlined"
                        fullWidth
                        label={I18n.t("Input.goods.Lời dẫn kết thúc")}
                        onChange={(value) => this.onHandleChange(value, 'contentEnd')}
                        name="contentEnd"
                     />
                  </Grid>
               </Grid>
               <CardActions>
                  <Button variant="contained" color="primary" onClick={() => this.goto("/posts")}>
                     <Icon>keyboard_arrow_left</Icon>{I18n.t("Button.back")}
                  </Button>
                  <Button type="submit" variant="contained" color="primary">{I18n.t("Button.submit")}</Button>
                  <Button variant="contained" onClick={this.onShow} color="primary">{I18n.t("Button.previews.Xem trước")}</Button>
               </CardActions>
            </Card>
         </Form>
      )
   }

   render() {
      const { classes } = this.props
      let { dataInput } = this.state
      return (
         <div>
            {
               this.renderPreviews(dataInput)
            }
            <Grid container spacing={32}>
               <Grid item xs={1}></Grid>
               <Grid item xs={10}>
                  {
                     this.renderPosts(classes)
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