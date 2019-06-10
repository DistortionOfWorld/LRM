// React Libraries
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
// Material UI Library
import withStyles from '@material-ui/core/styles/withStyles'
import {
	Avatar,
	CssBaseline,
	Paper,
	Typography,
} from '@material-ui/core'
// Config
import authStyles from '../../config/styles/auth.style'
// Components
import TextInput from '../Elements/TextInput'
import SubmitButton from '../Elements/SubmitButton'
import PaperTemplate from '../Templates/PaperTemplate'
// Redux
import {
	clearStatusSessions,
	setSessionsFromSuccess,
	setSessionsFromFailure,
} from '../../redux/actions/session.action'
import { setNextRoute } from '../../redux/actions/env.action'
import pageInit from '../../redux/actions/pageInit.group.action'

const page = 'reset'

const ResetForm = (props) => {
	useEffect(()=>{
		pageInit(props,page)
	},[])
	return PaperTemplate(props,From(props),page)
}

const From = (props) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirm, setConfirm] = useState('')
	let mixedProps = {
		...props,
		email,
		password,
		confirm,
	}
	const classes = props.classes
	console.log('redraw')
	return (
		<form method="POST">
			<TextInput
				identity="email"
				controlType="email"
				label={props.words.email}
				defaultValue={email}
				action={setEmail}
				autoFocus={true}
				/>
			<TextInput
				identity="password"
				controlType="password"
				autoComplete="new-password"
				label={props.words.password}
				defaultValue={password}
				action={setPassword}
				/>
			<TextInput
				identity="password-confirm"
				controlType="password"
				name="password_confirmation"
				autoComplete="new-password"
				label={props.words.confirm}
				defaultValue={confirm}
				action={setConfirm}
				/>
			<SubmitButton
				label={props.words.resetButton}
				onClick={e=>preSubmit(e,mixedProps)}
				styles={classes.submit}
				/>
		</form>
	)
}
const preSubmit = (event,props) => {
	event.preventDefault()
	let params = new URLSearchParams()
	params.set('token',props.params.id)
	params.set('email',props.email)
	params.set('password',props.password)
	params.set('password_confirmation',props.confirm)
	let url = props.root+'password/reset'
	window.axios.post(url,params)
		.then((response)=>{
			props.setNextRoute('home')
			props.setSessionsFromSuccess(response.data)
			props.history.push('/home')
		})
		.catch((error)=>{
			props.setNextRoute('reset')
			props.setSessionsFromFailure(error.response.data.errors)
		})
}


ResetForm.propTypes = {
	root: PropTypes.string,
	next: PropTypes.string,
	words: PropTypes.object,
	param:  PropTypes.object,
	setNextRoute: PropTypes.func.isRequired,
	clearStatusSessions: PropTypes.func.isRequired,
	setSessionsFromSuccess: PropTypes.func.isRequired,
	setSessionsFromFailure: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	root: state.env.root,
	next: state.env.next,
	words: state.lang.words,
	param: state.param,
})

const mapDispatchToProps = dispatch => ({
	setNextRoute: (next) => dispatch(setNextRoute(next)),
	clearStatusSessions: () => dispatch(clearStatusSessions()),
	setSessionsFromSuccess: (sessions) => dispatch(setSessionsFromSuccess(sessions)),
	setSessionsFromFailure: (sessions) => dispatch(setSessionsFromFailure(sessions)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(authStyles)(ResetForm)))
