import React, { Component } from 'react'
import SelectField from 'components/Forms/SelectField'
import { Option as OptionSelect } from 'components/Forms/MultipleSelectField'
import moment from 'moment'
import InputAdornment from '@material-ui/core/InputAdornment'
import CalendarToday from '@material-ui/icons/CalendarToday'
class MonthPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value || moment().format('YYYY.MM'),
            datestart: moment(this.props.datestart) || moment('2019-01-01'),
            dateend: moment(this.props.dateend) || moment()
        }
        this.onChange = this.onChange.bind(this)
    }

    getListMonth() {
        let datestart = this.state.datestart
        let dateend = this.state.dateend

        var interim = datestart.clone()
        var timeValues = []

        while (dateend > interim || interim.format('M') === dateend.format('M')) {
            timeValues.unshift(interim.format('YYYY.MM'))
            interim.add(1, 'month')
        }

        return timeValues
    }
    
    onChange(value) {
        let month = moment(value, 'YYYY.MM')
        let startDate = moment(month).startOf('month').startOf('day').toISOString()
        let endDate = moment(month).endOf('month').endOf('day').toISOString()
        if(this.props.onChange){
            this.props.onChange({
                startDate,
                endDate
            })
        }
    }

    render() {
        const { label, name, onChange, value, ...otherProps } = this.props
        let months = this.getListMonth()
        return (
            <SelectField
                {...otherProps}
                label={label}
                name={name}
                onChange={this.onChange}
                value={this.state.value}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarToday color = "primary"/>
                      </InputAdornment>
                    ),
                  }}
            >
                {months.map((option, index) => (
                    <OptionSelect key={index} value={option}>
                        {option}
                    </OptionSelect>
                ))}
            </SelectField>
        )
    }
}
export default MonthPicker