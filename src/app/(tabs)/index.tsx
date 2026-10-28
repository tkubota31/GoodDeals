import { Colors, ThemeColors } from "@/constants/theme";
import { router } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>DealCheck</Text>
          <Text style={styles.subtitle}>
            Know if you're getting a good deal.
          </Text>
        </View>

        {/* Main Action */}
        <Pressable
          style={styles.checkPriceButton}
          onPress={() => router.push("/check-price")}
        >
          <Text style={styles.checkPriceIcon}>🔍</Text>

          <View>
            <Text style={styles.checkPriceTitle}>Check a Price</Text>
            <Text style={styles.checkPriceSubtitle}>
              See if you're getting a good deal
            </Text>
          </View>
        </Pressable>

        {/* Recent Prices: Just Hardcoded for now*/}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Prices</Text>
            <Text style={styles.seeAll}>See All</Text>
          </View>

          <View style={styles.card}>
            <View>
              <Text style={styles.productName}>Chicken Breast</Text>
              <Text style={styles.storeName}>Market Basket</Text>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.price}>$2.99</Text>
              <Text style={styles.unit}>/ lb</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View>
              <Text style={styles.productName}>Large Eggs</Text>
              <Text style={styles.storeName}>Aldi</Text>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.price}>$2.49</Text>
              <Text style={styles.unit}>/ dozen</Text>
            </View>
          </View>
        </View>

        {/* Best Deals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔥 Best Deals</Text>

          <View style={styles.dealCard}>
            <View>
              <Text style={styles.productName}>Butter</Text>
              <Text style={styles.storeName}>Market Basket</Text>
            </View>

            <View>
              <Text style={styles.dealPrice}>$3.49</Text>
              <Text style={styles.dealText}>18% below average</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      padding: 20,
      paddingTop: 70,
      paddingBottom: 40,
      backgroundColor: colors.background,
    },

    header: {
      marginBottom: 30,
    },

    logo: {
      color: colors.text,
      fontSize: 32,
      fontWeight: "700",
    },

    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      marginTop: 5,
    },

    checkPriceButton: {
      backgroundColor: colors.primary,
      borderRadius: 16,
      padding: 20,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 35,
    },

    checkPriceIcon: {
      fontSize: 28,
      marginRight: 15,
    },

    checkPriceTitle: {
      color: colors.primaryText,
      fontSize: 20,
      fontWeight: "700",
    },

    checkPriceSubtitle: {
      color: colors.textSecondary,
      marginTop: 4,
      fontSize: 14,
    },

    section: {
      marginBottom: 30,
    },

    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },

    sectionTitle: {
      color: colors.text,
      fontSize: 21,
      fontWeight: "700",
      marginBottom: 12,
    },

    seeAll: {
      color: colors.textSecondary,
      fontSize: 14,
    },

    card: {
      backgroundColor: colors.backgroundElement,
      borderRadius: 14,
      padding: 18,
      marginBottom: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    productName: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "600",
    },

    storeName: {
      color: colors.textSecondary,
      marginTop: 4,
      fontSize: 13,
    },

    priceContainer: {
      flexDirection: "row",
      alignItems: "baseline",
    },

    price: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "700",
    },

    unit: {
      fontSize: 12,
      color: colors.textSecondary,
      marginLeft: 2,
    },

    dealCard: {
      backgroundColor: colors.backgroundElement,
      borderRadius: 14,
      padding: 18,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    dealPrice: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "700",
    },

    dealText: {
      fontSize: 12,
      color: colors.success,
      marginTop: 4,
    },
  });
