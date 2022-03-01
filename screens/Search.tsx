import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { FormattedRecipe, recipes } from "../utils/fetchRecipe";

export default function Search({ navigation }: RootTabScreenProps<"Search">) {
  const [searchString, setSearchString] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState<
    FormattedRecipe[] | undefined
  >();

  useEffect(() => {
    if (!searchString) {
      setFilteredRecipes(undefined);
    } else {
      setFilteredRecipes(
        recipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(searchString.toLowerCase())
        )
      );
    }
  }, [searchString]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setSearchString}
        value={searchString}
      />
      <ScrollView>
        {filteredRecipes?.map((recipe) => (
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    margin: 12,
    width: 200,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "rgba(0, 0, 0, 0.2)",
    padding: 10,
  },
  button: {
    marginBottom: 16,
  },
});
