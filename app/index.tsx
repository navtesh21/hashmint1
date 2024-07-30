import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../constants/images";
import { Link, Redirect, router } from "expo-router";
import { useGlobalLoginContext } from "@/contexts/login";
import { useEffect } from "react";

export default function Index() {
  
  const { userInfo } = useGlobalLoginContext();

  useEffect(() => {
    if (userInfo.user.email) {
      router.replace("Home");
    }
  }, [userInfo]);

  return (
    <SafeAreaView>
      <ScrollView className="h-full">
        <View className="w-full  mt-7 p-4">
          <View className=" mt-7 ">
            <Text className="font-extrabold text-8xl text-black ">
              Your Notes lives on...
            </Text>
          </View>
          <View className="flex flex-row justify-end items-center mt-44">
            <Text className="font-bold text-xl">Lets get started..</Text>
            <TouchableOpacity
              className=" mb-9"
              onPress={() => router.push("Email")}
            >
              <Image source={images.enter} resizeMode="contain" className="" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
