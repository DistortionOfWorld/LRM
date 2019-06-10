
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect, Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import configureStore, { history } from './redux/stores/configureStore'
import { setSessionsFromInitial } from './redux/actions/session.action'
import { setRootPath, setTitle } from './redux/actions/env.action'
import { setWords } from './redux/actions/lang.action'

import Authentication from './Authentication'

const store = configureStore()

const pstore = persistStore(store)

const App = (props) => {
	props.setWords(props.sessions.language)
	let sessions = {...props.sessions,csrf:document.head.querySelector('meta[name="csrf-token"]').content}
	props.setSessionsFromInitial(sessions)
	props.setRootPath(document.head.querySelector('meta[name="laravel-root"]').content)
	props.setTitle(document.head.querySelector('title').innerHTML)
	return (
		<ConnectedRouter history={props.history}>
			<Authentication />
		</ConnectedRouter>
	)
}

App.propTypes = {
	history: PropTypes.object,
	setRootPath: PropTypes.func.isRequired,
	setTitle: PropTypes.func.isRequired,
	setWords: PropTypes.func.isRequired,
	setSessionsFromInitial: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
	setRootPath: (root) => dispatch(setRootPath(root)),
	setTitle: (title) => dispatch(setTitle(title)),
	setWords: (lang) => dispatch(setWords(lang)),
	setSessionsFromInitial: (sessions) => dispatch(setSessionsFromInitial(sessions)),
})

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

const render = (sessions) => {
	ReactDOM.render(
		<Provider store={store}>
			<PersistGate loading={<p>loading...</p>} persistor={pstore}>
				<ConnectedApp history={history} sessions={sessions} />
			</PersistGate>
		</Provider>,
		document.getElementById('react-root')
	)
}

function startReact()
{
	let params = new URLSearchParams()
	let url = '/session'
	window.axios.post(url,params)
		.then((response)=>{
			render(response.data)
		})
}

startReact()
