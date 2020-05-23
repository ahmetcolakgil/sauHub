import React, { Component, Fragment } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { View, Text, Image } from "react-native";
import { Button } from "react-native-paper";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: ""
    };
  }
  static navigationOptions = {
    title: "Home"
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ justifyContent: "flex-start", alignItems: "center" }}>
          <Image
            style={{ width: 100, height: 100 }}
            source={require("../../assets/logo.png")}
          />
        </View>
        <Fragment>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: 5
            }}
          >
            <Button
              icon="magnify"
              mode="contained"
              onPress={() => this.props.navigation.navigate("Profile")}
              style={{ borderRadius: 5 }}
            >
              Konulara Gözat
            </Button>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: 5
            }}
          >
            <Button
              icon="lead-pencil"
              mode="contained"
              onPress={() => this.props.navigation.navigate("Profile")}
              style={{ borderRadius: 5 }}
            >
              Yeni Konu Aç
            </Button>
          </View>
          <Button onPress={this.props.deleteJWT}>Log Out</Button>
        </Fragment>
      </View>
    );
  }
}

class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
        <Button onPress={() => this.props.navigation.navigate("Home")}>
          Go to Home
        </Button>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class Router extends React.Component {
  render() {
    return <AppContainer />;
  }
}
