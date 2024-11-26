import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { getDiscoverMovies } from "@/api";
import { SliderProps } from "@/types";
import Slider from "@/components/Slider";


const Home = () => {
  const [discoverMovies, setDiscoverMovies] = React.useState<SliderProps>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getDiscoverMovies().then((data) => {
      data.results.splice(1, data.results.length - 7);
      setDiscoverMovies(data);
      setIsLoading(false);
    });
  }, []);


  return (
    <ScrollView className="">
      <LinearGradient
        colors={["rgba(7,4,32,1)", "rgba(8,6,32,1)"]}
        className="absolute inset-0 w-full h-full"
      />

      {isLoading ? (
        <View className="flex-1 items-center mt-5">
          <ActivityIndicator size="large" color="#ffff" />
        </View>
      ) : (
        <Slider movies={discoverMovies?.results || []} />
      )}

      <View className="px-5">
        <Text className="text-white text-2xl font-bold mt-5">Popular Movies</Text>
      </View>
    </ScrollView>
  );
};

export default Home;
