import * as React from "react";
import axios from "axios";
import { View, SafeAreaView, FlatList } from "react-native";
import { Button } from "react-native-paper";
import { AsyncStorage } from "react-native";

import { Header } from "../components/common/Header";
import { CardList } from "../components/common/CardList";

export default class TopicListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: "",
      topicList: [],
      id: ""
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("id_token").then(value => {
      const id = this.props.navigation.getParam("id", "");
      this.setState({
        id: id,
        loading: false
      });
      const headers = {
        "auth-token": value
      };
      axios({
        method: "GET",
        url: "https://sauhub.herokuapp.com/api/post/category/" + id,
        headers: headers
      })
        .then(response => {
          console.log(response.data.data);
          this.setState({
            topicList: response.data.data,
            loading: false
          });
        })
        .catch(error => {
          console.log(error);
          this.setState({
            error: "Error retrieving data",
            loading: false
          });
        });
    });
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.userID !== prevProps.userID) {
      this.fetchData(this.props.userID);
    }
  }

  render() {
    const { topicList } = this.state;
    return (
      <View style={{ flat: 1 }}>
        <Header
          onPress={this.props.navigation.openDrawer}
          title={"Topic List"}
          subtitle={this.props.navigation.getParam("id", "")}
        />

        <View style={{ flat: 1 }}>
          <Button onPress={() => this.props.navigation.navigate("Home")}>
            Open new topic
          </Button>
        </View>

        <SafeAreaView style={{ flat: 3 }}>
          <FlatList
            contentContainerStyle={{ paddingBottom: 300 }}
            data={topicList}
            renderItem={({ item }) => (
              <CardList
                title={item.name}
                onPress={() =>
                  this.props.navigation.navigate("Topic", {
                    id: item.id
                  })
                }
              />
            )}
            keyExtractor={item => item.id.toString()}
          />
        </SafeAreaView>
      </View>
    );
  }
}
