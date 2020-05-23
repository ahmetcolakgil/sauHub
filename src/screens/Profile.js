import * as React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
//import { Button } from "react-native-paper";
import { Header } from "../components/common/Header";
import { Button, Banner } from "react-native-paper";

export default class ProfileScreen extends React.Component {
  state = {
    user: {
      name: "Ahmet Çolakgil"
    }
  };

  render() {
    return (
      // <View style={{flex:1}}>
      // <Header title="Profil" onPress={this.props.navigation.openDrawer} />
      // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      //   <Text>Details Screen</Text>
      //   <Button
      //     onPress={() => this.props.navigation.navigate('Home')}
      //   >
      //     {JSON.stringify(this.props.navigation.getParam('id', 'NO-ID'))}
      //   </Button>
      // </View>
      // </View>

      <View style={{ flex: 1 }}>
        <Header title="Profil" onPress={this.props.navigation.openDrawer} />
        <View style={styles.container}>
          <View style={{ marginTop: 64, alignItems: "center" }}>
            <View style={styles.avatarContainer}>
              <Image
                style={styles.avatar}
                source={require("../../assets/logo.png")}
              />
            </View>
            <Text style={styles.name}>{this.state.user.name}</Text>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statAmount}>15</Text>
              <Text style={styles.statTitle}>Konu</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statAmount}>35</Text>
              <Text style={styles.statTitle}>Beğeni</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statAmount}>66</Text>
              <Text style={styles.statTitle}>Yorum</Text>
            </View>
          </View>
          <View style={{ alignItems: "center", justifyContent: "flex-end" }}>
            <Button
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  avatarContainer: {
    shadowColor: "#151734",
    shadowRadius: 30,
    shadowOpacity: 0.4
  },
  avatar: {
    width: 136,
    height: 136,
    borderRadius: 68
  },
  name: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: "600",
    color: "#58575C"
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 32
  },
  stat: {
    alignItems: "center",
    flex: 1
  },
  statAmount: {
    color: "#58575C",
    fontSize: 16,
    fontWeight: "500"
  },
  statTitle: {
    color: "#C3C5CD",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4
  }
});
