import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import DocumentPicker, { types } from "react-native-document-picker";

const Import = () => {
  const addFile = async () => {
    try {
      console.log("click1");
      const response = await DocumentPicker.pickDirectory();
      console.log(response);
      console.log("click2");
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log("User canceled the picker");
      } else {
        console.log("Unknown error:", error);
      }
    }
  };
  return (
    <TouchableOpacity onPress={addFile}>
      <Image source={images.Import} resizeMode="contain" />
      <Text className="font-bold text-xs">Import Pdf</Text>
    </TouchableOpacity>
  );
};

export default Import;
