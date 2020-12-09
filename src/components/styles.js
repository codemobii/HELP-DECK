import { StyleSheet } from "react-native";

export default StyleSheet.create({
  //UNIVERSAL
  normalContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: "#121212",
  },

  noPadding: {
    flex: 1,
    backgroundColor: "#121212",
  },

  //TOP NAVIGATOR
  logo: {
    width: 80,
    height: 60,
    resizeMode: "contain",
  },

  //DRAWER
  drawerHeader: {
    width: "100%",
    height: 130,
    marginTop: -5,
  },

  centeredContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121212",
  },

  overlayRed: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(232,39,76,0.65)",
  },

  overlayBlack: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
  },

  //VIDEOS

  videoImgSml: {
    width: 80,
    height: 60,
  },
});
