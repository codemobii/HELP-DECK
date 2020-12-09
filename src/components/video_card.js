import React from "react";
import { Image } from "react-native";
import { List } from "react-native-paper";
import styles from "./styles";

export default function VideoCard({ v, navigation }) {
  return (
    <List.Item
      key={v.id}
      title={v.video_title}
      titleNumberOfLines={3}
      left={() => (
        <Image
          source={{
            uri: v.video_image,
          }}
          style={styles.videoImgSml}
        />
      )}
      onPress={() =>
        navigation.push("PlayVideo", {
          id: v.id,
        })
      }
    />
  );
}
