import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const Loading = () => {
  return (
    <View>
      <ActivityIndicator size={"large"} color="#6482AD" />
    </View>
  );
};

export default Loading;
