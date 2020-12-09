import React from "react";
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import AppStack from "./src/routes/app_stack";
import { AppLoading } from "expo";
import {
  useFonts,
  Inter_100Thin,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
} from "@expo-google-fonts/inter";

const fontConfig = {
  default: {
    regular: {
      fontFamily: "Inter_400Regular",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "Inter_500Medium",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "Inter_300Light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "Inter_100Thin",
      fontWeight: "normal",
    },
  },
};

const theme = {
  ...DefaultTheme,
  roundness: 0,
  colors: {
    ...DefaultTheme.colors,
    primary: "#303a52",
    accent: "#f1c40f",
  },
  fonts: configureFonts(fontConfig),
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <PaperProvider
        theme={theme}
        settings={{
          icon: (props) => <Ionicons {...props} />,
        }}
      >
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor="transparent"
        />
        <AppStack />
      </PaperProvider>
    );
  }
}
