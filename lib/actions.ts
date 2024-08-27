import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  GDrive,
  ListQueryBuilder,
} from "@robinbobin/react-native-google-drive-api-wrapper";

export async function fetchFiles(folderId: string) {
  const gdrive = new GDrive();
  gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken;
  const data = await gdrive.files.list({
    q: new ListQueryBuilder().in(folderId, "parents and trashed=false"),
  });
  return data.files;
}
