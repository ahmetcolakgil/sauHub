import * as React from "react";

export default class LogoutScreen extends React.Component {
  render() {
    return this.props.screenProps.deleteJWT;
  }
}
