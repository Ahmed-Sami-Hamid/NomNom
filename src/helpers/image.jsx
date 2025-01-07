import React, { useEffect, useState } from "react";
import Animated from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";

export default function CachedImage({ uri, style, ...restProps }) {
  const [cachedSource, setCachedSource] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const getCachedImage = async () => {
      try {
        const cachedImageData = await AsyncStorage.getItem(uri);
        if (cachedImageData && isMounted) {
          setCachedSource({ uri: cachedImageData });
        } else {
          const response = await fetch(uri);
          const imageBlob = await response.blob();
          const base64Data = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(imageBlob);
            reader.onloadend = () => {
              resolve(reader.result);
            };
          });
          await AsyncStorage.setItem(uri, base64Data);
          if (isMounted) setCachedSource({ uri: base64Data });
        }
      } catch (error) {
        console.error("Error caching image: ", error);
        if (isMounted) setCachedSource({ uri });
      }
    };
    getCachedImage();

    return () => {
      isMounted = false;
    };
  }, [uri]);

  return <Animated.Image source={cachedSource} style={style} {...restProps} />;
}
