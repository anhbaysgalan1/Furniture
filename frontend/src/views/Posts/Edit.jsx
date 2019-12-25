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

} from '@material-ui/core'
import PaperFade from "components/Main/PaperFade"
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
         arrItem: [
            {
               content: [{ item: '1' }],
            },
         ],
      }
      this.onHandleChange = this.onHandleChange.bind(this)
      this.addItem = this.addItem.bind(this)
      this.signItem = this.signItem.bind(this)
      this.addContent = this.addContent.bind(this)
      this.signContent = this.signContent.bind(this)
   }

   componentWillReceiveProps(nextProps){
      let dataItem = _.get(nextProps, 'data.data', [])
      this.setState({ arrItem: dataItem})
      this.setState({ reload: !this.state.reload })
   }

   addItem() {
      let { arrItem } = this.state
      let element = {
         content: [{ item: '1' }]
      }
      arrItem.push(element)
      this.setState({ arrItem: arrItem })
      this.setState({ reload: !this.state.reload })
   }
   signItem(index) {
      let { arrItem } = this.state
      arrItem.splice(index, 1)
      this.setState({ arrItem: arrItem })
      this.setState({ reload: !this.state.reload })
   }
   addContent(index) {
      let { arrItem } = this.state
      let element = {
         item: '1'
      }
      arrItem[index].content.push(element)
      this.setState({ arrItem: arrItem })
      this.setState({ reload: !this.state.reload })
   }
   signContent(index, count) {
      let { arrItem } = this.state
      arrItem[index].content.splice(count, 1)
      this.setState({ arrItem: arrItem })
      this.setState({ reload: !this.state.reload })
   }

   onHandleChange(value, name) {
      let { dataInput } = this.state
      this.setState({
         dataInput: { ...this.state.dataInput, [name]: value }
      })
   }

   renderPosts(classes) {
      let { data, onSubmit } = this.props
      let { arrItem } = this.state
      let title      = _.get(data, 'title', '')
      let image      = _.get(data, 'image', '')
      let contentStart  = _.get(data, 'contentStart', '')
      let contentEnd = _.get(data, 'contentEnd', '')
      let number     = _.get(data, 'number', '')
      let summary    = _.get(data, 'summary', '')
      return (
         <Form className={classes.form} onSubmit={onSubmit}>
            <Card className={classes.card}>
               <Typography variant='h5' color='primary'>
                  Sửa tin tức
               </Typography>
               <Grid container spacing={32}>
                  <Grid item xs={6}>
                     <TextField
                        fullWidth
                        label={I18n.t("Input.goods.Tiêu đề tin tức")}
                        onChange={(value) => this.onHandleChange(value, 'title')}
                        name="title"
                        value={title}
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        fullWidth
                        label={I18n.t("Input.goods.Ảnh")}
                        onChange={(value) => this.onHandleChange(value, 'image')}
                        name="image"
                        value={image}
                     />
                  </Grid>
                  <Grid item xs={2}>
                     <TextField
                        fullWidth
                        label={I18n.t("Input.goods.Số lượt truy cập")}
                        onChange={(value) => this.onHandleChange(value, 'number')}
                        name="number"
                        value={number}
                     />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                        multiline
                        rows={6}
                        rowsMax={20}
                        variant="outlined"
                        fullWidth
                        value={summary}
                        label={I18n.t("Input.goods.Tóm tắt nội dung")}
                        onChange={(value) => this.onHandleChange(value, 'summary')}
                        name="summary"
                     />
                  </Grid>
                  <Grid item xs={8}>
                     <TextField
                        multiline
                        rows={6}
                        rowsMax={20}
                        variant="outlined"
                        fullWidth
                        label={I18n.t("Input.goods.content.Lời dẫn giới thiệu")}
                        onChange={(value) => this.onHandleChange(value, 'contentStart')}
                        name="contentStart"
                        value={contentStart}
                     />
                  </Grid>
               </Grid>
               {
                  arrItem.map((_item, index) => {
                     let content = _.get(_item, 'content', [])
                     let titleItem = _.get(_item, 'title', '')
                     let imgItem = _.get(_item, 'image', '')
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
                                          // onChange={(value) => this.onHandleChange(value, 'titleItem')}
                                          // name="titleItem"
                                          value={titleItem}
                                          name={`data[${index}][title]`}
                                       />
                                    </Grid>
                                    <Grid item xs={5}>
                                       <TextField
                                          fullWidth
                                          label={I18n.t("Input.goods.Link ảnh")}
                                          // onChange={(value) => this.onHandleChange(value, 'imgItem')}
                                          // name="imgItem"
                                          value={imgItem}
                                          name={`data[${index}][image]`}
                                       />
                                    </Grid>
                                 </Grid>
                                 <IconButton color='primary' onClick={() => this.addContent(index)}>
                                    <Icon>add_circle_outline</Icon>
                                 </IconButton>
                                 {
                                    content.map((element, count) => {
                                       let listConten = _.get(element, 'listConten', '')
                                       return (
                                          <Grid key={count} container direction='row' alignItems="center" spacing={8}>
                                             <Grid item xs={11}>
                                                <TextField
                                                   multiline
                                                   rows={4}
                                                   rowsMax={20}
                                                   variant="outlined"
                                                   fullWidth
                                                   label={I18n.t("Input.goods.List Item nội dung")}
                                                   // onChange={(value) => this.onHandleChange(value, 'contentItem')}
                                                   // name="contentItem"
                                                   value={listConten}
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
               <br />
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
                        value={contentEnd}
                     />
                  </Grid>
               </Grid>
               <CardActions>
                  <Button variant="contained" color="primary" onClick={() => this.goto("/posts")}>
                     <Icon>keyboard_arrow_left</Icon>{I18n.t("Button.back")}
                  </Button>
                  <Button type="submit" variant="contained" color="primary">{I18n.t("Button.submit")}</Button>
                  <Button variant="contained" color="primary">{I18n.t("Button.previews.Xem trước")}</Button>
               </CardActions>
            </Card>
         </Form>
      )
   }

   render() {
      const { classes } = this.props
      return (
         <div>
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