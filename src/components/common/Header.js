import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { Appbar, Title } from "react-native-paper";
const SCREEN_WIDTH = Dimensions.get("window").width;
const TAB_BAR_WIDTH = (90 * SCREEN_WIDTH) / 100; //90% of screen
const TAB_AND_INDICATOR_WIDTH = TAB_BAR_WIDTH / 3;
const CAMERA_WIDTH = (10 * SCREEN_WIDTH) / 100; //10% of screen

// const Header = ({}) => {
//     const {Header} = styles;
//     return (
//         <View style={{flexDirection:'column'}}>
//             <Header>
//                 <Left>
//                     <Icon
//                         name='ios-menu'
//                         onPress={() =>
//                             this.props.navigation.navigate('DrawerOpen')}
//                     />
//                 </Left>
//             </Header>
//         </View>
//     )
// }

const Header = ({ onPress, title, subtitle }) => {
  return (
    <Appbar.Header style={{ backgroundColor: "#ad063b" }}>
      <Appbar.Action icon="menu" onPress={onPress} />
      <Appbar.Content title={title} subtitle={subtitle} />
      <Appbar.Action icon="magnify" onPress={this._handleSearch} />
      <Appbar.Action icon="dots-vertical" onPress={this._handleMore} />
    </Appbar.Header>
  );
};

const HeaderChat = ({ onPress, title, subtitle }) => {
  return (
    <Appbar.Header style={{ backgroundColor: "#ad063b" }}>
      <Appbar.Action icon="menu" onPress={onPress} />
      <Appbar.Content
        title={<Text> {title} </Text>}
        subtitle={subtitle}
        style={{ alignItems: "center" }}
      />
      <Appbar.Action />
    </Appbar.Header>
  );
};

const TopBarChat2 = ({ onPress, title, subtitle }) => {
  return (
    /*   <Appbar.Header style={{ height: "2%", backgroundColor: "" }}>
      <Appbar.Action icon="menu" onPress={onPress} />
      <Appbar.Content
        title={<Text> {title} </Text>}
        subtitle={subtitle}
        style={{ alignItems: "center" }}
      />
    </Appbar.Header>*/

    <View style={{ flexDirection: "row" }}>
      <View
        style={{
          width: CAMERA_WIDTH,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => alert("this is a camera!")}>
          <Appbar.Action icon="camera" style={{ height: 20, width: 20 }} />
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Appbar
          {...this.props}
          style={{
            width: TAB_BAR_WIDTH,
            elevation: 0,
            backgroundColor: "#115E54",
          }}
          indicatorStyle={{ width: TAB_AND_INDICATOR_WIDTH }}
          tabStyle={{ width: TAB_AND_INDICATOR_WIDTH }}
        />
      </View>
    </View>
  );
};

export { Header, HeaderChat, TopBarChat2 };
