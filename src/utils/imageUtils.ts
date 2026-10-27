import { Camera, CameraView } from "expo-camera";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

export type CapturedImage = {
  base64: string;
  uri: string;
};

export const ensureCameraPermission = async (): Promise<boolean> => {
  const { status } = await Camera.requestCameraPermissionsAsync();
  return status === "granted";
};

export const ensureMediaLibraryPermission = async (): Promise<boolean> => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  return status === "granted";
};

export const capturePictureBase64 = async (
  cameraView: CameraView,
): Promise<CapturedImage> => {
  const picture = await cameraView.takePictureAsync({
    base64: true,
    quality: 0.7,
    skipProcessing: true,
  });

  if (!picture.base64 || !picture.uri) {
    throw new Error("Não foi possível capturar a imagem");
  }

  return { base64: picture.base64, uri: picture.uri };
};

export const pickImageFromLibrary = async (): Promise<CapturedImage | null> => {
  const hasPermission = await ensureMediaLibraryPermission();
  if (!hasPermission) {
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: false,
    base64: true,
    quality: 0.7,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
  });

  if (result.canceled) {
    return null;
  }

  const asset = result.assets?.[0];
  if (!asset?.base64 || !asset.uri) {
    return null;
  }

  return { base64: asset.base64, uri: asset.uri };
};

export const fileUriToBase64 = async (uri: string): Promise<string> =>
  FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

export const normalizeBase64 = (value: string): string =>
  value.replace(/^data:image\/\w+;base64,/, "").trim();
