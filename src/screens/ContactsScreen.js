// Home screen
import React, { Component } from "react";
//import react in our code.
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
//import all the components we are going to use.
import { ListItem } from "react-native-elements";
import {
  FAB,
  Portal,
  Provider,
  Dialog,
  Button,
  Paragraph,
} from "react-native-paper";
import { Input} from "../components/common";
import axios from "axios";
import { AsyncStorage } from "react-native";
import SocketIOClient from 'socket.io-client';


const Item = ({ title }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default class ContactsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.socket = this.props.screenProps.socket;
  }

  state = {
    open: false,
    visible: false,
    text: "",
    name: "",
    time: "",

    contacts: [],
    user: {},
    error: "",
    loading: false,
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser() {
    this.setState({ error: "", loading: true });
    // NOTE Post to HTTPS only in production
    AsyncStorage.getItem("id_token").then(value => {
      const headers = {
        "auth-token": value
      };
      axios({
        method: "GET",
        url: "http://192.168.1.102:8080/api/user/getCurrentUser",
        headers: headers
      })
        .then((response) => {
          this.setState({ user: response.data});
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data);
        })
        .finally(() => {
          this.setState({ loading: false });
          this.joinServer();
        });
    });
  }

  joinServer() {
    const { user } = this.state;
    
    this.socket.on('loggedIn', (users) => {         
      users.forEach(element => {
        if (element.isOnline) {
          element.status = 'success';
          element.statusContext = 'Çevrimiçi';
        } else {
          element.status = 'error';
          element.statusContext = 'Çevrimdışı';
        }

        if (user.contacts.find((c) => c._id === element._id)) {
          this.setState({ contacts: [...this.state.contacts, element] })
        }
      });

      this.socket.emit('newUser', user);
    });
    this.listen();
  };

  listen() {
    this.socket.on('userOnline', (user) => {

    });
    this.socket.on('userLeft', (user) => {
 
    });
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
      title={item.username}
      titleStyle={{ fontSize: 18 }}
      containerStyle={{ display: "flex", alignItems: "center" }}
      subtitle={item.statusContext}
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
      onPress={this.goToMessageScreen}
      bottomDivider
      chevron
    />
  );

  keyExtractor = (item, index) => index.toString();

  _onStateChange = ({ open }) => this.setState({ open });
  render() {
    const { open, text, contacts, visible } = this.state;
    const { section } = styles;
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    this.time = hours + ":" + min;

    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView>
          <FlatList
            data={contacts}
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
            <Dialog visible={visible} onDismiss={this._hideDialog}>
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
