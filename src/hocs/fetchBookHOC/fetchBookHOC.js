import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { types, selectors, actions } from '../../ducks';
import { selectors as bookSelectors, actions as bookActions } from '../../ducks/book';
import { ProgressBar } from '../../components';

export const fetchBookHOC = (WrappedComponent) => {
    class WithBookAndUser extends PureComponent {
        static navigationOptions = WrappedComponent.navigationOptions;
        componentWillMount() {
            const { id } = this.props;
            this.props.AsyncFetchBookAndUserRequestAction(id);
        }
        async componentWillReceiveProps(np) {
            if(np.fetchState.get('success')) {
                await this.props.init();
                // console.log('success22');
            }
        }
        componentWillUnmount() {
            this.props.unmountBook();
        }
        render() {
            const {
                loading,
                selectedBook_
            } = this.props;
            if (loading) {
                return <ProgressBar  visible />;
            }
            return (
                <View style={ { flex: 1 } }>
                    <WrappedComponent
                        { ...this.props }
                        bookInfo={ selectedBook_ } />
                </View>
            );
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(WithBookAndUser);
};

const mapStateToProps = state => ({
    selectedBook_: bookSelectors.GetSelectedBook(state),
    fetchState: selectors.GetFetchState(state),
    loading: selectors.GetLoading(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    AsyncFetchBookAndUserRequestAction: bookId => ({
        type: types.FETCH_BOOK_AND_USER.REQUEST,
        payload: { bookId }
    }),
    init: actions.initFetchState,
    unmountBook: bookActions.UnmountFetchedBook
}, dispatch);
