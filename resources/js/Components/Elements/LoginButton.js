// React Libraries
import React from 'react'
import { Link } from 'react-router-dom'
// Material UI Library
import { Button } from '@material-ui/core'

const LoginButton = (props) => (
	<>
		<div>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={props.styles}
				onClick={props.onClick}
				>
				{props.button}
			</Button>
		</div>
		<div style={{marginTop:20}}>
			<Link to={'password/reset'}>
				{props.forgot}
			</Link>
		</div>
	</>
)

export default LoginButton