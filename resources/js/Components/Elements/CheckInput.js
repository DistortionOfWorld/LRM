// React Libraries
import React from 'react'
// Material UI Library
import {
	FormControlLabel,
	InputLabel,
	Checkbox,
} from '@material-ui/core'


const CheckInput = (props) => {
	let inputProps = {}
	inputProps.id=props.identity
	inputProps.name=props.identity
	inputProps.checked=props.checked
	inputProps.onChange= check => props.action(check.target.checked)
	return (
		<FormControlLabel
			control={<Checkbox {...inputProps} />}
			label={props.label}
			/>
	)
}

export default CheckInput
