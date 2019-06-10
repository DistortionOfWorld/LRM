// React Libraries
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// Material UI Library
import { withStyles } from '@material-ui/core/styles'
import {
	Button,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormHelperText,
	Input,
	InputLabel,
	Select,
	MenuItem,
} from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
// Config
import contentStyles from '../../config/styles/content.style'
import palette from '../../config/material/palette'
// Components
import SessionAlert from '../Elements/SessionAlert'
import ContentTemplate from '../Templates/ContentTemplate'
// Redux
import {
	clearStatusSessions,
	setLang,
} from '../../redux/actions/session.action'
import { setWords } from '../../redux/actions/lang.action'
import { setTheme } from '../../redux/actions/theme.action'
import { setNextRoute } from '../../redux/actions/env.action'
import { setDrawerOpen } from '../../redux/actions/drawer.action'
import pageInit from '../../redux/actions/pageInit.group.action'

const getColorList = (type) => {
	let colorList = []
	for(let key in palette)
	{
		colorList.push(<MenuItem value={key} key={type+'-'+key}>{palette[key]}</MenuItem>)
	}
	return colorList
}

const page = 'settings'

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
			<FormControl className={classes.formControl} margin="normal" fullWidth>
				<InputLabel htmlFor="lang-helper">{props.words['langLink']}</InputLabel>
				<Select
					onChange={(e)=>{changeLang(props,e.target.value)}}
					value={props.lang}
					input={<Input name="lang" id="lang-helper" />}
					>
						<MenuItem value="ja">日本語</MenuItem>
						<MenuItem value="en">English</MenuItem>
				</Select>
			</FormControl>
			<FormControl className={classes.formControl} margin="normal" fullWidth>
				<InputLabel htmlFor="primary-helper">{props.words['themeLink']}[Primary]</InputLabel>
				<Select
					onChange={(e)=>{changePrimary(props,e.target.value)}}
					value={props.primary}
					input={<Input name="primary" id="primary-helper" />}
					>
						{getColorList('primary')}
				</Select>
			</FormControl>
			<FormControl className={classes.formControl} margin="normal" fullWidth>
				<InputLabel htmlFor="secondary-helper">{props.words['themeLink']}[Secondary]</InputLabel>
				<Select
					onChange={(e)=>{changeSecondary(props,e.target.value)}}
					value={props.secondary}
					input={<Input name="secondary" id="secondary-helper" />}
					>
						{getColorList('secondary')}
				</Select>
			</FormControl>
			<FormGroup row>
				<FormControlLabel control={<Button variant="contained" color="primary">Primary</Button>} />
				<FormControlLabel control={<Button variant="contained" color="secondary">Secondary</Button>} />
			</FormGroup>
		</>
	)
}

const changeLang = (props,lang) => {
	props.setLang(lang)
	props.setWords(lang)
	let params = new URLSearchParams()
	params.set('target','language')
	params.set('value',lang)
	let url = props.root+'set_profile'
		window.axios.post(url,params)
			.then((response)=>{
			})
			.catch((error)=>{
			})
}

const changePrimary = (props,primary) => {
	props.setTheme({primary})
	let params = new URLSearchParams()
	params.set('target','primary')
	params.set('value',primary)
	let url = props.root+'set_profile'
		window.axios.post(url,params)
			.then((response)=>{
			})
			.catch((error)=>{
			})
}

const changeSecondary = (props,secondary) => {
	props.setTheme({secondary})
	let params = new URLSearchParams()
	params.set('target','secondary')
	params.set('value',secondary)
	let url = props.root+'set_profile'
		window.axios.post(url,params)
			.then((response)=>{
			})
			.catch((error)=>{
			})
}

Settings.propTypes = {
	root: PropTypes.string,
	next: PropTypes.string,
	lang: PropTypes.string,
	words: PropTypes.object,
	primary: PropTypes.string,
	secondary: PropTypes.string,
	setNextRoute: PropTypes.func.isRequired,
	clearStatusSessions: PropTypes.func.isRequired,
	setLang: PropTypes.func.isRequired,
	setWords: PropTypes.func.isRequired,
	setTheme: PropTypes.func.isRequired,
	setDrawerOpen: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	root: state.env.root,
	next: state.env.next,
	lang: state.session.lang,
	words: state.lang.words,
	primary: state.theme.primary,
	secondary: state.theme.secondary,
})

const mapDispatchToProps = dispatch => ({
	setNextRoute: (next) => dispatch(setNextRoute(next)),
	clearStatusSessions: () => dispatch(clearStatusSessions()),
	setLang: (lang) => dispatch(setLang(lang)),
	setWords: (lang) => dispatch(setWords(lang)),
	setTheme: (theme) => dispatch(setTheme(theme)),
	setDrawerOpen: (open) => dispatch(setDrawerOpen(open)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(contentStyles)(Settings))
