import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authUser } from 'actions/user_actions';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function(ComposedClass, reload, adminRoute) {
  const mapStateToProps = state => {
    return {
      user: state.user
    };
  };

  class Auth extends Component {
    state = {
      loading: false
    };

    async componentDidMount() {
      await this.props.dispatch(authUser());
      const { isAuthed, isAdmin } = this.props.user;
      if (!isAuthed) {
        if (reload) {
          this.props.history.push('/register_login');
        }
      } else {
        if (adminRoute && !isAdmin) {
          this.props.history.push('/user/dashboard');
        } else {
          if (!reload) {
            this.props.history.push('/user/dashboard');
          }
        }
      }
    }

    render() {
      if (this.state.loading) {
        return (
          <div className="main_loader">
            <CircularProgress style={{ color: '#2196F3' }} thickness={7} />
          </div>
        );
      } else {
        return <ComposedClass {...this.props} user={this.props.user} />;
      }
    }
  }
  return connect(mapStateToProps)(Auth);
}
