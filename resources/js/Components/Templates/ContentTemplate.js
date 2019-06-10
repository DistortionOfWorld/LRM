import React from 'react'
import {
	CssBaseline,
	Divider,
	Paper,
	Typography,
} from '@material-ui/core'

import NavigationDrawer from '../Elements/NavigationDrawer'

const ContentTemplate = (props,Content,page) => {
	const classes = props.classes
	return (
		<div className={classes.root}>
			<CssBaseline />
			<NavigationDrawer />
			<main className={classes.main}>
				<CssBaseline />
				<Paper className={classes.paper}>
					<Typography component="h1" variant="h5">
						{props.words[page+'Title']}
					</Typography>
					<Divider style={{marginBottom:'1rem'}} />
					{ Content }
				</Paper>
			</main>
		</div>
	)
}

export default ContentTemplate
