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
         dataInput: {
            name: '',
            code: '',
            image1: '',
            image2: '',
            image2: '',
            image4: '',
            moneyOld: '',
            moneyNew: '',
            typeGoods: '',
            typeWoods: '',
            content: ''
         },
         arrItem: [
            {
               arrContent: [{item: '1'}],
            },
         ],
      }
      this.onHandleChange = this.onHandleChange.bind(this)
      this.addItem = this.addItem.bind(this)
      this.signItem = this.signItem.bind(this)
      this.addContent = this.addContent.bind(this)
      this.signContent = this.signContent.bind(this)
   }

   addItem(){
      let { arrItem } = this.state
      let element = {
         arrContent: [{item: '1'}]
      }
      arrItem.push(element)
      this.setState({ arrItem: arrItem })
      this.setState({reload: !this.state.reload})
   }

   signItem(index){
      let { arrItem } = this.state
      arrItem.splice(index, 1)
      this.setState({ arrItem: arrItem })
      this.setState({reload: !this.state.reload})
   }

   addContent(index){
      let { arrItem } = this.state 
      let element = {
         item: '1'
      }
      arrItem[index].arrContent.push(element)
      this.setState({ arrItem: arrItem })
      this.setState({ reload: !this.state.reload })
   }

   signContent(index, count){
      let { arrItem } = this.state 
      arrItem[index].arrContent.splice(count, 1)
      this.setState({ arrItem: arrItem })
      this.setState({ reload: !this.state.reload })
   }

   onHandleChange(value, name) {
      let { dataInput } = this.state
      this.setState({
         dataInput: { ...this.state.dataInput, [name]: value }
      })
   }

   render() {
      const { classes, onSubmit } = this.props
      let { dataInput } = this.state
      let copyPermission = [
         {
            name: "Giường gỗ tự nhiên",
            code: 'GG1',
            _id: 'hdjffngjgihghjh'
         },
         {
            name: "Giường gỗ công nghiệp",
            code: 'GG1',
            _id: 'hdjffngjgihghjh'
         },
         {
            name: "Giường gỗ cổ điển",
            code: 'GG1',
            _id: 'hdjffngjgihghjh'
         },
         {
            name: "Giường gỗ hiện đại",
            code: 'GG1',
            _id: 'hdjffngjgihghjh'
         }
      ]

      let { arrItem } = this.state
      console.log('arrItem arrItem ', arrItem)

      let arrListContent = [
         {
            content: 'aaa',
         },
         {
            content: 'aaa',
         }
      ]

      return (
         <Form className={classes.form} onSubmit={onSubmit}>
            <Grid container spacing={32}>
               <Grid item xs={1}></Grid>
               <Grid item xs={10}>
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
                                 onChange={(value) => this.onHandleChange(value, 'img')}
                                 name="img"
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
                                 rows={6}
                                 rowsMax={8}
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
                                 rows={6}
                                 rowsMax={8}
                                 variant="outlined"
                                 fullWidth
                                 label={I18n.t("Input.goods.content.Lời dẫn giới thiệu")}
                                 onChange={(value) => this.onHandleChange(value, 'content')}
                                 name="content"
                              />
                           </Grid>
                        </Grid>
                        <center>
                           <Button color='primary' variant='outlined' onClick={() => this.addItem()}>
                              Thêm Nội dung
                           </Button>
                        </center>
                        {
                           arrItem.map((_item, index) => {
                              let arrContent = _.get(_item, 'arrContent', [])
                              return (
                                 <Grid container spacing={16} key={index}>
                                    <Grid item xs={12}>
                                       <div style={{textAlign: 'right'}} >
                                          <IconButton style={{color: 'red'}} onClick={() => this.signItem(index)} >
                                             <Icon>highlight_off</Icon>
                                          </IconButton>
                                       </div>
                                       <div style={{ borderStyle: 'groove', padding: '10px' }}>
                                          <Grid container spacing={16}>
                                             <Grid item xs={6}>
                                                <TextField
                                                   fullWidth
                                                   label={I18n.t("Input.goods.Tiêu đề nội dung")}
                                                   onChange={(value) => this.onHandleChange(value, 'titleItem')}
                                                   name="titleItem"
                                                />
                                             </Grid>
                                             <Grid item xs={5}>
                                                <TextField
                                                   fullWidth
                                                   label={I18n.t("Input.goods.Link ảnh")}
                                                   onChange={(value) => this.onHandleChange(value, 'imgItem')}
                                                   name="imgItem"
                                                />
                                             </Grid>
                                          </Grid>
                                          <IconButton color='primary' onClick={() => this.addContent(index)}>
                                             <Icon>add_circle_outline</Icon>
                                          </IconButton>
                                          {
                                             arrContent.map((element, count) => {
                                                return (
                                                   <center key={count} >
                                                      <Grid container direction='row' alignItems="center" spacing={8}>
                                                         <Grid item xs={11}>
                                                            <TextField
                                                               multiline
                                                               rows={4}
                                                               rowsMax={8}
                                                               variant="outlined"
                                                               fullWidth
                                                               label={I18n.t("Input.goods.List Item nội dung")}
                                                               onChange={(value) => this.onHandleChange(value, 'contentItem')}
                                                               name="contentItem"
                                                            />
                                                         </Grid>
                                                         <Grid item xs={1}>
                                                            <IconButton onClick={() => this.signContent(index, count)} >
                                                               <Icon style={{color: 'red'}} >delete</Icon>
                                                            </IconButton>
                                                         </Grid>
                                                      </Grid>
                                                   </center>
                                                )
                                             })
                                          }
                                          
                                       </div>
                                    </Grid>
                                 </Grid>
                              )
                           })
                        }
                        <Grid container spacing={32}>
                           <Grid item xs={12}>
                              <TextField
                                 multiline
                                 rows={4}
                                 rowsMax={8}
                                 variant="outlined"
                                 fullWidth
                                 label={I18n.t("Input.goods.Lời dẫn kết thúc")}
                                 onChange={(value) => this.onHandleChange(value, 'contentItem')}
                                 name="contentItem"
                              />
                           </Grid>
                        </Grid>

                        {/* <Grid container spacing={32}>
                              <Grid item xs={3}>
                                    <AutoCompleteField
                                       key="1"
                                       fullWidth
                                       select
                                       label={I18n.t("Input.goods.typeGoods")}
                                       onChange={(value) => this.onHandleChange(value, 'typeGoods')}
                                       name="typeGoods"
                                       isMulti={false}
                                       isClearable={false}
                                    >
                                       {
                                          copyPermission.map(item => (
                                                <OptionAuto key={item._id} value={item._id} showCheckbox={false}>
                                                   {item.name}
                                                </OptionAuto>
                                          ))
                                       }
                                    </AutoCompleteField>
                              </Grid>
                           </Grid> */}
                     <CardActions>
                        <Button variant="contained" color="primary" onClick={() => this.goto("/posts")}>
                           <Icon>keyboard_arrow_left</Icon>{I18n.t("Button.back")}
                        </Button>
                        <Button type="submit" variant="contained" color="primary">{I18n.t("Button.submit")}</Button>
                     </CardActions>
                  </Card>
               </Grid>
               <Grid item xs={1}></Grid>
            </Grid>
         </Form>
      )
   }
}

Create.propTypes = {
   classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(Create))