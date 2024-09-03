import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import UserFolder from "@/components/userFolder";
import { useGlobalLoginContext } from "@/contexts/login";
import { router } from "expo-router";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  GDrive,
  MimeTypes,
  ListQueryBuilder,
} from "@robinbobin/react-native-google-drive-api-wrapper";
import FolderGrid from "@/components/FolderGrid";
import Import from "@/components/Import";
import { fetchFiles } from "@/lib/actions";
import Loading from "@/components/Loading";
import firestore from "@react-native-firebase/firestore";

const home = () => {
  const { setGettingLoginStatus, setUserInfo } = useGlobalLoginContext();
  const [files, setFiles] = useState([]);
  const [folderId, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = firestore().collection('todos')
  const submitdata = async () => {
    try {
      
      console.log("haha");
      await ref.add({
        name: "Ada Lovelace",
        age: 30,
      });
      console.log("User added!");
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  };

  const _signOut = async () => {
    setGettingLoginStatus(true);
    // Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // Removing user Info
      setUserInfo({
        user: {
          id: "",
          name: null,
          email: "",
          photo: null,
          familyName: null,
          givenName: null,
        },
        scopes: [],
        idToken: null,
        serverAuthCode: null,
      });
      router.replace("/Email");
    } catch (error) {
      console.error(error);
    }
    setGettingLoginStatus(false);
  };

  const gdrive = new GDrive();

  useEffect(() => {
    exex();
  }, []);

  const exex = async () => {
    try {
      gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken;
      if (gdrive.accessToken) {
        try {
          const folderId = await gdrive.files.createIfNotExists(
            {
              q: new ListQueryBuilder()
                .e("name", "Hashmint")
                .and()
                .e("mimeType", MimeTypes.FOLDER)
                .and()
                .in("root", "parents"),
            },
            gdrive.files.newMetadataOnlyUploader().setRequestBody({
              name: "Hashmint",
              mimeType: MimeTypes.FOLDER,
              parents: ["root"],
            })
          );
          setId(folderId.result.id);

          const data = await fetchFiles(folderId.result.id);
          setFiles(data);
        } catch (err) {
          //.. catch the error accordingly
          console.log(err);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="w-full h-full bg-[#FFF975] p-4">
      <View className="flex-row flex justify-between relative ">
        <UserFolder signOut={_signOut} />

        <Image source={images.HMLogoSmall} resizeMode="contain" />
        <View className="flex items-center justify-center">
          <Import
            folderId={folderId}
            setFiles={setFiles}
            setLoading={setLoading}
          />
        </View>
      </View>

      {/* <View className="mt-7 px-2">
        <Text className="font-bold text-3xl">My Files</Text>
        {loading ? <Loading /> : <FolderGrid data={files} />}
      </View> */}

      <View>
        {/* <Sheet /> */}
        <TouchableOpacity
          onPress={() => submitdata()}
          className=" p-3 bg-blue-400"
        >
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default home;
