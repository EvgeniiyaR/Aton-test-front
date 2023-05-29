import { Component } from 'react';
import { Navigate } from "react-router-dom";

class ProtectedRoute extends Component {

  render() {
    return (
      this.props.isLoggedIn ? this.props.element : <Navigate to="/login" replace />
    )
  }
}

export default ProtectedRoute;
