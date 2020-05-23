import * as React from "react";
import { View } from "react-native";
import { HeaderChat } from "../components/common/Header";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { BottomNavigation } from "react-native-paper";

import ChatsScreen from "./ChatsScreen";
import OnlineUsersScreen from "./OnlineUsersScreen";
import SettingScreen from "./ChatSettingScreen";

/*function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}*/

const ChatsRoute = ChatsScreen;
const OnlineUsersRoute = OnlineUsersScreen;
const SettingRoute = SettingScreen;

export default class ChatScreen extends React.Component {
  state = {
    index: 0,
    routes: [
      {
        key: "message",
        title: "Mesajlar",
        icon: "message",
      },
      {
        key: "online",
        title: "Online Kullanıcılar",
        icon: "account",
        badge: "4",
      },
      {
        key: "setting",
        title: "Ayarlar",
        icon: "settings",
      },
    ],
  };

  _handleIndexChange = (index) => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({});

  _renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case "message":
        return <ChatsRoute jumpTo={jumpTo} />;
      case "online":
        return <OnlineUsersRoute jumpTo={jumpTo} />;
      case "setting":
        return <SettingRoute jumpTo={jumpTo} />;
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderChat
          title="ChatHub"
          onPress={this.props.navigation.openDrawer}
        />

        <BottomNavigation
          navigationState={this.state}
          barStyle={{ backgroundColor: "#ad063b" }}
          onIndexChange={this._handleIndexChange}
          renderScene={this._renderScene}
          sceneAnimationEnabled={false}
        />
      </View>
    );
  }
}
