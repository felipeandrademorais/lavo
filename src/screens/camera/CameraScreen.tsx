import { useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import {
  Button,
  Card,
  CameraCaptureButton,
  IconButton,
  Text,
} from "@/components";
import { useTheme } from "@/contexts";
import { saveLastInstructions } from "@/features/history";
import { analyzeClothingLabel } from "@/services";
import {
  capturePictureBase64,
  ensureCameraPermission,
  ensureMediaLibraryPermission,
  normalizeBase64,
  pickImageFromLibrary,
} from "@/utils/imageUtils";

export function CameraScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const [cameraType, setCameraType] = useState<CameraType>("back");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCapture = async () => {
    if (!cameraRef.current) {
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const hasPermission = await ensureCameraPermission();
      if (!hasPermission) {
        setError("Precisamos da sua permissão para acessar a câmera.");
        return;
      }

      const image = await capturePictureBase64(cameraRef.current);
      await processImage(normalizeBase64(image.base64));
    } catch (err) {
      setError(getReadableError(err));
    } finally {
      setLoading(false);
    }
  };

  const handlePickFromLibrary = async () => {
    setError(null);
    setLoading(true);

    try {
      const hasPermission = await ensureMediaLibraryPermission();
      if (!hasPermission) {
        setError("Autorize o acesso à galeria para selecionar uma imagem.");
        return;
      }

      const image = await pickImageFromLibrary();
      if (!image) {
        return;
      }

      await processImage(normalizeBase64(image.base64));
    } catch (err) {
      setError(getReadableError(err));
    } finally {
      setLoading(false);
    }
  };

  const processImage = async (base64: string) => {
    const instructions = await analyzeClothingLabel(base64);
    await saveLastInstructions(instructions);
    router.replace({ pathname: "/camera/result", params: { source: "new" } });
  };

  const toggleCamera = () => {
    setCameraType((prev) => (prev === "back" ? "front" : "back"));
  };

  if (!permission?.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Card>
          <Text variant="h3" style={{ marginBottom: theme.spacing.md }}>
            Permita o acesso à câmera
          </Text>
          <Text tone="secondary" style={{ marginBottom: theme.spacing.lg }}>
            Precisamos da câmera para analisar a etiqueta das suas roupas.
          </Text>
          <Button label="Conceder permissão" onPress={requestPermission} />
        </Card>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing={cameraType}
      />

      <View style={styles.overlayTop}>
        <IconButton
          icon={<Ionicons name="close" size={24} color={theme.colors.text} />}
          variant="transparent"
          onPress={() => router.back()}
        />
        <IconButton
          icon={<Ionicons name="sync" size={24} color={theme.colors.text} />}
          variant="transparent"
          onPress={toggleCamera}
        />
      </View>

      <View style={styles.overlayBottom}>
        {error ? (
          <Text tone="error" style={{ marginBottom: theme.spacing.sm }}>
            {error}
          </Text>
        ) : null}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button
            label="Galeria"
            variant="ghost"
            fullWidth={false}
            onPress={handlePickFromLibrary}
            disabled={loading}
          />
          <CameraCaptureButton onPress={handleCapture} disabled={loading} />
          <View style={{ width: 90 }} />
        </View>
        {loading ? (
          <View style={{ marginTop: theme.spacing.md }}>
            <ActivityIndicator color={theme.colors.surface} />
          </View>
        ) : null}
      </View>
    </View>
  );
}

function getReadableError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Não foi possível processar a imagem. Tente novamente.";
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  overlayTop: {
    position: "absolute",
    top: 48,
    left: 24,
    right: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  overlayBottom: {
    position: "absolute",
    bottom: 48,
    left: 24,
    right: 24,
  },
});
