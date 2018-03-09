import { List } from 'immutable';
import {
    action,
    stateType,
    createType,
    createReducer,
    createRequestTypes,
    createInitState,
    setStateFlag,
    setStatePayload,
    concatStatePayload,
    getStateFlag,
    getStatePayload
} from '../helper';


export const types = {
    PATCH_SCREEN: createType(['PATCH', 'SCREEN'])
};

const initialState = {
    history: List()
};

const patch = {
    [types.PATCH_SCREEN]: (state, action) => ({
        ...state,
        history: state.history.push(action.payload)
    })
};

export default screen = createReducer(initialState, {
    ...patch
});

export const actions = {
    patch: key => action(types.PATCH_SCREEN, key)
};

export const selectors = {
    getHistory: state => state.screen.history
};