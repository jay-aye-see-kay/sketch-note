import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { SketchCanvas } from "./components/SketchCanvas";

export default function App() {
  const [isDrawing, setIsDrawing] = React.useState(true);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {isDrawing ? (
        <SketchCanvas
          onSave={(img) => {
            console.log("\n", img);
            setIsDrawing(false);
          }}
          onDiscard={() => setIsDrawing(false)}
        />
      ) : (
        <View style={styles.buttonWrapper}>
          <Button title="Create sketch" onPress={() => setIsDrawing(true)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});
