// Home screen
import React, { useState } from "react";
//import react in our code.
import {
  Text,
  Platform,
  View,
  StyleSheet,
  TextInput,
  TextInputProps,
} from "react-native";
import { IconButton } from "react-native-paper";
import { HeaderChat } from "../components/common/Header";
import {
  GiftedChat,
  Bubble,
  Send,
  InputToolbar,
} from "react-native-gifted-chat";
//import all the components we are going to use.

export default class MessageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.text = {};
    this.state = { messages: [] };
    this.handleSend = this.handleSend.bind(this);
  }
  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 0,
          text: "New room created.",
          createdAt: new Date().getTime(),
          system: true,
        },
        // example of chat message
        {
          _id: 1,
          text: "Selam Fıstık!",
          createdAt: new Date().getTime(),
          user: {
            _id: 2,
            name: "Güzellik",
          },
        },
      ],
    });
  }
  renderBubble(props) {
    return (
      // Step 3: return the component
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Here is the color change
            backgroundColor: "#ad063b",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  }
  renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon="send-circle" size={36} color="#ad063b" />
        </View>
      </Send>
    );
  }
  scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon="chevron-double-down" size={36} color="#ad063b" />
      </View>
    );
  }
  handleSend(newMessage = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(this.state.messages, newMessage),
      };
    });
  }
  renderInputToolbar(props) {
    return (
      /*  <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Bir mesaj yaz"
          textInputProps={null}
          multiline={true}
          disableComposer={false}
          textInputAutoFocus={false}
          keyboardAppearance="default"
        />
        <View style={{ flex: 1 }}>
          <Send {...props} style={{ paddingLeft: 1, paddingRight: 2 }}>
            <View style={styles.sendingContainer}>
              <IconButton
                icon="send-circle"
                onPress={(newMessage) => this.handleSend(newMessage)}
                size={56}
                color="#ad063b"
              />
            </View>
          </Send>
        </View>
      </View>*/
      <InputToolbar {...props}></InputToolbar>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderChat
          title="Message"
          onPress={this.props.navigation.openDrawer}
        />

        <GiftedChat
          messages={this.state.messages}
          onSend={(newMessage) => this.handleSend(newMessage)}
          user={{ _id: 1 }}
          renderBubble={this.renderBubble}
          placeholder="Bir mesaj yaz"
          showUserAvatar
          alwaysShowSend
          renderSend={this.renderSend}
          scrollToBottom
          scrollToBottomComponent={this.scrollToBottomComponent}
          renderAvatarOnTop
          renderUsernameOnMessage
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomComponentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    height: 44,
  },
  textInput: {
    flex: 5,
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#b2b2b2",
    borderRadius: 20,
    ...Platform.select({
      web: {
        paddingTop: 6,
        paddingLeft: 4,
      },
    }),
    marginTop: Platform.select({
      ios: 6,
      android: 0,
      web: 6,
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3,
      web: 4,
    }),
  },
});
