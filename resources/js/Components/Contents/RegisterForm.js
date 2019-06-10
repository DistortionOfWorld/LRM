// React Libraries
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
// Material UI Library
import withStyles from '@material-ui/core/styles/withStyles'
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

const page = 'register'

const RegisterForm = (props) =>{
	useEffect(()=>{
		pageInit(props,page)
	},[])
	return PaperTemplate(props,Form(props),page)
}

const Form = (props) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirm, setConfirm] = useState('')
	let mixedProps = {
		...props,
		name,
		email,
		password,
		confirm,
	}

	const classes = props.classes
	return(
		<form>
			<TextInput
				identity="name"
				controlType="text"
				label={props.words.name}
				defaultValue={name}
				action={setName}
				autoFocus={true}
				/>
			<TextInput
				identity="email"
				controlType="email"
				label={props.words.email}
				defaultValue={email}
				action={setEmail}
				autoFocus={false}
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
				label={props.words.registerButton}
				onClick={e=>preSubmit(e,mixedProps)}
				styles={classes.submit}
				/>
		</form>
	)
}
const preSubmit = (event,props) => {
	event.preventDefault()
	let params = new URLSearchParams()
	params.set('name',props.name)
	params.set('email',props.email)
	params.set('password',props.password)
	params.set('password_confirmation',props.confirm)
	let url = props.root+'register'
	window.axios.post(url,params)
		.then((response)=>{
			props.setSessionsFromSuccess(response.data)
			props.history.push('/home')
		})
		.catch((error)=>{
			props.setNextRoute('register')
			props.setSessionsFromFailure(error.response.data.errors)
		})
}

RegisterForm.propTypes = {
	root: PropTypes.string,
	next: PropTypes.string,
	words: PropTypes.object,
	setNextRoute: PropTypes.func.isRequired,
	clearStatusSessions: PropTypes.func.isRequired,
	setSessionsFromSuccess: PropTypes.func.isRequired,
	setSessionsFromFailure: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	root: state.env.root,
	next: state.env.next,
	words: state.lang.words,
})

const mapDispatchToProps = dispatch => ({
	setNextRoute: (next) => dispatch(setNextRoute(next)),
	clearStatusSessions: () => dispatch(clearStatusSessions()),
	setSessionsFromSuccess: (sessions) => dispatch(setSessionsFromSuccess(sessions)),
	setSessionsFromFailure: (errors) => dispatch(setSessionsFromFailure(errors)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(authStyles)(RegisterForm)))
