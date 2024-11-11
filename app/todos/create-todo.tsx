import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const storedTodos = await AsyncStorage.getItem("todos");
    if (storedTodos) setTodos(JSON.parse(storedTodos));
  };

  const saveTodos = async (newTodos: Todo[]) => {
    await AsyncStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const addTodo = () => {
    if (input.trim()) {
      const newTodo = {
        id: Date.now().toString(),
        text: input,
        completed: false,
      };
      const newTodos = [...todos, newTodo];
      saveTodos(newTodos);
      setInput("");
    }
  };

  const markComplete = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos(updatedTodos);
  };

  const deleteTodo = (id: string) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    saveTodos(filteredTodos);
  };

  const clearAllTodos = () => {
    saveTodos([]);
  };

  return (
    <SafeAreaView style={styles.content}>
      <ImageBackground
        source={require("../../assets/images/bg-2.jpeg")}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="add task"
            value={input}
            onChangeText={setInput}
          />
        </View>
        <TouchableOpacity onPress={addTodo}>
          <View style={styles.iconContainer}>
            <Icon name="add" size={30} color="black" style={styles.icon} />
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>todos</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.todos}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <View style={{ flex: 1 }}>
              <Text
                style={[styles.text, item.completed && styles.completedText]}
              >
                {item.text}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => markComplete(item.id)}
              style={[styles.actionIcon, { backgroundColor: "#D8E3E7" }]}
            >
              <Icon
                name="done"
                size={24}
                color={item.completed ? "#EEEDED" : "#fff"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteTodo(item.id)}
              style={[styles.actionIcon, { backgroundColor: "#fff" }]}
            >
              <Icon name="delete" size={24} color="#B8001F" />
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.footer}>
        <TouchableOpacity onPress={clearAllTodos}>
          <Text style={styles.footerButton}>Clear All</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Link href="/todos/completed-todo" asChild>
            <Text style={styles.footerButton}>View Completed</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: "#fff",
  },
  image: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  inputWrapper: {
    backgroundColor: "#fff",
    flex: 1,
    height: 50,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 20,
    paddingHorizontal: 30,
    elevation: 40,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    marginVertical: 10,
    flex: 1,
    fontSize: 16,
    paddingVertical: 5,
    paddingRight: 30,
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: "#fff",
    borderRadius: 30,
    elevation: 40,
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  icon: {
    position: "absolute",
    right: 10,
  },

  header: {
    fontSize: 20,
    color: "whitesmoke",
    fontFamily: "playFairBold",
    paddingLeft: 20,
    paddingBottom: 10,
  },
  listItem: {
    backgroundColor: "white",
    padding: 15,
    flexDirection: "row",
    elevation: 12,
    borderRadius: 15,
    marginVertical: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
    fontFamily: "playFairRegular",
  },
  actionIcon: {
    height: 30,
    width: 30,
    backgroundColor: "red",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    cursor: "pointer",
  },
  todos: {
    padding: 15,
    paddingBottom: 100,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  todoText: { fontSize: 16 },
  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 40,
  },
  footerButton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
  },
});

export default HomeScreen;
