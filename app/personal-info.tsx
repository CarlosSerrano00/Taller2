import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { InputField } from "../components/InputField";
import { NavigationButton } from "../components/NavigationButton";
import { PhotoPicker } from "../components/PhotoPicker";
import { useCVContext } from "../context/CVContext";
import {
    PersonalInfoForm,
    personalInfoSchema,
} from "../types/cv.validation";

export default function PersonalInfoScreen() {
  const router = useRouter();
  const { cvData, updatePersonalInfo } = useCVContext();

  const {
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<PersonalInfoForm>({
    resolver: zodResolver(personalInfoSchema),
    mode: "onChange",
    defaultValues: cvData.personalInfo,
  });

  // Mantener el formulario sincronizado con los datos guardados.
  useEffect(() => {
    reset(cvData.personalInfo);
  }, [cvData.personalInfo, reset]);

  // Guardar la información validada.
  const onSubmit = (data: PersonalInfoForm) => {
    updatePersonalInfo(data);

    Alert.alert(
      "Éxito",
      "Información guardada correctamente",
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.content}>
        <PhotoPicker
          photo={watch("photoUri") ?? null}
          onChange={(uri) =>
            setValue("photoUri", uri, { shouldDirty: true })
          }
        />

        {/* Nombre completo */}
        <InputField
          label="Nombre Completo *"
          placeholder="Juan Pérez"
          value={watch("fullName") ?? ""}
          onChangeText={(text) =>
            setValue("fullName", text, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
        />

        {errors.fullName?.message && (
          <Text style={styles.error}>
            {errors.fullName.message}
          </Text>
        )}

        {/* Correo electrónico */}
        <InputField
          label="Email *"
          placeholder="juan@gmail.com"
          value={watch("email") ?? ""}
          onChangeText={(text) =>
            setValue("email", text, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {errors.email?.message && (
          <Text style={styles.error}>
            {errors.email.message}
          </Text>
        )}

        {/* Teléfono */}
        <InputField
          label="Teléfono"
          placeholder="+593 99 999 9999"
          value={watch("phone") ?? ""}
          onChangeText={(text) =>
            setValue("phone", text, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          keyboardType="phone-pad"
        />

        {errors.phone?.message && (
          <Text style={styles.error}>
            {errors.phone.message}
          </Text>
        )}

        {/* Ubicación */}
        <InputField
          label="Ubicación"
          placeholder="Quito, Ecuador"
          value={watch("location") ?? ""}
          onChangeText={(text) =>
            setValue("location", text, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
        />

        {errors.location?.message && (
          <Text style={styles.error}>
            {errors.location.message}
          </Text>
        )}

        {/* Resumen profesional */}
        <InputField
          label="Resumen Profesional"
          placeholder="Describe brevemente tu perfil profesional..."
          value={watch("summary") ?? ""}
          onChangeText={(text) =>
            setValue("summary", text, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          multiline
          numberOfLines={4}
          style={{
            height: 100,
            textAlignVertical: "top",
          }}
        />

        {errors.summary?.message && (
          <Text style={styles.error}>
            {errors.summary.message}
          </Text>
        )}

        {/* Botones */}
        <NavigationButton
          title="Guardar Información"
          onPress={handleSubmit(onSubmit)}
        />

        <NavigationButton
          title="Cancelar"
          onPress={() => router.back()}
          variant="secondary"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
  },
  error: {
    color: "#D32F2F",
    fontSize: 12,
    marginTop: -12,
    marginBottom: 14,
    marginLeft: 4,
  },
});