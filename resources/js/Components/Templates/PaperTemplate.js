import React from 'react'
import {
	Avatar,
	CssBaseline,
	Divider,
	Paper,
	Typography,
} from '@material-ui/core'
import RoutingTable from '../../config/routes/RoutingTable'

const PaperTemplate = (props,Form,page) => {
	const classes = props.classes
	return (
		<div className={classes.root}>
			<main className={classes.main}>
				<CssBaseline />
				<Paper className={classes.paper}>
					{ SymbolIcon(RoutingTable[page].icon,classes.avatar) }
					<Typography component="h1" variant="h5">
						{props.words[page+'Title']}
					</Typography>
					<Divider style={{marginBottom:'1rem'}} />
					{ Form }
				</Paper>
			</main>
		</div>
	)
}

const SymbolIcon = (icon,styles) => {
	if(icon===null)
	{
		return <></>
	}
	else
	{
		return (
			<Avatar className={styles}>
				<i className="material-icons">{icon}</i>
			</Avatar>
		)
	}
}
export default PaperTemplate
