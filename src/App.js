import React, { Component } from "react";
import { Loading } from "./components/common/";
import Auth from "./screens/Auth";
import deviceStorage from "./services/deviceStorage.js";

import HomeScreen from "./screens/Home";
import ProfileScreen from "./screens/Profile";
import LogoutScreen from "./screens/Logout";
import ChatMainScreen from "./screens/ChatMainScreen";

import MessageScreen from "./screens/MessageScreen";

import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";

import { Dimensions } from "react-native";

import SideBar from "./components/common/SideBar";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { Button } from "react-native-paper";
import SocketIOClient from 'socket.io-client';

const RootStack = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: "Ana Sayfa",
        drawerIcon: ({ tintColor }) => (
          <Feather name="home" size={16} color={tintColor} />
        ),
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: "Profil",
        drawerIcon: ({ tintColor }) => (
          <Feather name="user" size={16} color={tintColor} />
        ),
      },
    },
    Chat: {
      screen: ChatMainScreen,
      navigationOptions: {
        title: "ChatHuB",
        drawerIcon: ({ tintColor }) => (
          <Feather name="message-circle" size={16} color={tintColor} />
        ),
      },
    },
    MessagingTest: {
      screen: MessageScreen,
      navigationOptions: {
        title: "Messaging Test",
        drawerIcon: ({ tintColor }) => (
          <Feather name="message-circle" size={16} color={tintColor} />
        ),
      },
    },
    Cikis: {
      screen: LogoutScreen,
      navigationOptions: {
        title: "Çıkış Yap",
        drawerIcon: ({ tintColor }) => (
          <Feather name="log-out" size={16} color={tintColor} />
        ),
      },
    },
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: true,
    contentComponent: (props) => <SideBar {...props} />,
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      jwt: "",
      loading: true,
    };
    this.newJWT = this.newJWT.bind(this);
    this.deleteJWT = deviceStorage.deleteJWT.bind(this);
    this.loadJWT = deviceStorage.loadJWT.bind(this);
    this.socket = SocketIOClient('http://192.168.1.102:8080');
    this.loadJWT();
  }

  newJWT(jwt) {
    this.setState({
      jwt: jwt,
    });
  }

  render() {
    if (this.state.loading) {
      return <Loading size={"large"} />;
    } else if (!this.state.jwt) {
      return <Auth newJWT={this.newJWT} />;
    } else if (this.state.jwt) {
      return (
        <AppContainer
          screenProps={{ deleteJWT: this.deleteJWT, jwt: this.jwt, socket: this.socket }}
        />
      );
    }
  }
}
