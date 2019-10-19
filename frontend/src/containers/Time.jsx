import React from 'react';
import BaseContainer, { selector } from 'containers/BaseContainer';

import { Form, TextField, DateTimeField, Validation } from 'components/Forms'
import { Grid, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PaperFade from "components/Main/PaperFade"
class Time extends BaseContainer {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            time: ''
        }
    }

    onSubmit(values) {
        values.month = values.month - 1
        let time = new Date(values.year, values.month, values.day, values.hours, values.minutes)
        this.setState({
            time: time.toISOString()
        })
    }
    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Grid container spacing={32}>
                    <Grid item xs={12} lg={2}>
                        <TextField
                            fullWidth
                            label={"Năm"}
                            name="year"
                        />
                    </Grid>
                    <Grid item xs={12} lg={2}>
                        <TextField
                            fullWidth
                            label={"tháng"}
                            name="month"
                        />
                    </Grid>
                    <Grid item xs={12} lg={2}>
                        <TextField
                            fullWidth
                            label={"ngày"}
                            name="day"
                        />
                    </Grid>
                    <Grid item xs={12} lg={2}>
                        <TextField
                            fullWidth
                            label={"giờ"}
                            name="hours"
                        />
                    </Grid>
                    <Grid item xs={12} lg={2}>
                        <TextField
                            fullWidth
                            label={"phút"}
                            name="minutes"
                        />
                    </Grid>
                </Grid>



                <Grid container spacing={32}>
                    <Grid item xs={12} lg={12}>
                        <Button type="submit" variant="contained" color="primary">{"Đổi"}</Button>
                    </Grid>
                </Grid>
                <Typography variant="h5" gutterBottom>
                    {this.state.time}
      </Typography>
            </Form>

        )
    }
}


export default Time