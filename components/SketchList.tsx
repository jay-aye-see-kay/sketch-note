import * as React from "react";
import { StyleSheet, Button, Text, View, FlatList } from "react-native";
import { SvgXml } from "react-native-svg";
import { Sketch, Action } from "../store";

type Props = {
  sketches: Sketch[];
  dispatch: React.Dispatch<Action>;
};

export const SketchList: React.FC<Props> = ({ sketches, dispatch }) => {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          title="Create sketch"
          onPress={() => dispatch({ type: "startSketch" })}
        />
      </View>
      <FlatList
        data={sketches}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={{ flex: 1, padding: 12, flexDirection: "row" }}>
            <SvgXml width={100} height={100} xml={item.svg} />
            <View style={{ flex: 1, flexDirection: "column" }}>
              <Text>{item.title}</Text>
              <Text>Created at {item.createdAt}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 36,
  },
});
