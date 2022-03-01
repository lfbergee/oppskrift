import { Button, StyleSheet } from "react-native";

import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { recipes } from "../utils/fetchRecipe";

export default function HomeScreen({ navigation }: RootTabScreenProps<"home">) {
  return (
    <View style={styles.container}>
      {recipes.map((recipe) => (
        <View key={recipe.title} style={styles.button}>
          <Button
            title={recipe.title}
            onPress={() =>
              navigation.navigate("Recipe", {
                recipe: recipe.title.toLowerCase(),
              })
            }
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginBottom: 16,
  },
});
