import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Checkbox } from "../components/Chekbox";
import Slider from "@react-native-community/slider";

type Todo = {
  id: number;
  label: string;
  isDone: boolean;
};

export function NonAccessibleScreen() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, label: "Faire les courses", isDone: false },
    { id: 2, label: "Prendre les billets d'avions", isDone: false },
    { id: 3, label: "Regarder la keynote", isDone: false },
    { id: 4, label: "Appeler maman", isDone: false },
  ]);

  const [counter, setCounter] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);

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
      <Text style={styles.title}>Todo Liste non accessible</Text>
      {todos.map((item) => (
        <View key={item.id} style={{ flexDirection: "row" }}>
          <Checkbox isChecked={item.isDone} onPress={() => toggleTodo(item)} />
          <Text style={{ marginLeft: 12 }}>{item.label}</Text>
        </View>
      ))}

      <Text style={styles.title}>Le compteur invisible</Text>

      <TouchableOpacity
        onPress={() => {
          setCounter((c) => c + 1);
        }}
      >
        <Text>{"Incrementer compteur"}</Text>
      </TouchableOpacity>

      <Text
        style={{ fontSize: 25, color: "chocolate" }}
      >{`Compteur non accessible: ${counter}`}</Text>

      <Text style={styles.title}>Le slider</Text>

      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={10}
        accessibilityValue={undefined}
        minimumTrackTintColor="red"
        onValueChange={setSliderValue}
        maximumTrackTintColor="#000000"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 24,
  },
  title: {
    fontSize: 24,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 24,
    marginTop: 48,
  },
});
