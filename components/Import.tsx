import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React from "react";
import images from "@/constants/images";
import DocumentPicker from "react-native-document-picker";
import RNFS from "react-native-fs";
import {
  GDrive,
  MimeTypes,
} from "@robinbobin/react-native-google-drive-api-wrapper";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { fetchFiles } from "@/lib/actions";

const Import = ({
  folderId,
  setFiles,
  setLoading,
}: {
  folderId: string;
  setFiles: React.Dispatch<React.SetStateAction<never[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const gdrive = new GDrive();
  const addFile = async () => {
    setLoading(true);
    const document = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.pdf],
    });
    console.log(document);
    let fileContent = await RNFS.readFile(document.uri, "base64");
    gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken;
    try {
      gdrive.fetchTimeout = 9000;
      if (gdrive.accessToken) {
        const uploadResponse = await gdrive.files
          .newMultipartUploader()
          .setData(fileContent, MimeTypes.PDF)
          .setIsBase64(true)
          .setRequestBody({
            name: document.name,
            parents: [folderId],
          })
          .execute();

        console.log(uploadResponse);
      }
    } catch (error) {
      Alert.alert("file not uploaded,check network connection or try again");
    } finally {
      const data = await fetchFiles(folderId);
      setFiles(data);
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={addFile}
      className="flex justify-center items-center"
    >
      <Image source={images.Import} resizeMode="contain" />
      <Text className="font-bold text-xs">Import Pdf</Text>
    </TouchableOpacity>
  );
};

export default Import;
