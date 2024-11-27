import { View, Text } from "react-native";
import React from "react";
import { FlatList, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import { SliderProps } from "@/types";
import { getCurrentLanguage } from "@/redux/globalStates";
import { useAppSelector } from "@/redux/hooks";

type Props = {
  data: SliderProps | undefined;
  englishText: string;
  spanishText: string;
};

const CustomFlatList = (props: Props) => {
  const currentLanguage = useAppSelector(getCurrentLanguage);
  const { data, englishText, spanishText } = props;
  return (
    <View className="mt-10">
      <Text className="text-white font-semibold text-3xl p-2">
        {currentLanguage === "en" ? englishText : spanishText}
      </Text>
      <View>
        <FlatList
          data={data?.results || []}
          renderItem={({ item }) => (
            <TouchableOpacity className="m-2 rounded-md">
              <Link
                href={{
                  pathname: "/(tabs)/detailscreen/[detailId]",
                  params: { detailId: item.id },
                }}
              >
                <View className="items-center w-40 h-[200px]">
                  <Image
                    className="w-full h-full rounded-lg"
                    src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  />
                </View>
              </Link>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default CustomFlatList;
