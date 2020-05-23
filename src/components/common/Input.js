import React, { Fragment } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Text } from "react-native-paper";

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  multiline,
  numberOfLines,
}) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Fragment>
        <TextInput
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          autoCorrect={false}
          multiline={multiline}
          numberOfLines={numberOfLines}
          style={styles.inputStyle}
          label={label}
          mode={"outlined"}
        />
      </Fragment>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  inputStyle: {
    backgroundColor: "#fcdfdf", //#EBF5FB
    borderColor: "#ad063b", //#0099FF
    marginRight: 15,
    marginLeft: 15,
    fontSize: 18,
    flex: 4,
  },
});

export { Input };
