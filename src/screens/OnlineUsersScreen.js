// Home screen
import React, { Component } from "react";
//import react in our code.
import { Text, View, StyleSheet, SafeAreaView, FlatList } from "react-native";
//import all the components we are going to use.
import { ListItem } from "react-native-elements";

const DATA = [
  {
    name: "Şamil",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    status: "success",
    statusConntext: "Müsait",
  },
  {
    name: "Ahmet",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    status: "success",
    statusConntext: "Müsait",
  },
  {
    name: "Şamil",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    status: "error",
    statusConntext: "Meşgul",
  },
  {
    name: "Ahmet",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    status: "warning",
    statusConntext: "Dışarıda",
  },
];

export default class OnlineUsersScreen extends React.Component {
  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      titleStyle={{ fontSize: 18 }}
      subtitle={item.subtitle}
      subtitleStyle={{ fontSize: 14, overflow: "hidden" }}
      leftAvatar={{
        size: "large",
        style: { width: 49, height: 49 },
        source: { uri: item.avatar_url },
      }}
      rightElement={
        <View style={{ width: 60 }}>
          <Text
            style={{
              opacity: 0.2,
              textAlign: "center",
              backgroundColor: "#00000073", //"#B4B4B4",
              borderRadius: 7,
            }}
          >
            {item.statusConntext}
          </Text>
        </View>
      }
      badge={{
        status: item.status,
        containerStyle: {
          position: "absolute",
          left: 52,
          bottom: 5,
          height: 20,
        },
        badgeStyle: {
          borderRadius: 10,
          width: 12,
          height: 12,
        },
      }}
      bottomDivider
      chevron
    />
  );

  keyExtractor = (item, index) => index.toString();
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={DATA}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        ></FlatList>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  form: {
    width: "100%",
  },
  section: {
    flexDirection: "row",
  },
  combobox: {
    alignSelf: "center",
    height: 50,
    width: "92%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#333333",
    backgroundColor: "#EBF5FB",
    borderRadius: 5,
  },
  errorTextStyle: {
    alignSelf: "center",
    fontSize: 18,
    color: "red",
  },
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
