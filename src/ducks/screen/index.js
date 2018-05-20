import { List, Map } from 'immutable';
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
    PATCH_SCREEN: createType(['PATCH', 'SCREEN']),
    PUT_SCREEN: createType(['PUT', 'SCREEN'])
};

const initialState = {
    history: List(),
    current: '',
    currentParams: Map(),
    prev: '',
    prevParams: Map(),
};

const patch = {
    [types.PATCH_SCREEN]: (state, action) => ({
        ...state,
        history: state.history.push(action.payload)
    })
};

const put = {
    [types.PUT_SCREEN]: (state, action) => {
        const {
            routeName,
            routeParams
        } = action.payload;

        if(state.current !== routeName) {
            const _prev = state.current;
            const _prevParams = state.currentParams;
            return ({
                ...state,
                current: routeName.toString(),
                currentParams: Map(routeParams),
                prev: _prev,
                prevParams: _prevParams,
            });
        } else {
            return state;
        }

    }
};

export default screen = createReducer(initialState, {
    ...patch,
    ...put,
});

export const actions = {
    patch: key => action(types.PATCH_SCREEN, key),
    putScreen: ({ routeName, routeParams }) => action(types.PUT_SCREEN, { routeName, routeParams}),
};

export const selectors = {
    getHistory: state => state.screen.history,
    getPrev: state => ({
        routeName: state.screen.prev,
        params: state.screen.prevParams,
    }),
};