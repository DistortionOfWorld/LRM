// React Libraries
import React from 'react'
// Material UI Library
import { Button } from '@material-ui/core'

const SubmitButton = (props) => (
	<Button
		type="submit"
		fullWidth
		variant="contained"
		color="primary"
		className={props.styles}
		onClick={props.onClick}
		>
		{props.label}
	</Button>
)

export default SubmitButton