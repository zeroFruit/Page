import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, selectors } from '../../ducks/book';
import { ProgressBar } from '../../components';
import {
    navigateToNested
} from "../../Router";

export const EditBookHOC = (WrappedComponent) => {
    class WithEditBookHOC extends PureComponent {
        static navigationOptions = WrappedComponent.navigationOptions;
        async componentWillReceiveProps(np) {
            if(np.edit.get('success')) {
                await navigateToNested(this.props, 'tabs', {}, 'NewsFeed', {});
                await np.init();
                console.log('edit state init');
            }
        }
        componentWillUnmount() {
            console.log('EditBookHOC unmount');
        }
        render() {
            const {
                init,
                edit
            } = this.props;
            // if(edit.get('loading')) return <ProgressBar visible />;
            return (
                <WrappedComponent
                    { ...this.props }
                    AsyncEditBook={ this._edit }
                    editInitState={ init }
                    editSuccess={ edit.get('success') }
                    editLoading={ edit.get('loading') }
                />
            );
        }
        _edit = async ({ bid, author, title, content }) => {
            await this.props.AsyncEditBook({ bid, author, title, content });
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(WithEditBookHOC);
};

const mapStateToProps = state => ({
    edit: selectors.GetEdit(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    init: actions.InitEditBook,
    AsyncEditBook: actions.EditBook
}, dispatch);