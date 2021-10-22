import * as React from "react";
import { Text, View } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AccessibleScreen } from "../screens/AccessibleScreen";
import { NonAccessibleScreen } from "../screens/NonAccessibleScreen";

const Tab = createBottomTabNavigator();

export function RootNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="NonAccessible"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "NonAccessible") {
            return <Text>🤯❌</Text>;
          } else {
            return <Text>✅</Text>;
          }
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="NonAccessible" component={NonAccessibleScreen} />
      <Tab.Screen name="Accessible" component={AccessibleScreen} />
    </Tab.Navigator>
  );
}
