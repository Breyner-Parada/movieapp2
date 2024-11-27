import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

type Props = {
  keyMovie: string | undefined;
  setShowVideo: (showVideo: boolean) => void;
};

const VideoScreen = ({ keyMovie, setShowVideo }: Props) => {
  if (!keyMovie) {
    return (
      <View style={styles.contentContainer}>
        <View>
          <Text className="text-white text-center text-3xl">
            Lo siento, no hay video disponible en idioma español para esta
            película. Por favor, intenta cambiando el idioma o prueba otra película.
          </Text>
        </View>
        <Ionicons
          name="close"
          size={50}
          color="white"
          onPress={() => setShowVideo(false)}
        />
      </View>
    );
  }

  return (
    <View style={styles.contentContainer}>
      <WebView
        source={{ uri: `https://www.youtube.com/embed/${keyMovie}` }}
        style={styles.video}
      />
      <View style={styles.controlsContainer}>
        <Ionicons
          name="close"
          size={50}
          color="white"
          onPress={() => setShowVideo(false)}
        />
      </View>
    </View>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  contentContainer: {
    width: "100%",
    height: 400,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  video: {
    zIndex: 1,
    width: 375,
  },
  controlsContainer: {
    padding: 10,
  },
});
