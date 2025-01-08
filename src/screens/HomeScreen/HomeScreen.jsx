import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from "react-native";

// Libraries
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";

// Icons
import { BellIcon } from "react-native-heroicons/outline";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

// Components
import Categories from "../../components/Categorites";
import Recipes from "../../components/Recipes";
import Loading from "../../components/Loading";

// Style
import { styles } from "./HomeStyles";

export default function HomeScreen() {
  // States
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  // Apis
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
    if (!category) {
      console.error("Category is null or undefined.");
      return;
    }
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

  const getRecipesBySearch = async () => {
    if (!searchQuery) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
      );
      if (response && response.data) {
        setSearchResults(response.data.meals);
      }
    } catch (err) {
      console.log("error: ", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Functions
  const handleSearchInputChange = (text) => {
    setSearchQuery(text);
  };

  const handleChangeCategory = (category) => {
    if (!category) {
      console.error("Invalid category selected.");
      return;
    }
    getRecipes(category);
    setActiveCategory(category);
    setSearchResults([]);
    setSearchQuery("");
    setMeals([]);
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
            source={require("../../../assets/avatar.png")}
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
            value={searchQuery}
            onChangeText={handleSearchInputChange}
            style={styles.searchInput}
          />
          <TouchableOpacity
            style={styles.searchIconContainer}
            onPress={getRecipesBySearch}
          >
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </TouchableOpacity>
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
          {isLoading ? (
            <Loading size="large" />
          ) : (
            <Recipes
              meals={searchResults.length > 0 ? searchResults : meals}
              categories={categories}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
