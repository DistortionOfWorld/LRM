const authStyles = theme => ({
	root: {
		display: 'flex',
	},
	main: {
		display: 'flex',
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		[theme.breakpoints.up(480 + theme.spacing(3 * 2))]: {
			width: 480,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing(10),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		marginTop: theme.spacing(3),
	},
});

export default authStyles