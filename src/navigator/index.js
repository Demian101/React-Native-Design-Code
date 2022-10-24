import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeStack from "./HomeStack";
import ProjectsStack from "./ProjectsStack";
// import CoursesStack from "./CoursesStack";

const Tab = createBottomTabNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
          headerShown: false,
        })}
        tabBarOptions={{
          activeTintColor: "#4775f2",
          inactiveTintColor: "#ccc",
        }}
        mode="modal"
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            title: "Home",
            tabBarIcon: ({ color, size,  }) => {
              return <Ionicons name="ios-home" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="CoursesStack"
          component={HomeStack}
          // component={CoursesStack}
          options={{
            title: "Courses",
            tabBarIcon: ({ color, size, focused }) => {
              return <Ionicons name="ios-albums" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="ProjectsStack"
          component={ProjectsStack}
          options={{
            title: "Projects",
            tabBarIcon: ({ color, size, focused }) => {
              return <Ionicons name="ios-folder" size={size} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}