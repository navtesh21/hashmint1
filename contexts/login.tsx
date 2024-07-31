import { createContext, useContext, useState, useEffect } from "react";
import {
  GoogleSignin,
  statusCodes,
  User,
} from "@react-native-google-signin/google-signin";
import "expo-dev-client";

export type ContextProps = {
  userInfo: User;
  setUserInfo: React.Dispatch<React.SetStateAction<User>>;
  gettingLoginStatus: boolean;
  setGettingLoginStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginContext = createContext<ContextProps | undefined>(undefined);
export const useGlobalLoginContext = () => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalLoginContext must be used within a LoginContextProvider"
    );
  }
  return context;
};

export const LoginContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState<User>({
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
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);

  useEffect(() => {
    // Initial configuration
    GoogleSignin.configure({
      // Mandatory method to call before calling signIn()
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/drive.appdata",
        "https://www.googleapis.com/auth/drive.metadata",
        "https://www.googleapis.com/auth/drive.readonly",
        "https://www.googleapis.com/auth/drive.metadata.readonly",
        "https://www.googleapis.com/auth/drive.apps.readonly",
        "https://www.googleapis.com/auth/drive.photos.readonly",
      ],
      // Repleace with your webClientId
      // Generated from Firebase console
      webClientId:
        "876299571311-616d2q1h3n813d6ltav93aalt3ogh8i1.apps.googleusercontent.com",
    });
    // Check if user is already signed in
    _isSignedIn();
  }, []);

  const _isSignedIn = async () => {
    const isSignedIn = GoogleSignin.hasPreviousSignIn();
    if (isSignedIn) {
      alert("User is already signed in");
      // Set User Info if user is already signed in
      _getCurrentUserInfo();
    } else {
      console.log("Please Login");
    }
    setGettingLoginStatus(false);
  };

  const _getCurrentUserInfo = async () => {
    try {
      let info = await GoogleSignin.signInSilently();
      setUserInfo(info);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert("User has not signed in yet");
        console.log("User has not signed in yet");
      } else {
        alert("Unable to get user's info");
        console.log("Unable to get user's info");
      }
    }
  };

  return (
    <LoginContext.Provider
      value={{
        userInfo,
        setUserInfo,
        gettingLoginStatus,
        setGettingLoginStatus,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
