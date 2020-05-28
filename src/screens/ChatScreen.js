import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';
import SocketIOClient from 'socket.io-client';
import axios from "axios";
import { AsyncStorage } from "react-native";

export default class ChatScreen extends Component {

  constructor(props){
    super(props)

    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.getUserId = this.getUserId.bind(this);
    this.onSend = this.onSend.bind(this);
    
    this.state={
      messages:[
        {
          _id: 1, // Mesaj ID'si
          text: 'Hello developer', // Mesaj Text
          createdAt: new Date(), // Mesajın yaratıldığı zaman.
          user: {
            _id: 2, //user id
            name: 'React Native', // user name
            //avatar image path
          },
        },
        {
          _id: 2, // Mesaj ID'si
          text: 'Hello user', // Mesaj Text
          createdAt: new Date(), // Mesajın yaratıldığı zaman.
          user: {
            _id: 3, //user id
            name: 'React mat', // user name
            //avatar image path
          },
        },
    ],
      user: {},
    }

    this.socket = SocketIOClient('http://192.168.1.102:8080'); //This should be your ip or local 
    this.socket.on('messages', this.onReceivedMessage);
    this.socket.on('userId', this.getUserId);
  }

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
        });
    });
  }

  getUserId(data){
    const { userId } = data;

    this.setState({userId});
  }

  onReceivedMessage(mes){
    const arrMes = [{...mes.messages}];
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, arrMes),
    }));

    this.socket.on('getMessage', (data) => {
      this.messages.push(data);
      this.scrollToEnd();
    });
  }

  onSend(messages){
    const mes = messages[0];    
    // const { user } = this.state;
    // mes['username'] = user.username;
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, mes),
    }));
   
    // this.socket.emit('messages',mes)
  }

  // start(){
  //   const { username } = this.state;
  //   if(username && username.length > 3){
  //     this.setState({isReady:true});
  //   }else{
  //     alert('Username is min 4 characters')
  //   }
  // }

  // renderUsernameView(){
  //   return(
  //     <View style={ styles.container }>
  //       <View style={ styles.textInputContainer }>
  //         <TextInput
  //           style={styles.textInput}
  //           placeholder={'Username'}
  //           onChangeText={(username) => this.setState({username})}
  //           underlineColorAndroid={'transparent'}
  //           value={this.state.text}
  //         />
  //       </View>
  //       <TouchableOpacity onPress={ this.start } style={styles.button}>
  //         <Text style={ styles.buttonText }>
  //           Let's Start!
  //         </Text>
  //       </TouchableOpacity>
  //     </View>
  //   )
  // }

  render() {
    const { user } = this.state;
    return (
      <GiftedChat
        forceGetKeyboardHeight
        messages={this.state.messages}
        onSend={this.onSend}
        onPressAvatar={ (user)=> alert(user.name)}
        user={{id:user._id, name: user.username}}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textInput:{
    height:50,
    alignSelf:'stretch',
    textAlign:'center',
  },
  textInputContainer:{
    borderBottomWidth:StyleSheet.hairlineWidth,
    borderBottomColor:'rgba(0,0,0,0.2)',
    alignSelf:'stretch',
    marginHorizontal:40,
  },
  button:{
    alignSelf:'stretch',
    height:50,
    marginTop:40,
    marginBottom:40,
    marginHorizontal:50,
    backgroundColor:'#778DA9',
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
  },
  buttonText:{
    color:'white',
    fontWeight:'400',
    fontSize:18,
  }
});