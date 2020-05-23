// Home screen
import React, { Component } from "react";
//import react in our code.
import { Text, View } from "react-native";
import { HeaderChat } from "../components/common/Header";
//import all the components we are going to use.

export default class MessageScreen extends React.Component {
  render() {
    return (
      <View>
        <HeaderChat
          title="Message"
          onPress={this.props.navigation.openDrawer}
        />
        <Text>Message Screen</Text>
      </View>
    );
  }
}
