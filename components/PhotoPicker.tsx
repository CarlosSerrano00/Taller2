
import * as ImagePicker from "expo-image-picker";
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface PhotoPickerProps {
  photo: string | null;
  onChange: (uri: string | null) => void;
}

export function PhotoPicker({
  photo,
  onChange,
}: PhotoPickerProps) {
  const selectPhoto = async () => {
    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permiso necesario",
        "Debes permitir el acceso a la cámara."
      );
      return;
    }

    const result =
      await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {photo ? (
        <Image source={{ uri: photo }} style={styles.photo} />
      ) : (
        <View style={styles.placeholder}>
          <Text>Sin fotografía</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={selectPhoto}
      >
        <Text style={styles.buttonText}>
          Elegir de la galería
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={takePhoto}
      >
        <Text style={styles.buttonText}>
          Tomar fotografía
        </Text>
      </TouchableOpacity>

      {photo && (
        <TouchableOpacity onPress={() => onChange(null)}>
          <Text style={styles.remove}>Eliminar fotografía</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
    gap: 12,
  },
  photo: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  placeholder: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#F5C400",
    padding: 12,
    borderRadius: 8,
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#222222",
  },
  remove: {
    color: "#B3261E",
  },
});
