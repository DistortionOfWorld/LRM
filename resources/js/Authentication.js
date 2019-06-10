// React Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router'
// Material UI Library
import { colors } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
// Config
import RoutingTable from './config/routes/RoutingTable'
// Components
import NavBar from './Components/Menus/NavBar'

const Authentication = (props)=> {
	const theme = createMuiTheme({
		palette: {
			primary: colors[props.primary],
			secondary: colors[props.secondary],
		},
	})
	let contentList = {guest:[],verify:[],member:[]}
	for(let key in RoutingTable){
		let routeProps = {}
		routeProps.key = key
		if(RoutingTable[key].exact) routeProps.exact = true
		routeProps.path = RoutingTable[key].path
		let displayType=RoutingTable[key].type
		routeProps[displayType]=RoutingTable[key][displayType]
		contentList[RoutingTable[key].category].push(<Route {...routeProps} />)
	}
	return(
		<>
			<ThemeProvider theme={theme}>
				<NavBar />
				<main className="py-3">
					{(()=>{
						if(props.session.logined===false){
							return (
								<Switch>
									{contentList['guest']}
									<Redirect to="/login" />
								</Switch>
							)
						}
						else
						{
							if(props.session.verified===false)
							{
								return (
									<Switch>
										{contentList['verify']}
										<Redirect to="/email/verify" />
									</Switch>
								)
							}
							else
							{
								return (
									<Switch>
										{contentList['member']}
										<Redirect to="/home" />
									</Switch>
								)
							}
						}
					})()}
				</main>
			</ThemeProvider>
		</>
	)
}

Authentication.propTypes = {
	session: PropTypes.object,
	primary: PropTypes.string,
	secondary: PropTypes.string,
}

const mapStateToProps = state => ({
	session: state.session,
	primary: state.theme.primary,
	secondary: state.theme.secondary,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)
