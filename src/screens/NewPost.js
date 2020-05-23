import * as React from "react";
import { View, Text, KeyboardAvoidingView, Picker, Image } from "react-native";
import { Button } from "react-native-paper";
import { Input, Header, Loading } from "../components/common";

export default class NewPostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postTitle: "",
      postContent: "",
      error: "",
      loading: false,
      default: "Kategori"
    };
  }
  render() {
    const { postTitle, postContent, error, loading } = this.state;
    const { form, section, errorTextStyle, combobox } = styles;

    return (
      <View style={{ flex: 1 }}>
        <Header
          onPress={this.props.navigation.openDrawer}
          title={"Yeni Konu"}
        />
        <View
          style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
        >
          <KeyboardAvoidingView
            behavior="padding"
            enabled
            style={{ width: "100%" }}
          >
            <View style={form}>
              <View style={{ alignSelf: "center" }}>
                <Image
                  source={{
                    uri:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsDVe3e4I1SuJOVnF3whxY3dem1oCG8oLdyaGXiT2ijm1sBIYbqQ&s"
                  }}
                  style={{ width: 100, height: 100 }}
                />
              </View>
              <View style={section}>
                <Input
                  label="Konu Başlığı"
                  value={postTitle}
                  onChangeText={postTitle => this.setState({ postTitle })}
                />
              </View>

              <View style={combobox}>
                <Picker
                  style={{ height: "100%", width: "100%" }}
                  selectedValue={this.state.default}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ language: itemValue })
                  }
                >
                  <Picker.Item label="Kategori" value="java" />
                  <Picker.Item label="Genel" value="java" />
                  <Picker.Item label="Ders" value="js" />
                </Picker>
              </View>

              <View style={section}>
                <Input
                  label="İçerik"
                  value={postContent}
                  multiline
                  numberOfLines={5}
                  onChangeText={postContent => this.setState({ postContent })}
                />
              </View>

              <Text style={errorTextStyle}>{error}</Text>

              <View style={{ width: "70%", alignSelf: "center" }}>
                {!loading ? (
                  <Button onPress={this.loginUser} mode="contained">
                    Paylaş
                  </Button>
                ) : (
                  <Loading size={"large"} />
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }
}

const styles = {
  form: {
    width: "100%"
  },
  section: {
    flexDirection: "row"
  },
  combobox: {
    alignSelf: "center",
    height: 50,
    width: "92%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#333333",
    backgroundColor: "#EBF5FB",
    borderRadius: 5
  },
  errorTextStyle: {
    alignSelf: "center",
    fontSize: 18,
    color: "red"
  }
};
