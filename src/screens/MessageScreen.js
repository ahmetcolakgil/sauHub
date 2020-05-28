import React from 'react';
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
import axios from "axios";
import { AsyncStorage } from "react-native";

export default class MessageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.text = {};
    this.state={
      messages: [],
      user: {},
      targetUser: {
        _id: "5ecee022f46ac358788e7482",
        username: "samil",
      }
    },

    this.socket = this.props.screenProps.socket;
    this.handleSend = this.handleSend.bind(this);
  }
  componentDidMount() {
    this.fetchUser();
  }

  fetchMessageHistory() {
    const { user, targetUser } = this.state;
    const params = {
      messageFrom: {_id: user._id, username: user.username },
      messageTo: targetUser,
      userSocket: user.socket,
    };
    this.socket.emit('joinPM', (params));
    this.socket.on('pmMessages', (data) => {
      data.forEach(element => {
        const messageHistory = [];
        messageHistory.push({
          _id: element._id,
          text: element.content,
          createdAt: element.dateSend,
          user: {
            _id: element.messageFrom._id,
            name: element.messageFrom.username,
          },
        });
        this.setState((previousState) => ({
          messages: GiftedChat.append(previousState.messages, messageHistory),
        }));
      });
      });
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
          console.log(error.response.data);
        })
        .finally(() => {
          this.setState({ loading: false });
          this.fetchMessageHistory();
          this.onReceivedMessage();
        });
    });
  }

  onReceivedMessage(){
    this.socket.on('getMessage', (data) => {
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, data),
      }));
    });
  }

  handleSend(newMessage = []) {    
    const { user, targetUser } = this.state;
      const data = {
        messageFrom: { _id: user._id, username: user.username },
        messageTo: targetUser,
        content: newMessage[0].text,
      };
    this.socket.emit('sendMessage', (data));      
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(this.state.messages, newMessage),
      };
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

  renderInputToolbar(props) {
    return (
      <InputToolbar {...props}></InputToolbar>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderChat
          title="Message"
          openMenu={this.props.navigation.openDrawer}
        />

        <GiftedChat
          messages={this.state.messages}
          onSend={(newMessage) => this.handleSend(newMessage)}
          user={{ _id: this.state.user._id, name: this.state.user.username }}
          renderBubble={this.renderBubble}
          placeholder="Bir mesaj yaz"
          showUserAvatar
          alwaysShowSend
          renderSend={this.renderSend}
          scrollToBottom
          scrollToBottomComponent={this.scrollToBottomComponent}
          renderAvatarOnTop
          renderUsernameOnMessage
          forceGetKeyboardHeight
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
