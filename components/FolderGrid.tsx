import { View, Text, Image } from "react-native";
import React from "react";
import images from "@/constants/images";

const FolderIcon = ({ item }: any) => {
  return (
    <View className="flex items-center justify-center">
      <Image source={images.PdfIcon} resizeMode="contain" />
      <Text className="text-xs font-medium">{item.name.slice(0,10)}...</Text>
    </View>
  );
};

const FolderGrid = ({ data }: any) => {
  return (
    <View className="flex flex-row gap-2 mt-4 flex-wrap">
      {data.length > 0 ? (
        data.map((item: any) => (
          <View className="" key={item.id}>
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
