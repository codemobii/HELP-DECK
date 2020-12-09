/* eslint-disable prettier/prettier */
import React from "react";
import { Drawer, TouchableRipple, Text, Divider } from "react-native-paper";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import styles from "../components/styles";
import { View, Image, Linking, Share } from "react-native";

export function DrawerContent(props) {
  const [active, setActive] = React.useState("first");

  const shareApp = async () => {
    try {
      await Share.share({
        message: "Stay turned, we will launch Charis Media soon.",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <DrawerContentScrollView style={styles.Drawer} {...props}>
      <View style={styles.drawerContent}>
        <TouchableRipple
          style={{
            width: "100%",
            paddingLeft: 15,
          }}
        >
          <Image
            source={require("../../assets/help-pal.png")}
            style={styles.logo}
          />
        </TouchableRipple>
        <Divider />
        <Drawer.Section title="Media">
          <Drawer.Item
            icon="ios-megaphone"
            label="Report"
            onPress={() => {
              props.navigation.navigate("Home");
              setActive("first");
            }}
            active={active === "first"}
          />
          <Drawer.Item
            icon="ios-cube"
            label="Discover"
            onPress={() => {
              props.navigation.navigate("Discover");
              setActive("second");
            }}
            active={active === "second"}
          />
          <Drawer.Item
            icon="ios-information-circle"
            label="FAQs"
            onPress={() => {
              props.navigation.navigate("FAQs");
              setActive("three");
            }}
            active={active === "three"}
          />
        </Drawer.Section>
        <Drawer.Section title="Social">
          <Drawer.Item
            icon="logo-facebook"
            label="Facebook"
            onPress={() => {
              Linking.openURL("https://web.facebook.com/charismediaonline");
            }}
          />
          <Drawer.Item
            icon="ios-globe"
            label="About"
            onPress={() => {
              Linking.openURL("https://twitter.com/media_charis");
            }}
          />
          <Drawer.Item
            icon="ios-share-alt"
            label="Share App"
            onPress={() => shareApp()}
          />
        </Drawer.Section>
        <Text style={{ padding: 15 }}>App verion: 1.1</Text>
      </View>
    </DrawerContentScrollView>
  );
}
