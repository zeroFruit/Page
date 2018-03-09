import React,{PureComponent} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors, actions } from '../../ducks/book';

export const AddBookHOC = (WrappedComponent) => {
    class WithAddBookHOC extends PureComponent {
        static navigationOptions = WrappedComponent.navigationOptions;
        async componentWillReceiveProps(np) {
            if(np.addState.get('success')) {
                await this.props.init();
            }
        }
        render() {
            return (
                <WrappedComponent
                    { ...this.props }
                />
            );
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(WithAddBookHOC);
};

const mapStateToProps = state => ({
    addState: selectors.GetAdd(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    add: actions.AddBook,
    init: actions.InitAddBookState
}, dispatch);
