import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CheckboxA11y } from "./src/components/a11y/Chekbox";
import { Checkbox } from "./src/components/Chekbox";

const todoList = [
  "Faire les courses",
  "Prendre les billets d'avions",
  "Regarder la keynote",
  "Appeler maman",
];

type Todo = {
  id: number;
  label: string;
  isDone: boolean;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, label: "Faire les courses", isDone: false },
    { id: 2, label: "Prendre les billets d'avions", isDone: false },
    { id: 3, label: "Regarder la keynote", isDone: false },
    { id: 4, label: "Appeler maman", isDone: false },
  ]);

  const toggleTodo = (item: Todo) => {
    const itemIndex = todos.findIndex((todo) => todo.id === item.id);
    if (itemIndex > -1) {
      const newTodos = [...todos];
      newTodos.splice(itemIndex, 1, {
        ...newTodos[itemIndex],
        isDone: !newTodos[itemIndex].isDone,
      });
      setTodos(newTodos);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, alignItems: "flex-start" }}>
        <Text style={styles.title}>Todo Liste non accessible</Text>
        {todos.map((item) => (
          <View key={item.id} style={{ flexDirection: "row" }}>
          <Checkbox isChecked={item.isDone} onPress={() => toggleTodo(item)} />
            <Text style={{ marginLeft: 12 }}>{item.label}</Text>
          </View>
        ))}

        <Text style={styles.title}>Todo Liste accessible</Text>
        {todos.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={{ flexDirection: "row", alignItems: "center" }}
            accessibilityLabel={item.label}
            accessibilityHint={"Appuyer pour marquer comme fait"}
            accessibilityState={{ checked: item.isDone }}
            onPress={() => toggleTodo(item)}
          >
          <CheckboxA11y isChecked={item.isDone} disabled />
            <Text style={{ marginLeft: 12, fontSize: 18 }}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 24,
    marginTop: 48,
  },
});
