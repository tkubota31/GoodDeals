import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { ThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";

const mockComparisons = [
  { id: "1", store: "Aldi", price: 3.49 },
  { id: "2", store: "Walmart", price: 3.79 },
  { id: "3", store: "Target", price: 4.29 },
  { id: "4", store: "Market Basket", price: 3.29 },
];

export default function PriceResultsScreen() {
  const { product, brand, store, price, unit } = useLocalSearchParams<{
    product: string;
    brand: string;
    store: string;
    price: string;
    unit: string;
  }>();

  const colors = useTheme();
  const styles = createStyles(colors);

  const submittedPrice = Number(price);

  const cheapestComparison = mockComparisons.reduce((cheapest, current) =>
    current.price < cheapest.price ? current : cheapest,
  );

  const isBestPrice = submittedPrice <= cheapestComparison.price;

  const savings = submittedPrice - cheapestComparison.price;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Page Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Price Check Results</Text>
          <Text style={styles.description}>
            Here's the price you submitted.
          </Text>
        </View>

        {/* Submitted Price */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>YOUR SUBMISSION</Text>

          <Text style={styles.productName}>{product}</Text>

          {brand ? <Text style={styles.brand}>{brand}</Text> : null}

          <Text style={styles.price}>${submittedPrice.toFixed(2)}</Text>

          <Text style={styles.unit}>
            {unit} · {store}
          </Text>
        </View>

        {/* Deal Assessment */}
        <View style={styles.card}>
          <Text style={styles.dealLabel}>DEAL CHECK</Text>

          <Text style={styles.dealTitle}>
            {isBestPrice ? "You're getting the best price!" : "You could save"}
          </Text>

          {!isBestPrice && (
            <Text style={styles.savingsAmount}>${savings.toFixed(2)}</Text>
          )}

          <Text style={styles.dealDescription}>
            {isBestPrice
              ? "Your submitted price is the lowest among the compared stores."
              : `by shopping at ${cheapestComparison.store}.`}
          </Text>

          <View style={styles.divider} />

          <View style={styles.dealDetailRow}>
            <Text style={styles.detailLabel}>Your price</Text>
            <Text style={styles.detailValue}>${submittedPrice.toFixed(2)}</Text>
          </View>

          <View style={styles.dealDetailRow}>
            <Text style={styles.detailLabel}>Lowest price</Text>
            <Text style={styles.lowestPrice}>
              ${cheapestComparison.price.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Price Comparison */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Price Comparison</Text>

          <Text style={styles.comparisonDescription}>
            Compare prices across stores.
          </Text>

          {mockComparisons.map((item) => {
            const isCheapest = item.id === cheapestComparison.id;

            return (
              <View key={item.id} style={styles.comparisonRow}>
                <View style={styles.storeInfo}>
                  {isCheapest && (
                    <Text style={styles.bestPriceIndicator}>✓</Text>
                  )}
                  <Text
                    style={[
                      styles.comparisonStore,
                      isCheapest && styles.bestStore,
                    ]}
                  >
                    {item.store}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.comparisonPrice,
                    isCheapest && styles.lowestPrice,
                  ]}
                >
                  ${item.price.toFixed(2)}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: 20,
      gap: 16,
    },
    header: {
      marginBottom: 4,
    },
    title: {
      fontSize: 26,
      fontWeight: "700",
      color: colors.text,
    },
    description: {
      fontSize: 15,
      color: colors.textSecondary,
      marginTop: 6,
    },
    card: {
      backgroundColor: colors.backgroundElement,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 20,
    },
    cardLabel: {
      fontSize: 11,
      fontWeight: "700",
      letterSpacing: 1,
      color: colors.primary,
      marginBottom: 14,
    },
    productName: {
      fontSize: 21,
      fontWeight: "700",
      color: colors.text,
    },
    brand: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 4,
    },
    price: {
      fontSize: 36,
      fontWeight: "800",
      color: colors.primary,
      marginTop: 18,
    },
    unit: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 4,
    },
    dealLabel: {
      fontSize: 11,
      fontWeight: "700",
      letterSpacing: 1,
      color: colors.primary,
    },
    dealTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
      marginTop: 12,
    },
    savingsAmount: {
      fontSize: 36,
      fontWeight: "800",
      color: colors.primary,
      marginTop: 4,
    },
    dealDescription: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 4,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 18,
    },
    dealDetailRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 5,
    },
    detailLabel: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    detailValue: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.text,
    },
    lowestPrice: {
      fontSize: 15,
      fontWeight: "700",
      color: "#16A34A",
    },
    sectionTitle: {
      fontSize: 19,
      fontWeight: "700",
      color: colors.text,
    },
    comparisonDescription: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 5,
      marginBottom: 12,
    },
    comparisonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 14,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    storeInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    bestPriceIndicator: {
      color: "#16A34A",
      fontWeight: "700",
      fontSize: 16,
    },
    comparisonStore: {
      fontSize: 15,
      color: colors.text,
    },
    bestStore: {
      fontWeight: "700",
    },
    comparisonPrice: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.text,
    },
  });
