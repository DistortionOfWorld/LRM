// React Libraries
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// Material UI Library
import withStyles from '@material-ui/core/styles/withStyles'
// Config
import contentStyles from '../../config/styles/content.style'
// Components
import ContentTemplate from '../Templates/ContentTemplate'
// Redux
import {
	clearStatusSessions,
	setLang,
} from '../../redux/actions/session.action'
import { setWords } from '../../redux/actions/lang.action'
import { setNextRoute } from '../../redux/actions/env.action'
import { setDrawerOpen } from '../../redux/actions/drawer.action'
import pageInit from '../../redux/actions/pageInit.group.action'

const page = 'menu4'

const Settings = (props) => {
	useEffect(()=>{
		pageInit(props,page)
	},[])
	return ContentTemplate(props,Content(props),page)
}

const Content = (props) => {
	const classes = props.classes
	return (
		<>
			Menu1
		</>
	)
}

Settings.propTypes = {
	root: PropTypes.string,
	next: PropTypes.string,
	lang: PropTypes.string,
	words: PropTypes.object,
	setNextRoute: PropTypes.func.isRequired,
	clearStatusSessions: PropTypes.func.isRequired,
	setDrawerOpen: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	root: state.env.root,
	next: state.env.next,
	lang: state.session.lang,
	words: state.lang.words,
})

const mapDispatchToProps = dispatch => ({
	setNextRoute: (next) => dispatch(setNextRoute(next)),
	clearStatusSessions: () => dispatch(clearStatusSessions()),
	setDrawerOpen: (open) => dispatch(setDrawerOpen(open)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(contentStyles)(Settings))
