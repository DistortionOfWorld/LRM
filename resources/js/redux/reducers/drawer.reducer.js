const initialState = {
	open:false,
}

const drawerReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_DRAWER_OPEN':
			return {...state,open:action.payload.open}
		default:
			return state
	}
}

export default drawerReducer
