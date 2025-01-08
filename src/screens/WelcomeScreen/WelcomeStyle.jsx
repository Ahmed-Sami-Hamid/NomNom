import { StyleSheet, Platform, StatusBar } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F50B0B", // Amber-500
  },
  outerRing: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // White/20
    borderRadius: 9999,
  },
  innerRing: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // White/20
    borderRadius: 9999,
  },
  logo: {
    width: hp(25),
    height: hp(25),
  },
  textContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontWeight: "bold",
    color: "white",
    letterSpacing: 2,
    fontSize: hp(6), // Corresponds to text-6xl
  },
  punchline: {
    fontWeight: "500",
    color: "white",
    letterSpacing: 1.5,
    fontSize: hp(2.2), // Corresponds to text-lg
  },
});
