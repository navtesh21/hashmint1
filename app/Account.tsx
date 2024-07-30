import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import { router } from "expo-router";

const Account = () => {
  return (
    <SafeAreaView>
      <ScrollView className="w-full h-full bg-[#FFF975] p-4">
        <View className="flex-row justify-between">
          <View className="flex-row gap-3 items-center">
            <Image source={images.Settings} resizeMode="contain" />
            <Text className="text-2xl font-bold">My Account</Text>
          </View>

          <TouchableOpacity onPress={() => router.back()}>
            <Image source={images.Close} resizeMode="contain" />
          </TouchableOpacity>
        </View>
        <View className="flex items-center h-[85vh] justify-center">
          <Image
            source={images.FlipChart}
            resizeMode="contain"
            className="h-36 w-36"
          />
          <Text>Fetch from Hashmint</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;
