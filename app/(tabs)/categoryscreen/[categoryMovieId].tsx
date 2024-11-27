import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { getMoviesByCategory, getMoviesCategories } from "@/api";
import { CategoriesProps, Genre, SliderProps } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import { getCurrentLanguage } from "@/redux/globalStates";
import { useAppSelector } from "@/redux/hooks";

type Props = {};

const categoryMovieId = (props: Props) => {
  const currentLanguage = useAppSelector(getCurrentLanguage);
  const { categoryMovieId } = useLocalSearchParams();
  const [moviesByCategories, setMoviesByCategories] =
    React.useState<SliderProps>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<Genre[]>([]);
  const [page, setPage] = React.useState<number>(1);

  useEffect(() => {
    getMoviesCategories(currentLanguage).then((data: CategoriesProps) => {
      setCategories(data.genres);
    });
  }, [currentLanguage]);

  useEffect(() => {
    setPage(1);
    getMoviesByCategory(Number(categoryMovieId), 1).then((data: SliderProps) => {
      setMoviesByCategories(data);
    });
  }, [categoryMovieId]);

  const handleLoadMore = () => {
    setIsLoading(true);
    getMoviesByCategory(Number(categoryMovieId), page + 1).then((data: SliderProps) => {
      setMoviesByCategories({
        ...data,
        results: [...(moviesByCategories?.results || []), ...data.results],
      });
      setPage(page + 1);
      setIsLoading(false);
    });
  };

  return (
    <View className="flex-1">
      <LinearGradient
        colors={["rgba(7,4,32,1)", "rgba(8,6,32,1)"]}
        className="absolute inset-0 w-full h-full"
      />
      <View className="p-4">
        <Text className="text-white text-3xl font-bold">
          {
            categories?.find((item) => item.id === Number(categoryMovieId))
              ?.name
          }
        </Text>
      </View>
      <View className="flex-1 items-center h-screen">
        <FlatList
          numColumns={2}
          data={moviesByCategories?.results || []}
          renderItem={({ item }) => (
            <TouchableOpacity className="m-5 rounded-md">
              <Link
                href={{
                  pathname: "/(tabs)/detailscreen/[detailId]",
                  params: { detailId: item.id },
                }}
              >
                <View className="items-center w-40 h-[200px]">
                  <Image
                    className="w-full h-full rounded-lg mx-2"
                    src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  />
                </View>
              </Link>
            </TouchableOpacity>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoading ? (
              <View className="flex-1 items-center mt-5">
                <ActivityIndicator size="large" color="#ffff" />
              </View>
            ) : null
          }
          keyExtractor={(item, index) => String(index)}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default categoryMovieId;
