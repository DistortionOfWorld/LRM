// React Libraries
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
// Material UI Library
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableFooter,
	TablePagination,
	TableRow,
	Paper,
	IconButton,
} from '@material-ui/core';
// Config
import { tableStyles } from '../../config/styles/table.style'
// Components
import MaterialIcon from './MaterialIcon'
import HistoryDialog from './HistoryDialog'
import TablePagenationActionButtons from './TablePagination'
// Redux
import {
	setDialogContent,
	setDialogOpen,
} from '../../redux/actions/dialog.action'

const StyledTableCell = withStyles(theme => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const HistoryTable = (props) => {
	const classes = props.classes

	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const [rows, setRows] = useState([])
	const [indexer, setIndexer] = useState({})
	
	const handleChangePage = (event, page) => {
		setPage(page)
	}

	const handleChangeRowsPerPage = event => {
		setPage(0)
		setRowsPerPage(event.target.value)
	}
	
	const openDetails = (id) => {
		props.setDialogOpen(true)
		let index = indexer[id]
		let content = rows[index]
		props.setDialogContent(content)
	}
	
	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)
	useEffect(() => {
		let params = new URLSearchParams()
		let url = props.root+'get_history'
		window.axios.get(url,params)
			.then((response)=>{
				const history = response.data.history
				setRows(history)
				let indexer = {}
				for(let rowIndex=0; rowIndex<history.length;rowIndex++)
				{
					const historyId = history[rowIndex].id
					indexer[historyId] = rowIndex
				}
				setIndexer(indexer)
			})
			.catch((error)=>{
				console.log(error)
			})
	}, [])
	
	const labelRowsPerPage = (
		<>
			<div className={classes.largeShowLabel}>
				Rows per page:
			</div>
			<div className={classes.smallShowLabel}>
				Rows
			</div>
		</>
	)
	const labelDisplayedRows = ({ from, to, count }) => (
		<div className={classes.labelDisplayedRowsFonts}>
			{from}-{to} of {count}
		</div>
	)

    return (
		<Paper className={classes.root}>
			<div className={classes.tableWrapper}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<StyledTableCell>詳細</StyledTableCell>
							<StyledTableCell>日時</StyledTableCell>
							<StyledTableCell align="right">金額</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
							<TableRow key={row.id}>
								<TableCell>
									<IconButton
										onClick={()=>{openDetails(row.id)}}
										>
										<MaterialIcon icon="search" />
									</IconButton>
								</TableCell>
								<TableCell component="th" scope="row">
									{row.date}
								</TableCell>
								<TableCell align="right">{row.amount}</TableCell>
							</TableRow>
						))}
						{emptyRows > 0 && (
							<TableRow style={{ height: 48 * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[5, 10, 25, 50]}
								colSpan={3}
								count={rows.length}
								rowsPerPage={rowsPerPage}
								labelRowsPerPage={labelRowsPerPage}
								labelDisplayedRows={labelDisplayedRows}
								page={page}
								SelectProps={{native: true}}
								onChangePage={handleChangePage}
								onChangeRowsPerPage={handleChangeRowsPerPage}
								ActionsComponent={TablePagenationActionButtons}
								/>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
			<HistoryDialog />
		</Paper>
	)
}

HistoryTable.propTypes = {
	classes: PropTypes.object.isRequired,
	root: PropTypes.string,
	setDialogContent: PropTypes.func.isRequired,
	setDialogOpen: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	root: state.env.root,
})

const mapDispatchToProps = dispatch => ({
	setDialogContent: (content) => dispatch(setDialogContent(content)),
	setDialogOpen: (open) => dispatch(setDialogOpen(open)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(tableStyles)(HistoryTable))
