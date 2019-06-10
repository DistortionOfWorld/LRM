// React Libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
// Material UI Library
import { withStyles } from '@material-ui/core/styles'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Typography,
} from '@material-ui/core'

// Config
import {
	dialogTitleStyles,
	dialogContentStyles,
	dialogActionsStyles,
} from '../../config/styles/dialog.style'
// Components
import MaterialIcon from './MaterialIcon'
// Redux
import {
	setDialogOpen,
} from '../../redux/actions/dialog.action'

const StyledDialogTitle = withStyles(dialogTitleStyles)(props => {
	const { children, classes, onClose } = props
	return (
		<DialogTitle disableTypography className={classes.root}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
				<MaterialIcon icon="close" />
				</IconButton>
			):null}
		</DialogTitle>
	)
})

const StyledDialogContent = withStyles(dialogContentStyles)(DialogContent)

const StyledDialogActions = withStyles(dialogActionsStyles)(DialogActions)

const HistoryDialog = (props) => {
	return (
		<div>
			<Dialog
				onClose={()=>props.setDialogOpen(false)}
				aria-labelledby="customized-dialog-title"
				open={props.dialogOpen}
				>
				<StyledDialogTitle id="customized-dialog-title" onClose={()=>props.setDialogOpen(false)}>
					お取引の詳細
				</StyledDialogTitle>
				<StyledDialogContent dividers>
					<Typography gutterBottom>
						<b>利用店舗</b><br />
						{props.dialogContent.shop_name}<br />
					</Typography>
					<Typography gutterBottom>
						<b>購入日時</b><br />
						{props.dialogContent.created_at}<br />
					</Typography>
					<Typography gutterBottom>
						<b>金額</b><br />
						{props.dialogContent.amount}
					</Typography>
				</StyledDialogContent>
			</Dialog>
		</div>
	)
}

HistoryDialog.propTypes = {
	dialogOpen: PropTypes.bool,
	dialogContent: PropTypes.object,
	setDialogOpen: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	dialogOpen: state.dialog.open,
	dialogContent: state.dialog.content,
})

const mapDispatchToProps = dispatch => ({
	setDialogOpen: (open) => dispatch(setDialogOpen(open)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HistoryDialog)
