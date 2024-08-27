import { useGlobalLoginContext } from "@/contexts/login";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { router } from "expo-router";

const { userInfo, setUserInfo, setGettingLoginStatus } =
  useGlobalLoginContext();

export const _signIn = async () => {
  // It will prompt google Signin Widget
  try {
    await GoogleSignin.hasPlayServices({
      // Check if device has Google Play Services installed
      // Always resolves to true on iOS
      showPlayServicesUpdateDialog: true,
    });
    const userInfo = await GoogleSignin.signIn();
    console.log("User Info --> ", userInfo);
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

export  const _signOut = async () => {
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