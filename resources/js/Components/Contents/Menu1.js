// React Libraries
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// Material UI Library
import withStyles from '@material-ui/core/styles/withStyles'
import {
	Button,
	FormControlLabel,
	FormGroup,
	colors,
} from '@material-ui/core'
// Config
import contentStyles from '../../config/styles/content.style'
// Components
import ContentTemplate from '../Templates/ContentTemplate'
import palette from '../../config/material/palette'
// Redux
import {
	clearStatusSessions,
	setLang,
} from '../../redux/actions/session.action'
import { setWords } from '../../redux/actions/lang.action'
import { setNextRoute } from '../../redux/actions/env.action'
import { setDrawerOpen } from '../../redux/actions/drawer.action'
import pageInit from '../../redux/actions/pageInit.group.action'

const page = 'menu1'

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
			Menu1-Color Palette
			<FormGroup row>
				{getColorButtonList()}
			</FormGroup>
		</>
	)
}

const getColorButtonList = () => {
	let colorButtonList = []
	for(let key in palette)
	{
		colorButtonList.push(<FormControlLabel key={'label-'+key} control={<CustomButton variant="contained" themecolor={colors[key]} key={'button-'+key}>{palette[key]}</CustomButton>} />)
	}
	return colorButtonList
}

const CustomButton = (props) => {
	const customTheme = theme => ({
		root: {
			color: theme.palette.getContrastText(props.themecolor[500]),
			backgroundColor: props.themecolor[500],
			'&:hover': {
				backgroundColor: props.themecolor[700],
			},
		},
	})
	const ComponentName = withStyles(customTheme)(Button)
	return <ComponentName {...props} />
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
