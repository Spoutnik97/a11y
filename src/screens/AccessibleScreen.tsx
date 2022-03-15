import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { CheckboxA11y } from "../components/a11y/Chekbox";
import Slider from "@react-native-community/slider";
import { useAtom } from "jotai";
import { isScreenVisibleAtom } from "../entities";

type Todo = {
  id: number;
  label: string;
  isDone: boolean;
};

export function AccessibleScreen() {
  const [isVisible] = useAtom(isScreenVisibleAtom);

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
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isVisible ? "#fff" : "#000" },
      ]}
    >
      <ScrollView>
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

        <Text style={styles.title}>Le compteur invisible</Text>

        <TouchableOpacity
          onPress={() => {
            setCounter((c) => c + 1);
          }}
          style={{
            padding: 12,

            borderRadius: 10,
            elevation: 2,
          }}
        >
          <Text style={{ fontSize: 18 }}>{"Incrementer compteur"}</Text>
        </TouchableOpacity>

        <Text
          accessibilityLiveRegion="polite" // only for Android
          style={{ fontSize: 25, color: "coral" }}
        >{`Compteur accessible: ${counter}`}</Text>

        <Text style={styles.title}>Le slider</Text>

        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor="red"
          accessibilityValue={{ min: 0, max: 10, now: sliderValue }}
          onValueChange={setSliderValue}
          maximumTrackTintColor="#000000"
        />
      </ScrollView>
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
