// Home screen
import React, { Component } from "react";
//import react in our code.
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ListView,
  TouchableOpacity,
  Alert,
} from "react-native";
//import all the components we are going to use.
import { ListItem } from "react-native-elements";
import {
  BottomNavigation,
  FAB,
  Portal,
  Provider,
  Dialog,
  Button,
  Paragraph,
  TextInput,
  Headline,
  List,
} from "react-native-paper";
import { Input, Header, Loading } from "../components/common";
import { Actions as NavigationActions } from "react-native-router-flux";
import { NavigationContainer } from "@react-navigation/native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import MessageScreen from "./MessageScreen";

const DATA = [
  {
    name: "Şamil",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "asdfghjklş",
  },
  {
    name: "Ahmet",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "şlkjhgfd",
  },
  {
    name: "Şamil",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "asdfghjklş",
  },
  {
    name: "Ahmet",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "şlkjhgfd",
  },
  {
    name: "Şamil",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "asdfghjklş",
  },
  {
    name: "Ahmet",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "şlkjhgfd",
  },
  {
    name: "Şamil",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "asdfghjklş",
  },
  {
    name: "Ahmet",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "şlkjhgfd",
  },
  {
    name: "Şamil",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "asdfghjklş",
  },
  {
    name: "Ahmet",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "şlkjhgfdasdfhjlşsdfhjklşdfghjldfghjlşdfghjlşdfghjlşfghjlş.fghjk",
  },
];

const Item = ({ title }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default class FirstPage extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    open: false,
    visible: false,
    text: "",
    name: "",
    time: "",
  };
  goToMessageScreen = () => {
    alert("123");
  };

  _showDialog = () => {
    console.log("11");
    this.setState({ visible: true });
  };

  _hideDialog = () => {
    this.setState({ visible: false });
    this.setState({ text: "" });
  };

  renderItem = ({ item }) => (
    <ListItem
      Component={TouchableOpacity}
      title={item.name}
      titleStyle={{ fontSize: 18 }}
      containerStyle={{ display: "flex", alignItems: "center" }}
      subtitle={item.subtitle}
      subtitleStyle={{ fontSize: 14, overflow: "hidden" }}
      leftAvatar={{
        size: "large",
        style: { width: 49, height: 49 },
        source: { uri: item.avatar_url },
      }}
      rightElement={
        <Text
          style={{ height: 35, right: -10, fontSize: 12, color: "#00000073" }}
        >
          {this.time}
        </Text>
      }
      onPress={this.goToMessageScreen}
      bottomDivider
      chevron
    />
  );

  keyExtractor = (item, index) => index.toString();

  _onStateChange = ({ open }) => this.setState({ open });
  render() {
    const { open } = this.state;
    const { text } = this.state;
    const { section } = styles;
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    this.time = hours + ":" + min;

    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView>
          <FlatList
            data={DATA}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          ></FlatList>
        </SafeAreaView>
        <Provider>
          <Portal>
            <FAB.Group
              fabStyle={{ backgroundColor: "#ad063b" }}
              open={open}
              icon={open ? "plus" : "plus"}
              actions={[
                //{ icon: "plus", onPress: () => console.log("Pressed add") },
                {
                  icon: "account-group",
                  label: "Haydi Grupla Mesajla",
                  onPress: () => this._showDialog(),
                },
                {
                  icon: "message",
                  label: "Haydi Mesajla",
                  onPress: () => alert("heyy bire bir gel hadii"),
                },
              ]}
              onStateChange={this._onStateChange}
              onPress={() => {
                if (open) {
                  // do something if the speed dial is open
                }
              }}
            />
            <Dialog visible={this.state.visible} onDismiss={this._hideDialog}>
              <View style={{ alignSelf: "center" }}>
                <Dialog.Title>Group Oluşturma</Dialog.Title>
              </View>
              <Dialog.Content>
                <View style={{ alignSelf: "center" }}>
                  <Paragraph>Haydi bir grup ismi ateşlee</Paragraph>
                </View>
                <View style={section}>
                  <Input
                    label="Grup İsmi"
                    value={text}
                    onChangeText={(text) => this.setState({ text })}
                  />
                </View>

                <View style={{ alignSelf: "center" }}>
                  <Button
                    style={{ backgroundColor: "#ad063b" }}
                    onPress={this._hideDialog}
                    mode="contained"
                  >
                    Oluştur
                  </Button>
                </View>
              </Dialog.Content>
            </Dialog>
          </Portal>
        </Provider>
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
