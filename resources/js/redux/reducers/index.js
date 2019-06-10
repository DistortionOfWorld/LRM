import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import sessionReducer from './session.reducer'
import envReducer from './env.reducer'
import langReducer from './lang.reducer'
import drawerReducer from './drawer.reducer'
import themeReducer from './theme.reducer'

const rootReducer = (history) => combineReducers({
	session: sessionReducer,
	env: envReducer,
	lang: langReducer,
	drawer: drawerReducer,
	theme: themeReducer,
	router: connectRouter(history),
})

export default rootReducer
