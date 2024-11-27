import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useAppSelector } from "@/redux/hooks";
import { getCurrentLanguage } from "@/redux/globalStates";
import { getMoviesBySearch } from "@/api";
import { SliderProps } from "@/types";
import { Link } from "expo-router";

export default function explore() {
  const currentLanguage = useAppSelector(getCurrentLanguage);
  const [search, setSearch] = React.useState<string>("");
  const [movies, setMovies] = React.useState<SliderProps>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(1);

  useEffect(() => {
    setIsLoading(true);
    getMoviesBySearch(search, 1).then((data: SliderProps) => {
      setMovies(data);
      setIsLoading(false);
    });
  }, [search]);

  const handleLoadMore = () => {
    setIsLoading(true);
    getMoviesBySearch(search, page + 1).then((data: SliderProps) => {
      setMovies({
        ...data,
        results: [...(movies?.results || []), ...data.results],
      });
      setPage(page + 1);
      setIsLoading(false);
    });
  };

  return (
    <View className="flex-1">
      <LinearGradient
        colors={["rgba(7,4,32,1)", "rgba(8,6,32,1)"]}
        className="absolute inset-0 w-full h-screen"
      />
      <View className="p-4 mt-8">
        <TextInput
          placeholder={currentLanguage === "en" ? "Search" : "Buscar"}
          className="bg-white p-2 rounded-full w-full h-10 text-2xl"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <View className="flex-1 items-center h-screen">
          <FlatList
            numColumns={2}
            data={movies?.results || []}
            renderItem={({ item }) => (
              <TouchableOpacity className="m-5 rounded-md">
                <Link
                  href={{
                    pathname: "/(tabs)/detailscreen/[detailId]",
                    params: { detailId: item.id },
                  }}
                >
                  <View className="items-center w-40 h-[200px]">
                    <View className="w-full h-full rounded-md overflow-hidden">
                      <Image
                        className={`${
                          item.poster_path
                            ? "w-full h-full rounded-lg mx-2"
                            : "bg-gray-500 w-full h-full rounded-lg mx-2"
                        }`}
                        src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                      />
                      {item.poster_path ? null : (
                        <Text className="text-white text-center text-2xl absolute top-1/2 justify-center w-full">
                          {item.title}
                        </Text>
                      )}
                    </View>
                    {item.poster_path ? null : (
                      <Text className="text-white text-center">
                        {currentLanguage === "en"
                          ? "No image available"
                          : "No hay imagen disponible"}
                      </Text>
                    )}
                  </View>
                </Link>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => String(index)}
            showsHorizontalScrollIndicator={false}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isLoading ? (
                <View className="flex-1 items-center mt-5">
                  <ActivityIndicator size="large" color="#ffff" />
                </View>
              ) : null
            }
          />
        </View>
      )}
    </View>
  );
}
