import { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { fetchRecipe, FormattedRecipe } from "../utils/fetchRecipe";

const prettyTime = (time: number): string => {
  const hours = Math.floor(time);
  const minutes = Math.floor((time - hours) * 60);

  if (hours >= 0) {
    return `${hours}:${minutes}`.padEnd(5, "0");
  }

  return `Dagen før : ${`${`${24 + hours}`.padStart(2, "0")}:${minutes}`.padEnd(
    5,
    "0"
  )}`;
};

interface Props extends RootTabScreenProps<"Recipe"> {
  params: {
    recipe: string;
  };
}

export const Recipe = (props: Props) => {
  useEffect(() => {
    setRecipe(fetchRecipe(props.route?.params?.recipe));
    return () => {
      setRecipe(undefined);
    };
  }, [props.route?.params?.recipe]);

  const [recipe, setRecipe] = useState<FormattedRecipe | undefined>();
  const [finishTime, setFinishTime] = useState(19);

  const onChangeText = (text: string) => {
    setFinishTime(parseFloat(text));
  };

  if (!props.route?.params?.recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Velg en oppskrift</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Laster</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image style={styles.hero} source={recipe.img} />
        <Text style={styles.title}>{recipe.title}</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={`${finishTime}`}
        />
        {recipe.steps.map((step) => (
          <View key={step.title} style={styles.steps}>
            <View style={styles.stepTitleWrapper}>
              <Text style={styles.stepTime}>
                {prettyTime(finishTime - step.timeOffset)}
              </Text>
              <Text style={styles.stepTitle}>{step.title}</Text>
            </View>
            <Text style={styles.stepDesc}>{step.description}</Text>
            <View style={styles.separator}></View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  hero: {
    maxHeight: 400,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    width: "100%",
    margin: 16,
    marginTop: 48,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "rgba(0, 0, 0, 0.2)",
    padding: 10,
  },
  steps: {
    marginHorizontal: 16,
  },
  stepTitleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  stepTime: {
    fontSize: 24,
  },
  stepTitle: {
    fontSize: 18,
    marginTop: 4,
    marginStart: 16,
  },
  stepDesc: {
    marginStart: 0,
  },
  separator: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    marginVertical: 24,
    height: 1,
    width: "100%",
  },
});
