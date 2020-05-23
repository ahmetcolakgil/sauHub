import * as React from "react";
import { View, SafeAreaView, FlatList, Text } from "react-native";
import { Header } from "../components/common/Header";
import { CardList } from "../components/common/CardList";
import { Loading } from "../components/common/Loading";
import axios from "axios";
import { AsyncStorage } from "react-native";

export default class CategoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: "",
      category: []
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("id_token").then(value => {
      const headers = {
        "auth-token": value
      };
      axios({
        method: "GET",
        url: "https://sauhub.herokuapp.com/api/category/",
        headers: headers
      })
        .then(response => {
          this.setState({
            category: response.data.category,
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
  render() {
    const { container } = styles;
    const { loading, category } = this.state;
    if (loading) {
      return (
        <View style={container}>
          <Loading size={"large"} />
        </View>
      );
    } else {
      return (
        <View>
          <Header onPress={this.props.navigation.openDrawer} />
          <SafeAreaView>
            <FlatList
              contentContainerStyle={{ paddingBottom: 200 }}
              data={category}
              renderItem={({ item }) => (
                <CardList
                  image={"https://picsum.photos/700"}
                  title={item.name}
                  description={item.categoryDescription}
                  onPress={() =>
                    this.props.navigation.navigate("TopicList", {
                      id: item.id,
                      name: item.name
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
}

const styles = {
  container: {
    flex: 1,
    alignItem: "center"
  }
};
