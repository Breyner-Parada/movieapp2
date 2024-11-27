import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { format } from "date-fns";
import { useAppSelector } from "@/redux/hooks";
import { getCurrentLanguage } from "@/redux/globalStates";
import { LinearGradient } from "expo-linear-gradient";
import {
  getMovieDetails,
  getMovieVideos,
  getRecommendedMovies,
} from "@/api";
import { MovieDetails, MovieVideos, SliderProps } from "@/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomFlatList from "@/components/CustomFlatList";
import VideoPlayer from "@/components/Video";

const details = () => {
  const currentLanguage = useAppSelector(getCurrentLanguage);
  const { detailId } = useLocalSearchParams();
  const [movieDetails, setMovieDetails] = React.useState<MovieDetails>();
  const [recommendedMovies, setRecommendedMovies] =
    React.useState<SliderProps>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showVideo, setShowVideo] = React.useState<boolean>(false);
  const [videos, setVideos] = React.useState<MovieVideos>();

  useEffect(() => {
    setIsLoading(true);
    getMovieDetails(Number(detailId), currentLanguage).then((data) => {
      setMovieDetails(data);
    });
    getRecommendedMovies(Number(detailId)).then((data) => {
      setRecommendedMovies(data);
    });

    getMovieVideos(Number(detailId), currentLanguage).then((data) => {
      setVideos(data);
      setIsLoading(false);
    });
  }, [detailId, currentLanguage]);

  const keyTrailerVideo = videos?.results
    .filter((video) => video.type === "Trailer")
    .find((video) => {
      if (currentLanguage === "en") {
        return video.site === "YouTube";
      } else {
        return video.name.includes("[Doblado]") && video.site === "YouTube";
      }
    })?.key;

  return (
    <ScrollView>
      <LinearGradient
        colors={["rgba(7,4,32,1)", "rgba(8,6,32,1)"]}
        className="absolute inset-0 w-full h-full"
      />
      {isLoading ? (
        <View className=" w-full h-screen flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <View className="flex-1">
          <View className="">
            <View>
              <Image
                className="w-full h-[300px]"
                src={`https://image.tmdb.org/t/p/original${movieDetails?.backdrop_path}`}
              />
              <LinearGradient
                colors={["rgba(0,0,0,0)", "rgba(7,4,32,1)"]}
                className="absolute inset-0"
              />
              <Ionicons
                name="play"
                size={60}
                color="white"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                onPress={() => setShowVideo(true)}
              />
            </View>

            <Text className="text-center text-[35px] text-white font-henny">
              {movieDetails?.title}
            </Text>
          </View>

          <View className="p-4">
            <Text className="text-white text-2xl font-bold my-4 pl-1">
              {currentLanguage === "en" ? "Original title" : "Título original"}:{" "}
              <Text className="text-white text-2xl">
                {movieDetails?.original_title}
              </Text>
            </Text>
            <Text className="text-white text-2xl font-bold pl-1 my-4">
              TMDB ID:{" "}
              <Text className="text-white text-2xl">
                {movieDetails?.id.toString()}
              </Text>
            </Text>
            <View className="w-16 flex-row">
              <Ionicons name="star" size={24} color="yellow" />
              <Text className="text-white text-2xl font-bold pl-1">
                {movieDetails?.vote_average.toFixed(1)}
              </Text>
            </View>

            <View className="my-4">
              <Text className="text-white text-2xl font-bold pl-1">
                {currentLanguage === "en" ? "Genres" : "Géneros"}:{" "}
              </Text>
              <FlatList
                className=""
                data={movieDetails?.genres || []}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="m-2 bg-slate-500 rounded-[20px] py-2 px-5 overflow-hidden"
                    onPress={() => {}}
                  >
                    <Link
                      href={{
                        pathname: "/(tabs)/categoryscreen/[categoryMovieId]",
                        params: { categoryMovieId: item.id },
                      }}
                    >
                      <Text className="font-bold z-50 text-white text-xl">
                        {item.name}
                      </Text>
                      <LinearGradient
                        colors={["rgba(37,35,61,100)", "rgba(37,35,61,100)"]}
                        className="absolute inset-0 rounded-[20px]"
                      />
                    </Link>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <Text className="text-white text-2xl my-4 font-bold pl-1">
              {currentLanguage === "en"
                ? "Release Date"
                : "Fecha de lanzamiento"}
              :{" "}
              <Text className="text-2xl">
                {movieDetails?.release_date
                  ? format(new Date(movieDetails.release_date), "MMMM dd, yyyy")
                  : "N/A"}
              </Text>
            </Text>
            <Text className="text-white text-2xl pl-1 font-bold my-4">
              {currentLanguage === "en" ? "Overview" : "Resumen"} {"\n"}
              <Text className="text-white text-lg">
                {movieDetails?.overview}
              </Text>
            </Text>
          </View>

          <CustomFlatList
            data={recommendedMovies}
            englishText={"Similar Movies"}
            spanishText={"Películas similares"}
          />
        </View>
      )}
      {/*VIDEO*/}
      {showVideo && (
        <View className="absolute justify-center items-center w-full h-full">
          <VideoPlayer keyMovie={keyTrailerVideo} setShowVideo={setShowVideo} />
          <View className="absolute inset-0 rounded-[20px] bg-black/70"></View>
        </View>
      )}
    </ScrollView>
  );
};

export default details;
