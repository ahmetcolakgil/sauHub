import React, { Component } from "react";
import { Text, View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { ActivityIndicator, Colors } from 'react-native-paper';
import { ListItem } from "react-native-elements";
import axios from "axios";
import { AsyncStorage } from "react-native";


export default class OnlineUsersScreen extends React.Component {
  state = {
    groups: [],
    error: "",
    loading: false,
  }

  fetchGroups() {
    this.setState({ error: "", loading: true });

    // NOTE Post to HTTPS only in production
    AsyncStorage.getItem("id_token").then(value => {
      const headers = {
        "auth-token": value
      };
      axios({
        method: "GET",
        url: "http://192.168.1.102:8080/api/group/getGroups",
        headers: headers
      })
        .then((response) => {
          this.setState({ groups: response.data});
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data);
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    });
  }

  componentDidMount() {
    this.fetchGroups();
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.title}
      titleStyle={{ fontSize: 18 }}
      subtitle={item.description}
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
            {item.members.length}
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
    const { groups, loading } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={groups}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        >
          <ActivityIndicator animating={loading} color={Colors.red800} />
        </FlatList>
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
