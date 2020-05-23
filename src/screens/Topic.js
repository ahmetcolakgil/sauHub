import * as React from "react";
import { View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import { Header } from "../components/common/Header";

export default class Topic extends React.Component {
  render() {
    return (
      <View>
        <Header onPress={this.props.navigation.openDrawer} />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Details Screen</Text>
          <Button onPress={() => this.props.navigation.navigate("Home")}>
            {JSON.stringify(this.props.navigation.getParam("id", "NO-ID"))}
          </Button>
        </View>
        <View></View>
      </View>
    );
  }
}
