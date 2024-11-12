import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, StyleSheet } from "react-native";
import { Link, useNavigation } from "expo-router";
import { useEffect } from "react";

export default function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background-img.jpeg")}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.header}>
        <Text style={styles.headerText}>Ayaoba&#39;s place</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>
          Remember, progress isn&#39;t about perfection, it&#39;s about
          starting. Every line of code, no matter how small, brings you closer
          to your goals. You have the skills; now give yourself the chance to
          see what you&#39;re capable of. Start now, even if it&#39;s just a
          little. Your future you will thank you for it!
        </Text>
        <TouchableOpacity style={styles.contentButton}>
          <Link href="/todos/create-todos">
            <Text style={styles.contentButtonText}>create task</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  header: {
    paddingBottom: 10,
    alignItems: "center",
    paddingTop: 20,
  },
  headerText: {
    fontFamily: "PlayFairBold",
    fontWeight: "bold",
    fontSize: 25,
    paddingHorizontal: 20,
    color: "#fff",
  },
  content: {
    paddingTop: 10,
    alignItems: "center",
  },
  contentText: {
    fontFamily: "PlayFairItalic",
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
    marginHorizontal: 20,
    paddingBottom: 20,
  },
  contentButton: {
    backgroundColor: "#133E87",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    cursor: "pointer",
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  contentButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "SpaceMono",
    cursor: "pointer",
  },
  image: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
  },
});
