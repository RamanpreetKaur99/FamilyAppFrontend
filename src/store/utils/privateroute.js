
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { propTypes } from 'react-bootstrap/esm/Image';

/*const PrivateRoute = ({
  component: Component,
  auth: { loading, isAuthenticated },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};*/

const PrivateRoute = ({component: Component,isAuthenticated, ...rest}) => {
  return (

      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /signin page
      <Route {...rest} render={props => (
          isAuthenticated ?
              <Component {...props} />
          : <Redirect to="/login" />
      )} />
  );
};


/*const PrivateRoute = ({isAuthenticated, ...rest}) => {
  console.log(props)
    return(
    <Route {...rest} render= { props => 
      isAuthenticated?
      component = {}
      :
      <Redirect to='/login' />
    } />
    )
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};
*/
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token!=null,
});

export default connect(mapStateToProps)(PrivateRoute);