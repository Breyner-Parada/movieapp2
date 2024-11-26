import { View, Dimensions, Image } from "react-native";
import React from "react";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import { Results } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import { useSharedValue } from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type Props = {
  movies: Results[];
};

const Slider = (props: Props) => {
  const { movies } = props;
  const progress = useSharedValue<number>(0);

  const ref = React.useRef<ICarouselInstance>(null);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };
  const { width } = Dimensions.get("screen");
  return (
    <View className="h-[280px]">
      <View className="">
        <Carousel
          ref={ref}
          loop
          autoPlay
          scrollAnimationDuration={2500}
          width={width}
          height={300}
          data={movies || []}
          onProgressChange={progress}
          renderItem={({ item }) => (
            <View className="items-center w-[411px] h-[250px]">
              <Image
                className="w-full h-full"
                src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
              />
              <LinearGradient
                colors={["rgba(0,0,0,0)", "rgba(7,4,32,1)"]}
                className="absolute inset-0"
              />
            </View>
          )}
        />
        <GestureHandlerRootView>
          <Pagination.Basic
            progress={progress}
            data={movies}
            dotStyle={{
              backgroundColor: "rgba(37,35,61,100)",
              width: 10,
              height: 10,
              borderRadius: 5,
            }}
            activeDotStyle={{ backgroundColor: "#f1f1f1" }}
            containerStyle={{
              gap: 5,
              padding: 5,
              justifyContent: "center",
              alignItems: "flex-end",
              width: "100%",
              height: 250,
            }}
            onPress={onPressPagination}
          />
        </GestureHandlerRootView>
      </View>
    </View>
  );
};

export default Slider;
