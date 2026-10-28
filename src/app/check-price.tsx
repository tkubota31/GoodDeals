import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from "react-native";

import { Colors, ThemeColors } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CheckPriceScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const styles = createStyles(colors);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Check Price</Text>

        <Text style={styles.description}>
          Enter a product and its current price to see if it's a good deal.
        </Text>

        {/* Product */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Product</Text>

          <TextInput
            style={styles.input}
            placeholder="e.g. Chicken Breast"
            placeholderTextColor="#999"
          />
        </View>

        {/* Store */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Store</Text>

          <Pressable style={styles.selectInput}>
            <Text style={styles.selectText}>Select a store</Text>
            <Text style={styles.arrow}>⌄</Text>
          </Pressable>
        </View>

        {/* Price */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Price</Text>

          <View style={styles.priceInputContainer}>
            <Text style={styles.dollarSign}>$</Text>

            <TextInput
              style={styles.priceInput}
              placeholder="0.00"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
            />
          </View>
        </View>

        {/* Unit */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Unit</Text>

          <Pressable style={styles.selectInput}>
            <Text style={styles.selectText}>Per item</Text>
            <Text style={styles.arrow}>⌄</Text>
          </Pressable>
        </View>

        {/* Check Button */}
        <Pressable style={styles.checkButton}>
          <Text style={styles.checkButtonText}>Check Deal</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      padding: 20,
      paddingTop: 70,
      paddingBottom: 40,
    },

    title: {
      color: colors.text,
      fontSize: 32,
      fontWeight: "700",
    },

    description: {
      fontSize: 16,
      color: colors.textSecondary,
      lineHeight: 23,
      marginTop: 8,
      marginBottom: 35,
    },

    fieldContainer: {
      marginBottom: 24,
    },

    label: {
      color: colors.text,
      fontSize: 15,
      fontWeight: "600",
      marginBottom: 8,
    },

    input: {
      backgroundColor: colors.backgroundElement,
      color: colors.text,
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
    },

    selectInput: {
      backgroundColor: colors.backgroundElement,
      borderRadius: 12,
      padding: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    selectText: {
      fontSize: 16,
      color: colors.textSecondary,
    },

    arrow: {
      fontSize: 20,
      color: colors.textSecondary,
    },

    priceInputContainer: {
      backgroundColor: colors.backgroundElement,
      borderRadius: 12,
      paddingLeft: 16,
      flexDirection: "row",
      alignItems: "center",
    },

    dollarSign: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "600",
    },

    priceInput: {
      color: colors.text,
      flex: 1,
      padding: 16,
      fontSize: 16,
    },

    checkButton: {
      backgroundColor: colors.primary,
      borderRadius: 14,
      padding: 18,
      alignItems: "center",
      marginTop: 10,
    },

    checkButtonText: {
      color: colors.primaryText,
      fontSize: 17,
      fontWeight: "700",
    },
  });
