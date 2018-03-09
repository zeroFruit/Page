import { List } from 'immutable';

let history = List();

const History = {
    push: state => {
        history = history.push(state);
    },
    pop: () => {
        return history.get(history.size - 1);
    },
    get: () => history.toJS()
};


export default History;