import * as React from "react";
import { View } from "react-native";
import { HeaderChat, TopBarChat2 } from "../components/common/Header";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { BottomNavigation } from "react-native-paper";

import ContactsScreen from "./ContactsScreen";
import GroupsScreen from "./GroupsScreen";
import OnlineUsersScreen from "./OnlineUsersScreen";
import SettingScreen from "./ChatSettingScreen";

const ContactsRoute = ContactsScreen;
const GroupsRoute = GroupsScreen;
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
        key: "groups",
        title: "Gruplar",
        icon: "account-group",
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
        return <ContactsRoute screenProps={{ socket: this.props.screenProps.socket }}/>;
      case "groups":
        return <GroupsRoute jumpTo={jumpTo} />;
      case "setting":
        return <SettingRoute jumpTo={jumpTo} />;
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderChat
          title="ChatHub"
          openMenu={this.props.navigation.openDrawer}
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
