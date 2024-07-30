import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import images from "@/constants/images";
import { useGlobalLoginContext } from "@/contexts/login";
import { router } from "expo-router";

const UserFolder = ({ signOut }: { signOut: () => void }) => {
  const [showFolder, setShowFolder] = useState(false);
  const { userInfo } = useGlobalLoginContext();
  return (
    <>
      {showFolder ? (
        <View className="bg-white border-2 z-10 absolute w-[90%] h-[50vh] flex justify-between">
          <View>
            <View className="flex flex-row justify-between items-center border-b-2">
              <Image source={images.userFolder} resizeMode="contain" />
              <Text>{userInfo.user.email}</Text>
              <TouchableOpacity onPress={() => setShowFolder(false)}>
                <Image source={images.Close} resizeMode="contain" />
              </TouchableOpacity>
            </View>
            <View className="mt-5 gap-4 relative">
              <TouchableOpacity className="flex flex-row gap-2 hover:bg-[#FFF975]  items-center">
                <Image source={images.userFolder} resizeMode="contain" />
                <Text className="text-2xl font-bold">My files</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex flex-row gap-2 hover:bg-[#FFF975] items-center"
                onPress={() => router.push("Account")}
              >
                <Image source={images.userFolder} resizeMode="contain" />
                <Text className="text-2xl font-bold">Account</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity className="p-4 " onPress={signOut}>
            <Text className="text-xl font-bold  ">Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={() => setShowFolder(true)}>
          <Image source={images.userFolder} resizeMode="contain" />
        </TouchableOpacity>
      )}
    </>
  );
};

export default UserFolder;
