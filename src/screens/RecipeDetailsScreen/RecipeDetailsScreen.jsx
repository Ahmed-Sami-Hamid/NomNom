import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";

// Helpers
import CachedImage from "../../helpers/image";

// Libraries
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import YoutubeIframe from "react-native-youtube-iframe";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";

// Icons
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

// Components
import Loading from "../../components/Loading";

// Styles
import { styles } from "./RecipeDetailsStyles";

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
