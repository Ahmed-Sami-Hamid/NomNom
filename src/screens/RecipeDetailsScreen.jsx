import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import CachedImage from "../helpers/image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
} from "react-native-heroicons/outline";
import {
  HeartIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/Loading";
import YoutubeIframe from "react-native-youtube-iframe";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";

const RecipeDetailsScreen = (props) => {
  const item = props.route.params;
  const [isLiked, setIsLiked] = useState(false);
  const [meals, setMeals] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);

  const getMealData = async (id) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      if (response && response.data) {
        setMeals(response.data.meals[0]);
        setLoading(false);
      }
    } catch (err) {
      console.log("error: ", err.message);
    }
  };

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    const indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  return (
    <ScrollView>
      <StatusBar style="light" />
      <View style={styles.header}>
        <CachedImage
          uri={item?.strMealThumb}
          sharedTransitionTag={item?.strMeal}
          style={{
            width: wp(100),
            height: hp(50),
            borderRadius: 53,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        />
      </View>

      {/* Back bottons */}
      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        style={styles.backButtons}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsLiked(!isLiked)}
        >
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color={isLiked ? "#F50B0B" : "grey"}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* Recipe Details */}
      {loading ? (
        <Loading size="large" />
      ) : (
        <View style={styles.recipeDetails}>
          <Text style={styles.recipeName}>{meals?.strMeal}</Text>
          <Animated.View
            entering={FadeInDown.duration(600).springify().damping(12)}
            style={styles.typeWrapper}
          >
            <Text style={styles.recipeCategory}>{meals?.strCategory}</Text>
            <Text style={styles.recipeArea}>{meals?.strArea}</Text>
          </Animated.View>

          {/* Misc */}
          <Animated.View
            entering={FadeInDown.delay(100)
              .duration(600)
              .springify()
              .damping(11)}
            style={styles.miscWrapper}
          >
            {/* Time */}
            <View style={styles.miscInside}>
              <View style={styles.iconWrapper}>
                <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View style={styles.timeWrapper}>
                <Text style={styles.minutes}>35</Text>
                <Text style={styles.minutesText}>Mins</Text>
              </View>
            </View>

            {/* UsersIcon */}
            <View style={styles.miscInside}>
              <View style={styles.iconWrapper}>
                <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View style={styles.timeWrapper}>
                <Text style={styles.minutes}>03</Text>
                <Text style={styles.minutesText}>Serving</Text>
              </View>
            </View>

            {/* FireIcon */}
            <View style={styles.miscInside}>
              <View style={styles.iconWrapper}>
                <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View style={styles.timeWrapper}>
                <Text style={styles.minutes}>105</Text>
                <Text style={styles.minutesText}>Cal</Text>
              </View>
            </View>

            {/* Square3Stack3DIcon */}
            <View style={styles.miscInside}>
              <View style={styles.iconWrapper}>
                <Square3Stack3DIcon
                  size={hp(4)}
                  strokeWidth={2.5}
                  color="#525252"
                />
              </View>
              <View style={styles.timeWrapper}>
                <Text style={styles.minutes}>3</Text>
                <Text style={styles.minutesText}>Easy</Text>
              </View>
            </View>
          </Animated.View>

          {/* Ingredients */}
          <Animated.View
            entering={FadeInDown.delay(100)
              .duration(600)
              .springify()
              .damping(12)}
            style={styles.ingredientsContainer}
          >
            <Text style={styles.title}>Ingredients</Text>
            <View style={styles.ingredientsList}>
              {ingredientsIndexes(meals).map((index) => {
                return (
                  <View key={index} style={styles.ingredientsListWrapper}>
                    <View style={styles.dots} />
                    <View style={styles.ingredientsLisDetails}>
                      <Text style={styles.measure}>
                        {meals[`strMeasure${index}`]}
                      </Text>
                      <Text style={styles.ingredient}>
                        {meals[`strIngredient${index}`]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </Animated.View>

          {/* Instructions */}
          <Animated.View
            entering={FadeInDown.delay(100)
              .duration(600)
              .springify()
              .damping(12)}
            style={styles.ingredientsContainer}
          >
            <Text style={styles.title}>Instructions</Text>
            <Text style={styles.instructionsText}>
              {meals?.strInstructions}
            </Text>
          </Animated.View>

          {/* Video */}
          {meals?.strYoutube && (
            <Animated.View
              entering={FadeInDown.delay(100)
                .duration(600)
                .springify()
                .damping(12)}
            >
              <Text style={styles.title}>Video</Text>
              <View>
                <YoutubeIframe
                  height={hp(30)}
                  width="100%"
                  videoId={meals?.strYoutube.split("=")[1]}
                />
              </View>
            </Animated.View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default RecipeDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  backButtons: {
    paddingTop: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    paddingInline: 20,
  },
  button: {
    padding: 16,
    backgroundColor: "#ffffff99",
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  recipeDetails: {
    marginTop: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderColor: "#E6E6E6",
    marginInline: 20,
  },
  recipeName: {
    fontSize: hp(3),
    fontWeight: "bold",
    marginBottom: 13,
  },
  typeWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 13,
  },
  recipeCategory: {
    fontSize: hp(2),
    color: "#6B7280",
  },
  recipeArea: {
    fontSize: hp(1.5),
    color: "#ffffff",
    backgroundColor: "#F50B0B90",
    borderRadius: 555,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginLeft: 5,
  },
  miscWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 29,
    marginTop: 15,
  },
  miscInside: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 555,
    backgroundColor: "#F50B0B",
  },
  iconWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 9999,
  },
  timeWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  minutes: {
    fontSize: hp(2.2),
    fontWeight: "500",
    color: "#ffffff",
    marginBottom: 3,
  },
  minutesText: {
    fontSize: hp(1.5),
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 5,
  },
  title: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    marginBottom: 10,
  },
  ingredientsList: {
    marginTop: 10,
    marginLeft: 10,
    display: "flex",
    gap: 15,
  },
  ingredientsListWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  dots: {
    width: hp(1.7),
    height: hp(1.7),
    backgroundColor: "#F50B0B",
    borderRadius: 9999,
    marginHorizontal: 5,
  },
  ingredientsLisDetails: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },

  measure: {
    fontSize: hp(1.7),
    fontWeight: "900",
    color: "#525252",
  },
  ingredient: { fontSize: hp(1.7), fontWeight: "500", color: "#525252" },
  ingredientsContainer: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#E6E6E6",
  },
  instructionsText: {
    fontSize: hp(1.7),
    fontWeight: "500",
    color: "#525252",
    lineHeight: 24,
    textAlign: "justify",
  },
});
