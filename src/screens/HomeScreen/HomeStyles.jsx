import { StyleSheet, Platform, StatusBar } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  wrapper: {
    marginBottom: 26,
  },
  scrollViewContent: {
    paddingBottom: 50,
    paddingTop: 14,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 26,
  },
  avatar: {
    height: hp(5),
    width: hp(5),
    borderRadius: hp(2.5),
  },
  greetingsContainer: {
    marginBottom: 36,
  },
  greetingText: {
    fontSize: hp(1.7),
    color: "#6B7280",
    marginBottom: 8,
  },
  punchlineText: {
    fontSize: hp(3.8),
    fontWeight: "600",
    color: "#6B7280",
  },
  highlightText: {
    color: "#F50B0B",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 9999,
    padding: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: hp(1.7),
    color: "black",
    marginBottom: 1,
    paddingLeft: 12,
    letterSpacing: 0.5,
  },
  searchIconContainer: {
    backgroundColor: "white",
    borderRadius: 9999,
    padding: 12,
  },
});
