import * as React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Header } from "../components/common/Header";
import { Ionicons } from "@expo/vector-icons";

posts = [
  {
    id: "1",
    name: "Ahmet McQueen",
    text:
      "Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır.",
    category: "Eğlence",
    avatar: require("../../assets/logo.png"),
    image: require("../../assets/leclerc.png")
  },
  {
    id: "2",
    name: "McQueen",
    text:
      "Lorem Ipsum pasajlarının birçok çeşitlemesi vardır. Ancak bunların büyük bir çoğunluğu mizah katılarak veya rastgele sözcükler eklenerek değiştirilmişlerdir. Eğer bir Lorem Ipsum pasajı kullanacaksanız, metin aralarına utandırıcı sözcükler gizlenmediğinden emin olmanız gerekir.",
    category: "Spor",
    avatar: require("../../assets/logo.png"),
    image: require("../../assets/leclerc.png")
  },
  {
    id: "3",
    name: "İbrahim Turan",
    text:
      "Yaygın inancın tersine, Lorem Ipsum rastgele sözcüklerden oluşmaz. Kökleri M.Ö. 45 tarihinden bu yana klasik Latin edebiyatına kadar uzanan 2000 yıllık bir geçmişi vardır.",
    category: "Siyaset",
    avatar: require("../../assets/logo.png"),
    image: require("../../assets/leclerc.png")
  }
];

export default class ProfileScreen extends React.Component {
  renderPost = post => {
    return (
      <View style={styles.feedItem}>
        <Image source={post.avatar} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View>
              <Text style={styles.name}>{post.name}</Text>
              <Text style={styles.category}>{post.category}</Text>
            </View>

            <Ionicons name="ios-more"></Ionicons>
          </View>
          <Text style={styles.post}>{post.text}</Text>
          <Image
            source={post.image}
            style={styles.postImage}
            resizeMode="cover"
          />
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="ios-heart-empty"
              size={24}
              color="#73788B"
              style={{ marginRight: 16 }}
            />
            <Ionicons name="ios-chatboxes" size={24} color="#73788B" />
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title="Konular" onPress={this.props.navigation.openDrawer} />
        <FlatList
          style={styles.feed}
          data={posts}
          renderItem={({ item }) => this.renderPost(item)}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4"
  },
  feed: {
    marginHorizontal: 16
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#58575C"
  },
  category: {
    fontSize: 12,
    alignItems: "center",
    backgroundColor: "#C4C6CE",
    color: "#FFF",
    borderRadius: 5,
    fontWeight: "500",
    marginTop: 2
  },
  posts: {
    marginTop: 16,
    fontSize: 14,
    color: "#58575C"
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16
  }
});
