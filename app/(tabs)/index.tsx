import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useAppSelector } from "@/redux/hooks";
import { getCurrentLanguage } from "@/redux/globalStates";
import {
  getDiscoverMovies,
  getMoviesCategories,
  getMostPopularMovies,
  getUpComingMovies,
  getTrendingMovies,
} from "@/api";
import { SliderProps, Genre, CategoriesProps } from "@/types";
import Slider from "@/components/Slider";
import CustomFlatList from "@/components/CustomFlatList";
import { Link } from "expo-router";

export default function index() {
  const [showModal, setShowModal] = React.useState<boolean>(true);
  const [movies, setMovies] = React.useState<SliderProps>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<Genre[]>([]);
  const [mostPopularMovies, setMostPopularMovies] =
    React.useState<SliderProps>();
  const [trendingMovies, setTrendingMovies] = React.useState<SliderProps>();
  const [upComingMovies, setUpComingMovies] = React.useState<SliderProps>();
  const currentLanguage = useAppSelector(getCurrentLanguage);

  useEffect(() => {
    setIsLoading(true);
    getDiscoverMovies().then((data: SliderProps) => {
      data.results.splice(1, data.results.length - 8);
      setMovies(data);
    });

    getMostPopularMovies().then((data: SliderProps) => {
      setMostPopularMovies(data);
    });

    getTrendingMovies().then((data: SliderProps) => {
      setTrendingMovies(data);
    });

    getUpComingMovies().then((data: SliderProps) => {
      setUpComingMovies(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    getMoviesCategories(currentLanguage).then((data: CategoriesProps) => {
      setCategories(data.genres);
    });
  }, [currentLanguage]);

  console.log(currentLanguage);

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
        <Slider movies={movies?.results || []} />
      )}

      {/*CATEGORIES*/}

      <View className="">
        <Text className="text-white font-semibold text-3xl p-2">
          {currentLanguage === "en" ? "Categories" : "Categorias"}
        </Text>
        <View>
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <TouchableOpacity className="m-2 bg-slate-500 rounded-[20px] py-2 px-5 overflow-hidden relative">
                <Link
                  replace
                  href={{
                    pathname: "/(tabs)/categoryscreen/[categoryMovieId]",
                    params: { categoryMovieId: item.id },
                  }}
                >
                  <Text className="font-bold z-50 text-white text-xl">
                    {item.name}
                  </Text>
                </Link>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>

      {/*TRENDING*/}

      <CustomFlatList
        data={trendingMovies}
        englishText="Trending"
        spanishText="Tendencias"
      />
      {/*MOST POPULAR*/}

      <CustomFlatList
        data={mostPopularMovies}
        englishText="Most Popular"
        spanishText="Mas Populares"
      />

      {/*UPCOMING*/}

      <CustomFlatList
        data={upComingMovies}
        englishText="Upcoming"
        spanishText="Proximamente"
      />

      {showModal && (
        <View className="h-screen w-screen absolute">
          <View className="absolute inset-0 bg-black/50 justify-center items-center"></View>
          <View className="bg-white p-5 rounded-lg w-3/4 mx-auto my-auto">
            <Text className="text-[35px] text-green-500 font-bold mb-4">
              {currentLanguage === "en" ? "Welcome to " : "Bienvenidos a"}{" "}
              MoviesRoom! 👋
            </Text>
            <Text className="text-[25px] mb-4">
              {currentLanguage === "en"
                ? "This is a simple app that uses the TMDB API to show you the latest movies with their details."
                : "Esta es una simple app que usa la API de TMDB para mostrarte las últimas películas con sus detalles."}
            </Text>
            <View className="flex flex-row justify-end">
              <Text
                className="text-blue-500"
                onPress={() => setShowModal(false)}
              >
                Close
              </Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
