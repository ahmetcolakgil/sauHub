import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerNavigatorItems } from "react-navigation-drawer";

export default Sidebar = props => (
  <ScrollView>
    <ImageBackground
      source={require("../../../assets/background.png")}
      style={{ width: undefined, padding: 16, paddingTop: 48 }}
    >
      <Image
        source={require("../../../assets/logo.png")}
        style={styles.profile}
      />
      <Text style={styles.name}>Şehit Şamil GÖKMEN</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.konu}>Açılan Konu : 6 </Text>
        <MaterialCommunityIcons name="book-open" size={16} color="#58575C" />
      </View>
    </ImageBackground>
    <View style={styles.container}>
      <DrawerNavigatorItems {...props} />
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profile: {
    width: 80,
    height: 80
    // borderRadius: 40,
    // borderWidth: 3,
    // borderColor: "#FFFFFF"
  },
  name: {
    color: "#58575C",
    fontSize: 20,
    fontWeight: "800",
    marginVertical: 8
  },
  konu: {
    color: "#58575C",
    fontSize: 13,
    //    fontWeight: "800",
    marginRight: 4
  }
});
