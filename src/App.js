import React, { Component } from "react";
import { Loading } from "./components/common/";
import Auth from "./screens/Auth";
import deviceStorage from "./services/deviceStorage.js";

import HomeScreen from "./screens/Home";
import CategoryScreen from "./screens/Category";
import ProfileScreen from "./screens/Profile";
import TopicListScreen from "./screens/TopicList";
import TopicScreen from "./screens/Topic";
import NewPostScreen from "./screens/NewPost";
import PostReplyScreen from "./screens/PostReply";
import CikisScreen from "./screens/Cikis";
import PostListScreen from "./screens/PostList";

import ChatScreen from "./screens/ChatMainScreen";
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

const RootStack = createDrawerNavigator(
  {
    // Profile: ProfileScreen,
    // Category: CategoryScreen,
    // NewPost: NewPostScreen,
    // PostReply: PostReplyScreen,
    // TopicList: TopicListScreen,
    // Topic: TopicScreen,
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
      screen: ChatScreen,
      navigationOptions: {
        title: "ChatHuB",
        drawerIcon: ({ tintColor }) => (
          <Feather name="message-circle" size={16} color={tintColor} />
        ),
      },
    },
    Message: {
      screen: MessageScreen,
      navigationOptions: {
        title: "Mesaj (Geçici)",
        drawerIcon: ({ tintColor }) => (
          <Feather name="message-circle" size={16} color={tintColor} />
        ),
      },
    },
    Category: {
      screen: CategoryScreen,
      navigationOptions: {
        title: "Kategoriler",
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="subtitles-outline"
            size={16}
            color={tintColor}
          />
        ),
      },
    },
    PostList: {
      screen: PostListScreen,
      navigationOptions: {
        title: "Konular",
        drawerIcon: ({ tintColor }) => (
          <AntDesign name="tags" size={16} color={tintColor} />
        ),
      },
    },
    NewPost: {
      screen: NewPostScreen,
      navigationOptions: {
        title: "Yeni Konu",
        drawerIcon: ({ tintColor }) => (
          <MaterialIcons name="playlist-add" size={16} color={tintColor} />
        ),
      },
    },
    PostReply: {
      screen: PostReplyScreen,
      navigationOptions: {
        title: "Konu Cevaplama",
        drawerIcon: ({ tintColor }) => (
          <MaterialIcons name="reply" size={16} color={tintColor} />
        ),
      },
    },
    TopicList: {
      screen: TopicListScreen,
      navigationOptions: {
        title: "TopicList",
        drawerIcon: ({ tintColor }) => (
          <Feather name="list" size={16} color={tintColor} />
        ),
      },
    },
    Topic: {
      screen: TopicScreen,
      navigationOptions: {
        title: "Topic",
        drawerIcon: ({ tintColor }) => (
          <Feather name="list" size={16} color={tintColor} />
        ),
      },
    },
    Cikis: {
      screen: "CikisScreen",
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
          screenProps={{ deleteJWT: this.deleteJWT, jwt: this.jwt }}
        />
      );
    }
  }
}
