const initialState = {
	primary: 'indigo',
	secondary: 'pink',
}

const themeReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_THEME':
			return {
				...state,
				...action.payload.theme,
			}
		default:
			return state
	}
}

export default themeReducer
