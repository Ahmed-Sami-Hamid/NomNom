import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import Animated, { FadeInDown } from "react-native-reanimated";
import Loading from "./Loading";
import CachedImage from "../helpers/image";
import { useNavigation } from "@react-navigation/native";

export default function Recipes({ categories, meals }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Recipes</Text>
      <View style={styles.listContainer}>
        {categories?.length === 0 || meals?.length === 0 ? (
          <Loading size="large" />
        ) : (
          <FlatList
            data={meals || []}
            keyExtractor={(item) =>
              item.idMeal?.toString() || Math.random().toString()
            }
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <RecipeCard item={item} index={index} navigation={navigation} />
            )}
            onEndReachedThreshold={0.1}
            ListEmptyComponent={() => (
              <Text
                style={{ textAlign: "center", marginTop: 20, color: "#aaa" }}
              >
                No meals found.
              </Text>
            )}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 20,
            }}
          />
        )}
      </View>
    </View>
  );
}

const RecipeCard = ({ item, index, navigation }) => {
  const isEven = index % 2 === 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <View style={styles.cardWrapper}>
        <Pressable
          onPress={() => navigation.navigate("RecipeDetails", { ...item })}
          style={[
            styles.card,
            { paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 },
          ]}
        >
          {/* <Image source={{ uri: item.strMealThumb }} style={styles.image} /> */}
          <CachedImage
            source={{ uri: item.strMealThumb }}
            // style={[styles.image, { height: isEven ? hp(25) : hp(35) }]}
            style={styles.image}
          />

          <Text style={styles.cardText}>
            {item.strMeal.length > 20
              ? `${item.strMeal.slice(0, 20)}...`
              : item.strMeal}
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: hp(2),
    width: "100%",
  },
  headerText: {
    fontSize: hp(3),
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: hp(1),
  },
  listContainer: {
    flex: 1,
  },
  cardWrapper: {
    marginBottom: hp(2),
    flex: 1,
    alignItems: "center",
  },
  card: {
    width: "100%",
    justifyContent: "center",
  },
  image: {
    width: wp(40),
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    height: hp(35),
  },
  cardText: {
    fontSize: hp(1.5),
    fontWeight: "600",
    color: "#4B5563",
    marginLeft: 8,
    marginTop: 4,
  },
});
