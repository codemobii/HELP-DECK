import React from "react";
import { Appbar } from "react-native-paper";

export default function TopNavigator(props) {
  return (
    <Appbar.Header>
      {props.back ? (
        <Appbar.BackAction
          color="#fff"
          onPress={() => props.navigation.goBack()}
        />
      ) : (
        <Appbar.Action
          color="#fff"
          icon="ios-menu"
          onPress={() => props.navigation.openDrawer()}
          style={{ marginRight: 0 }}
        />
      )}
      <Appbar.Content color="#fff" title={props.title} />
      <Appbar.Action
        color="#fff"
        icon="ios-chatboxes"
        onPress={() => props.navigation.navigate("SelectChatAgency")}
        style={{ marginRight: 0 }}
      />
    </Appbar.Header>
  );
}
