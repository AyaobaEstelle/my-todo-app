import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

const CompletedTodos = () => {
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    loadCompletedTodos();
  }, []);

  const loadCompletedTodos = async () => {
    const storedTodos = await AsyncStorage.getItem("todos");
    if (storedTodos) {
      const todos = JSON.parse(storedTodos);
      setCompletedTodos(todos.filter((todo: Todo) => todo.completed));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/background.jpeg")}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.header}>Completed Todos</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.todos}
        data={completedTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  content: {
    paddingTop: 10,
  },
  image: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
  },
  header: {
    padding: 10,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    fontFamily: "playFairBold",
  },
  todos: {
    padding: 10,
    paddingBottom: 100,
  },

  listItem: {
    backgroundColor: "white",
    padding: 15,
    elevation: 12,
    borderRadius: 15,
    marginVertical: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#B8001F",
    fontFamily: "InterBold",
    textDecorationLine: "line-through",
  },
});

export default CompletedTodos;
