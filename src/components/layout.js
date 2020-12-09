import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, Modal, Portal, Text } from "react-native-paper";
import TopNavigator from "../routes/top_navigator";
import ErrorScreen from "./error_screen";
import NothingFound from "./nothing_found";

export default function Layout({
  children,
  title = "Report",
  back,
  navigation,
  loading,
  nothing_found = false,
  error = false,
  refreshKey = null,
}) {
  function makeRef(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const setUserId = async () => {
    const id = makeRef(20);

    try {
      const value = await AsyncStorage.getItem("@user_key");
      if (value === null) {
        await AsyncStorage.setItem("@user_key", id);
        console.log(id);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    setUserId();
  }, []);

  return (
    <>
      <TopNavigator title={title} back={back} navigation={navigation} />
      <ScrollView style={{ flex: 1 }}>
        {children}
        {nothing_found ? <NothingFound navigation={navigation} /> : null}
        {error ? (
          <ErrorScreen onpress={refreshKey} navigation={navigation} />
        ) : null}
      </ScrollView>
      <Portal>
        <Modal visible={loading}>
          <ActivityIndicator animating={true} color="#5c969e" />
        </Modal>
      </Portal>
    </>
  );
}
