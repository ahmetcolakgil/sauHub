import React, { Component, Fragment } from "react";
import { View, Text, Image, KeyboardAvoidingView } from "react-native";
import { Input, TextLink, Loading } from "./common";
import axios from "axios";
import deviceStorage from "../services/deviceStorage";
import { Button } from "react-native-paper";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      username: "",
      password: "",
      password_confirmation: "",
      error: "",
      loading: false,
    };
    this.registerUser = this.registerUser.bind(this);
    this.onRegistrationFail = this.onRegistrationFail.bind(this);
  }

  registerUser() {
    const {
      name,
      surname,
      username,
      password,
      password_confirmation,
    } = this.state;

    this.setState({ error: "", loading: true });

    axios
      .post("http://192.168.0.104:8000/users/signUp", {
        name: name,
        surname: surname,
        username: username,
        password: password,
        //  password_confirmation: password_confirmation
      })
      .then((response) => {
        deviceStorage.saveItem("id_token", response.data.token);
        this.props.newJWT(response.data.token);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);
        this.onRegistrationFail(error.response.data);
      });
  }

  onRegistrationFail(error) {
    this.setState({
      error: error,
      loading: false,
    });
  }

  render() {
    const {
      name,
      surname,
      username,
      password,
      password_confirmation,
      error,
      loading,
    } = this.state;
    const { form, section, errorTextStyle, textLink } = styles;

    return (
      <KeyboardAvoidingView behavior="padding">
        <View>
          <View style={{ alignItems: "center" }}>
            <Image
              style={{ width: 150, height: 150 }}
              source={require("../../assets/logo.png")}
            />
          </View>

          <View style={form}>
            <View style={section}>
              <Input
                label="Name"
                value={name}
                onChangeText={(name) => this.setState({ name })}
              />
            </View>

            <View style={section}>
              <Input
                label="Surname"
                value={surname}
                onChangeText={(surname) => this.setState({ surname })}
              />
            </View>
            <View style={section}>
              <Input
                label="username"
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

            <View style={section}>
              <Input
                secureTextEntry
                label="Confirm Password"
                value={password_confirmation}
                onChangeText={(password_confirmation) =>
                  this.setState({ password_confirmation })
                }
              />
            </View>

            <Text style={errorTextStyle}>{error}</Text>

            {!loading ? (
              <Button onPress={this.registerUser} mode="contained">
                Register
              </Button>
            ) : (
              <Loading size={"large"} />
            )}
          </View>

          <TextLink onPress={this.props.authSwitch} style={textLink}>
            Already have an account? Log in!
          </TextLink>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  form: {
    width: "100%",
    // borderTopWidth: 1,
    // borderColor: '#ddd',
  },
  section: {
    flexDirection: "row",
    // borderBottomWidth: 1,
    // backgroundColor: '#fff',
    // borderColor: '#ddd',
  },
  errorTextStyle: {
    alignSelf: "center",
    fontSize: 18,
    color: "red",
  },
};
export { Registration };
