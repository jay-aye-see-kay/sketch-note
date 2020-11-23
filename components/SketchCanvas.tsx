import * as React from "react";
import { Modal, TextInput, Button, StyleSheet, View } from "react-native";
import Signature from "react-native-signature-canvas";
import base64 from "base-64";

type Props = {
  onSave: (sketchSvg: string, title: string) => void;
  onDiscard: () => void;
};

const cleanSvgString = (dataUri: string) =>
  base64.decode(dataUri.replace("data:image/svg+xml;base64,", ""));

export const SketchCanvas = (props: Props) => {
  const [isModelOpen, setIsModelOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [sketchSvg, setSketchSvg] = React.useState("");

  return (
    <View style={styles.container}>
      <Signature
        onOK={(i) => {
          setSketchSvg(cleanSvgString(i));
          setIsModelOpen(true);
        }}
        onClear={props.onDiscard}
        descriptionText=""
        clearText="Discard"
        confirmText="Save"
        imageType={"image/svg+xml"}
      />
      {isModelOpen && (
        <Modal style={styles.modalView}>
          <TextInput
            style={styles.modalText}
            autoFocus
            maxLength={64}
            value={title}
            onChangeText={setTitle}
          />
          <View style={{ flexDirection: "row" }}>
            <Button title="Go back" onPress={() => setIsModelOpen(false)} />
            <Button
              title="Save"
              onPress={() => props.onSave(sketchSvg, title)}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
