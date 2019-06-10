// React Libraries
import React, { useState } from 'react'
import PropTypes from 'prop-types'
// Material UI Library
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MaterialIcon from './MaterialIcon'
// Models
import { actionsStyles } from '../../config/styles/table.style'

const TablePaginationActions = (props) => {
	const handleFirstPageButtonClick = event => {
		props.onChangePage(event, 0)
	}
	const handleBackButtonClick = event => {
		props.onChangePage(event, props.page - 1)
	}
	const handleNextButtonClick = event => {
		props.onChangePage(event, props.page + 1);
	}
	const handleLastPageButtonClick = event => {
		props.onChangePage(
			event,
			Math.max(0, Math.ceil(props.count / props.rowsPerPage) - 1),
		)
	}

	const { classes, count, page, rowsPerPage, theme } = props
	return (
		<div className={classes.root}>
			<IconButton
				className={classes.jumpIcon}
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="First Page"
				>
				{theme.direction === 'rtl' ? <MaterialIcon icon="last_page" /> : <MaterialIcon icon="first_page" />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="Previous Page"
				>
				{theme.direction === 'rtl' ? <MaterialIcon icon="chevron_right" /> : <MaterialIcon icon="chevron_left" />}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="Next Page"
				>
				{theme.direction === 'rtl' ? <MaterialIcon icon="chevron_left" /> :<MaterialIcon icon="chevron_right" />}
			</IconButton>
			<IconButton
				className={classes.jumpIcon}
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="Last Page"
				>
				{theme.direction === 'rtl' ? <MaterialIcon icon="first_page" /> : <MaterialIcon icon="last_page" />}
			</IconButton>
		</div>
	)
}

TablePaginationActions.propTypes = {
	classes: PropTypes.object.isRequired,
	count: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	theme: PropTypes.object.isRequired,
}

const TablePagenationActionButtons = withStyles(actionsStyles, { withTheme: true })(
	TablePaginationActions,
)

export default TablePagenationActionButtons