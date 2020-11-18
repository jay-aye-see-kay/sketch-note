import React, { useReducer } from "react";
import { StatusBar, SafeAreaView, StyleSheet, View } from "react-native";
import { SketchCanvas } from "./components/SketchCanvas";
import { SketchList } from "./components/SketchList";
import { reducer, initialState } from "./store";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {state.isDrawing ? (
          <SketchCanvas
            onSave={(svg) => {
              dispatch({ type: "saveSketch", payload: { svg } });
              dispatch({ type: "endSketch" });
            }}
            onDiscard={() => dispatch({ type: "endSketch" })}
          />
        ) : (
          <SketchList sketches={state.sketches} dispatch={dispatch} />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  safeArea: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
