import * as React from "react";
import { Switch, Text } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AccessibleScreen } from "../screens/AccessibleScreen";
import { NonAccessibleScreen } from "../screens/NonAccessibleScreen";
import { useAtom } from "jotai";
import { isScreenVisibleAtom } from "../entities";

const Tab = createBottomTabNavigator();

export function RootNavigator() {
  const [isVisible, setIsVisible] = useAtom(isScreenVisibleAtom);

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
        headerLeft: () => (
          <Switch value={isVisible} onValueChange={setIsVisible} />
        ),
      })}
    >
      <Tab.Screen
        name="NonAccessible"
        component={NonAccessibleScreen}
      ></Tab.Screen>
      <Tab.Screen name="Accessible" component={AccessibleScreen} />
    </Tab.Navigator>
  );
}
