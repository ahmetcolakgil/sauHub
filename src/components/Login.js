import React, { Component, Fragment } from "react";
import { Text, View, Image, KeyboardAvoidingView } from "react-native";
import { Input, TextLink, Loading } from "./common";
import { Button } from "react-native-paper";
import axios from "axios";
import deviceStorage from "../services/deviceStorage";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
      loading: false,
    };
    this.loginUser = this.loginUser.bind(this);
    this.onLoginFail = this.onLoginFail.bind(this);
  }
  loginUser() {
    const { username, password } = this.state;

    this.setState({ error: "", loading: true });

    // NOTE Post to HTTPS only in production
    axios
      .post("http://192.168.1.102:8080/api/auth/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        deviceStorage.saveItem("id_token", response.data);
        this.props.newJWT(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);
        this.onLoginFail(error.response.data);
      });
  }
  onLoginFail(error) {
    this.setState({
      error: error,
      loading: false, //BUNU FALSE YAP
    });
  }

  render() {
    const { username, password, error, loading } = this.state;
    const { form, section, errorTextStyle } = styles;

    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={{ width: "100%" }}
      >
        <Fragment>
          <View style={form}>
            <View style={{ alignItems: "center" }}>
              <Image
                style={{ width: 200, height: 200 }}
                source={require("../../assets/logo.png")}
              />
            </View>

            <View style={section}>
              <Input
                placeholder="user@email.com"
                label="E-mail"
                value={username}
                onChangeText={(username) => this.setState({ username })}
              />
            </View>

            <View style={section}>
              <Input
                secureTextEntry
                label="Password"
                value={password}
                onChangeText={(password) => this.setState({ password })}
              />
            </View>

            <Text style={errorTextStyle}>{error}</Text>

            {!loading ? (
              <Button
                onPress={this.loginUser}
                mode="contained"
                style={{ alignSelf: "center", width: "70%" }}
              >
                Login
              </Button>
            ) : (
              <Loading size={"large"} />
            )}
          </View>
          <View style={{ alignSelf: "center" }}>
            <TextLink onPress={this.props.authSwitch}>
              Don't have an account? Register!
            </TextLink>
          </View>
        </Fragment>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  form: {
    width: "100%",
  },
  section: {
    flexDirection: "row",
  },
  errorTextStyle: {
    alignSelf: "center",
    fontSize: 18,
    color: "red",
  },
};

export { Login };
