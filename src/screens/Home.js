import * as React from "react";
import { View, Image, Text } from "react-native";
import { Header } from "../components/common/Header";
import { Button, Banner } from "react-native-paper";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: "",
      visible: true,
      category: [],
    };
  }

  static navigationOptions = {
    title: "Home",
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header onPress={this.props.navigation.openDrawer} />
        <Banner
          visible={this.state.visible}
          actions={[
            {
              label: "HOŞBULDUM",
              color: "#ad063b",
              onPress: () => this.setState({ visible: false }),
            },
          ]}
          icon={({ size }) => (
            <Image
              source={require("../../assets/logo.png")}
              style={{
                width: size,
                height: size,
              }}
            />
          )}
        >
          SAÜ HUB'A HOŞGELDİNİZ !
        </Banner>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View
            style={{ flex: 4, alignItems: "center", justifyContent: "center" }}
          >
            <Image
              style={{ width: 200, height: 200 }}
              source={require("../../assets/logo.png")}
            />
          </View>
          <View
            style={{
              flex: 4,
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Button
              mode="contained"
              onPress={() => this.props.navigation.navigate("Category")}
              style={{
                backgroundColor: "#ad063b",
                borderRadius: 5,
                marginBottom: 10,
                width: "70%",
              }}
            >
              Kategorileri Görüntüle
            </Button>
            <Button
              mode="contained"
              onPress={() => this.props.navigation.navigate("NewPost")}
              style={{
                backgroundColor: "#ad063b",
                borderRadius: 5,
                marginBottom: 10,
                width: "70%",
              }}
            >
              Yeni Konu Aç
            </Button>
          </View>
          <View style={{ alignItems: "center", justifyContent: "flex-end" }}>
            <Button
              color="#ad063b"
              onPress={this.props.screenProps.deleteJWT}
              style={{ marginBottom: 20, width: "70%" }}
            >
              Çıkış Yap
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
