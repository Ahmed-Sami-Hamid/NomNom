import { StyleSheet, ActivityIndicator, View } from "react-native";
import React from "react";

const Loading = (props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator {...props} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});
