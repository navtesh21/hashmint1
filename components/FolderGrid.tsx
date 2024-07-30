import { View, Text, Image } from "react-native";
import React from "react";
import images from "@/constants/images";

const FolderIcon = ({ item }) => {
  return (
    <View className="flex items-center justify-center">
      <Image source={images.Folder} resizeMode="contain" />
      <Text className="text-xs font-medium">{item.name}</Text>
    </View>
  );
};

const FolderGrid = ({ data }: { data: [] }) => {
  console.log("hi", data);

  return (
    <View className="flex flex-row gap-2 mt-4">
      {data.length > 0 ? (
        data.map((item) => (
          <View className="">
            <FolderIcon key={item.id} item={item} />
          </View>
        ))
      ) : (
        <Text>No file exists</Text>
      )}
    </View>
  );
};

export default FolderGrid;
