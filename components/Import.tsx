import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import images from "@/constants/images";

const Import = () => {
  const addFile = async () => {
    
      console.log("click1");
    
      console.log("click2");
  }
 
  return (
    <TouchableOpacity onPress={addFile}>
      <Image source={images.Import} resizeMode="contain" />
      <Text className="font-bold text-xs">Import Pdf</Text>
    </TouchableOpacity>
  );
};

export default Import;
