import * as React from "react";
import { View, Text, KeyboardAvoidingView, Image } from "react-native";
import { Button, Dialog, Portal, Provider } from "react-native-paper";
import { Input, Header, Loading } from "../components/common";

export default class PostReplyScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postTitle: "",
      postContent: "",
      error: "",
      loading: false,
      visible: false
    };
  }

  _showDialog = () => this.setState({ visible: true });

  _hideDialog = () => this.setState({ visible: false });

  render() {
    const { postTitle, postContent, error, loading } = this.state;
    const { form, section, errorTextStyle, combobox } = styles;

    return (
      <View style={{ flex: 1 }}>
        <Header onPress={this.props.navigation.openDrawer} title={"Cevapla"} />
        <Button onPress={this._showDialog}>Show Dialog</Button>
        <Provider>
          <Portal>
            <Dialog visible={this.state.visible} onDismiss={this._hideDialog}>
              <Dialog.Title>Cevapla</Dialog.Title>
              <Dialog.Content>
                <KeyboardAvoidingView
                  behavior="padding"
                  enabled
                  style={{ width: "100%" }}
                >
                  <View style={{ alignSelf: "center" }}>
                    <Image
                      source={{
                        uri:
                          "https://cdn2.iconfinder.com/data/icons/writing-signs/48/bl_1696_Plus_add_pencil_write_edit-512.png"
                      }}
                      style={{ width: 50, height: 50 }}
                    />
                  </View>

                  <View style={section}>
                    <Input
                      label="Cevabınız"
                      value={postContent}
                      multiline
                      numberOfLines={5}
                      onChangeText={postContent =>
                        this.setState({ postContent })
                      }
                    />
                  </View>

                  <Text style={errorTextStyle}>{error}</Text>

                  <View style={{ width: "70%", alignSelf: "center" }}>
                    {!loading ? (
                      <Button onPress={this.loginUser} mode="contained">
                        Gönder
                      </Button>
                    ) : (
                      <Loading size={"large"} />
                    )}
                  </View>
                </KeyboardAvoidingView>
              </Dialog.Content>
            </Dialog>
          </Portal>
        </Provider>
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
