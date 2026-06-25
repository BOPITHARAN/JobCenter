import React from "react";
import { View, Text } from "react-native";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FAF7EB",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#5D1F1E",
        }}
      >
        JobCenter+ App
      </Text>
    </View>
  );
}