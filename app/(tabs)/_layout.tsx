import { Tabs } from "expo-router";
import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { getCurrentLanguage, setCurrentLanguage } from "@/redux/globalStates";
import Ionicons from "@expo/vector-icons/Ionicons";
import CountryFlag from "react-native-country-flag";

export default function TabLayout() {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(getCurrentLanguage);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
          tabBarActiveTintColor: "red",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="language"
        options={{
          tabBarButton: () => {
            return (
              <TouchableOpacity
                className="flex-1 flex-row items-center justify-center"
                onPress={() => {
                  dispatch(
                    setCurrentLanguage(currentLanguage === "en" ? "es" : "en")
                  );
                }}
              >
                <CountryFlag
                  isoCode={currentLanguage === "en" ? "us" : "co"}
                  size={30}
                  style={{
                    borderRadius: 20,
                  }}
                />
              </TouchableOpacity>
            );
          },
        }}
      />

      <Tabs.Screen
        name="detailscreen/[detailId]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="categoryscreen/[categoryMovieId]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
