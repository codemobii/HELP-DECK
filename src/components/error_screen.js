import React from "react";
import { Image, View } from "react-native";
import { Button, Title } from "react-native-paper";

export default function ErrorScreen(props) {
  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Title>Oops, something went wrong!</Title>
      <Image
        source={require("../../assets/error-occurred.png")}
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
        onPress={props.onpress}
      >
        Try again
      </Button>
    </View>
  );
}
