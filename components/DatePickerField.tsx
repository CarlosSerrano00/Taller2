
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface DatePickerFieldProps {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  maximumDate?: Date;
}

export function DatePickerField({
  label,
  value,
  onChange,
  maximumDate,
}: DatePickerFieldProps) {
  const [visible, setVisible] = useState(false);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("es-EC");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.value}>
          {value ? formatDate(value) : "Seleccionar fecha"}
        </Text>
      </TouchableOpacity>

      {visible && (
        <DateTimePicker
          value={value ?? new Date()}
          mode="date"
          display={
            Platform.OS === "ios" ? "spinner" : "default"
          }
          maximumDate={maximumDate}
          onChange={(event, selectedDate) => {
            setVisible(Platform.OS === "ios");

            if (event.type === "set" && selectedDate) {
              onChange(selectedDate);
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    color: "#263238",
  },
  button: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D5D9DC",
    borderRadius: 10,
    padding: 14,
  },
  value: {
    fontSize: 15,
    color: "#263238",
  },
});
