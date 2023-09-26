import {configureStore} from '@reduxjs/toolkit'
import feedReducer from 'src/redux/store.js'

export default configureStore({
    reducer: {
        likes: feedReducer
    }
});