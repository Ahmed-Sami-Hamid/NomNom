import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);
  const navigation = useNavigation();

  const outerRingStyle = useAnimatedStyle(() => ({
    padding: ring2padding.value,
  }));

  const innerRingStyle = useAnimatedStyle(() => ({
    padding: ring1padding.value,
  }));

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(5))),
      100
    );
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + hp(5.5))),
      300
    );
    setTimeout(() => navigation.navigate("Home"), 2500);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* Logo Image with Rings */}
      <Animated.View style={[styles.outerRing, outerRingStyle]}>
        <Animated.View style={[styles.innerRing, innerRingStyle]}>
          <Image
            source={require("../../assets/welcome.png")}
            style={styles.logo}
          />
        </Animated.View>
      </Animated.View>
      {/* Title and Punchline */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Nom Nom</Text>
        <Text style={styles.punchline}>Yes, Food is always right</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    width: hp(20),
    height: hp(20),
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

export default WelcomeScreen;
