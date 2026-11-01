import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function PriceResultsScreen() {
  const { product, brand, store, price, unit } = useLocalSearchParams<{
    product: string;
    brand: string;
    store: string;
    price: string;
    unit: string;
  }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Price Results</Text>

      <Text>Product: {product}</Text>
      <Text>Brand: {brand || "Not specified"}</Text>
      <Text>Store: {store}</Text>
      <Text>Price: ${price}</Text>
      <Text>Unit: {unit}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
