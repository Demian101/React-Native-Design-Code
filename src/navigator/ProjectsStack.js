import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProjectsScreen from "../screens/ProjectsScreen";

const Stack = createStackNavigator();

export default function ProjectStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      mode="modal"
    >
      <Stack.Screen name="Projects" component={ProjectsScreen} />
    </Stack.Navigator>
  );
}