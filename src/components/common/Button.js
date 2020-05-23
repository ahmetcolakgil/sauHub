import React from "react";
import { View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";

const Button = ({ onPress, children }) => {
  const { button, text } = styles;
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableRipple onPress={onPress} style={button}>
        <Text style={text}>{children}</Text>
      </TouchableRipple>
    </View>
  );
};

const styles = {
  text: {
    alignSelf: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    paddingTop: 10,
    paddingBottom: 10
  },
  button: {
    flex: 1,
    borderWidth: 3,
    borderColor: "#0066FF",
    backgroundColor: "#0099FF",
    borderRadius: 25,
    marginTop: 5,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 5
  }
};

export { Button };
