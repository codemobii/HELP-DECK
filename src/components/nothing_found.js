import React from "react";
import { Image, View } from "react-native";
import { Button, Title } from "react-native-paper";

export default function NothingFound(props) {
  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Title>Oops, nothing found!</Title>
      <Image
        source={require("../../assets/empty.png")}
        style={{
          width: 200,
          height: 200,
          resizeMode: "contain",
          marginVertical: 30,
        }}
      />
      <Button
        mode="contained"
        labelStyle={{ color: "#fff" }}
        onPress={() => props.navigation.goBack()}
      >
        Go Back
      </Button>
    </View>
  );
}
