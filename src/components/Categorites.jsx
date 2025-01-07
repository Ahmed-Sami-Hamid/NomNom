import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Categories({
  categories,
  activeCategory,
  setActiveCategory,
}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          {categories.map((cat, index) => {
            let isActive = cat.strCategory === activeCategory;
            let buttonStyle = isActive
              ? styles.activeImageContainer
              : styles.imageContainer;
            return (
              <TouchableOpacity
                key={index}
                style={styles.categoryButton}
                onPress={() => setActiveCategory(cat.strCategory)}
              >
                <View style={buttonStyle}>
                  <Image
                    source={{ uri: cat.strCategoryThumb }}
                    style={styles.image}
                  />
                </View>
                <Text style={styles.categoryName}>{cat.strCategory}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  scrollViewContainer: {
    paddingHorizontal: 15,
  },
  categoryButton: {
    alignItems: "center",
    marginRight: 16,
  },
  activeImageContainer: {
    borderRadius: 50,
    padding: hp(0.75),
    backgroundColor: "#F50B0B",
  },
  imageContainer: {
    borderRadius: 50,
    padding: hp(0.75),
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  image: {
    width: hp(6),
    height: hp(6),
    borderRadius: hp(3),
  },
  categoryName: {
    marginTop: 8,
    fontSize: hp(1.6),
    color: "#4B5563",
  },
});
