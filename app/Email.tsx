import React, { useState, useEffect } from "react";
import "expo-dev-client";

// Import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

// Import Google Signin
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { ContextProps, useGlobalLoginContext } from "@/contexts/login";
import { _signIn } from "@/lib/google";
import images from "@/constants/images";
import { router } from "expo-router";

const Email = () => {
  const { userInfo, gettingLoginStatus, setGettingLoginStatus, setUserInfo } =
    useGlobalLoginContext();
  console.log("hi", userInfo);
  

  useEffect(() => {
    if (userInfo.user.email) {
      router.replace("Home");
      
    }
  }, [userInfo]);

  const _signIn = async () => {
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfonew = await GoogleSignin.signIn();
      console.log("User Info --> ", userInfo);
      setUserInfo(userInfonew);
    } catch (error: any) {
      console.log("Message", JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert("User Cancelled the Login Flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert("Signing In");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert("Play Services Not Available or Outdated");
      } else {
        console.error("hi");
        alert(error.message);
      }
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
    } catch (error) {
      console.error(error);
    }
    setGettingLoginStatus(false);
  };

  if (gettingLoginStatus) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.container}>
            {userInfo.idToken ? (
              <>
                <Text className="text-indigo-900">
                  hio {userInfo.user.email}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    _signOut();
                  }}
                >
                  <Text>Sign out</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View className=" flex justify-center items-center">
                <Image source={images.sendEmail} resizeMode="contain" />
                <View className=" mt-16  py-12 px-6 rounded-lg flex justify-center items-center">
                  <GoogleSigninButton
                    style={{ width: 312, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={_signIn}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

export default Email;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});
