import * as React from "react";
import { StyleSheet, View } from "react-native";
import Signature from "react-native-signature-canvas";
import base64 from "base-64";

type Props = {
  onSave: (sketchSvg: string) => void;
  onDiscard: () => void;
};

const cleanSvgString = (dataUri: string) =>
  base64.decode(dataUri.replace("data:image/svg+xml;base64,", ""));

export const SketchCanvas = (props: Props) => {
  return (
    <View style={styles.container}>
      <Signature
        onOK={(i) => props.onSave(cleanSvgString(i))}
        onClear={props.onDiscard}
        descriptionText=""
        clearText="Discard"
        confirmText="Save"
        imageType={"image/svg+xml"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
