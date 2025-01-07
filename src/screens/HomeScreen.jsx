import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon } from "react-native-heroicons/outline";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/Categorites";

import axios from "axios";
import Recipes from "../components/Recipes";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Beef");

  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.log("error: ", err.message);
    }
  };

  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (err) {
      console.log("error: ", err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Avatar and Bell Icon */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/avatar.png")}
            style={styles.avatar}
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* Greetings and Punchline */}
        <View style={styles.greetingsContainer}>
          <Text style={styles.greetingText}>Hello, Sara!</Text>
          <View>
            <Text style={styles.punchlineText}>Make your own food</Text>
          </View>
          <Text style={styles.punchlineText}>
            stay at <Text style={styles.highlightText}>home</Text>
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor="gray"
            style={styles.searchInput}
          />
          <View style={styles.searchIconContainer}>
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>

        {/* Categories */}
        <View style={styles.wrapper}>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        {/* Recipes */}
        <View>
          <Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
