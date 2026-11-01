import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import Dropdown from "@/components/Dropdown";
import StoreDropdown from "@/components/StoreDropdown";
import type { ThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Store } from "@/types/store";

const unitOptions = [
  { id: "item", label: "Per item" },
  { id: "lb", label: "Per lb" },
  { id: "oz", label: "Per oz" },
  { id: "dozen", label: "Per dozen" },
  { id: "gallon", label: "Per gallon" },
  { id: "liter", label: "Per liter" },
  { id: "pack", label: "Per pack" },
];

const defaultStores: Store[] = [
  { id: "market-basket", name: "Market Basket" },
  { id: "aldi", name: "Aldi" },
  { id: "walmart", name: "Walmart" },
  { id: "target", name: "Target" },
  { id: "stop-and-shop", name: "Stop & Shop" },
  { id: "trader-joes", name: "Trader Joe's" },
];

export default function CheckPriceScreen() {
  const colors = useTheme();
  const styles = createStyles(colors);

  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [store, setStore] = useState("");
  const [stores, setStores] = useState<Store[]>(defaultStores);
  const [unit, setUnit] = useState("");

  const [touched, setTouched] = useState({
    product: false,
    store: false,
    price: false,
    unit: false,
  });

  const getProductError = (value: string) => {
    if (!value.trim()) {
      return "Please enter a product name.";
    }

    return "";
  };

  const getStoreError = (value: string) => {
    if (!value) {
      return "Please select a store.";
    }

    return "";
  };

  const getUnitError = (value: string) => {
    if (!value) {
      return "Please select a unit.";
    }

    return "";
  };

  const getPriceError = (value: string) => {
    const priceRegex = /^\d+(\.\d{1,2})?$/;

    if (!value.trim()) {
      return "Please enter a price.";
    }

    if (!priceRegex.test(value) || Number(value) <= 0) {
      return "Enter a valid price greater than zero.";
    }

    return "";
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const errors = {
    product: getProductError(product),
    store: getStoreError(store),
    price: getPriceError(price),
    unit: getUnitError(unit),
  };

  const handleCheckDeal = () => {
    setTouched({
      product: true,
      store: true,
      price: true,
      unit: true,
    });

    const isValid =
      !getProductError(product) &&
      !getStoreError(store) &&
      !getPriceError(price) &&
      !getUnitError(unit);

    if (!isValid) {
      return;
    }

    console.log("Product:", product.trim());
    console.log("Store:", store);
    console.log("Price:", price);
    console.log("Unit:", unit);
  };

  const handleAddStore = (newStore: Store) => {
    setStores((prevStores) => [...prevStores, newStore]);

    setStore(newStore.name);
  };
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
            value={product}
            onChangeText={setProduct}
            placeholder="e.g. Chicken Breast"
            placeholderTextColor={colors.textSecondary}
            onBlur={() => handleBlur("product")}
          />
          {touched.product && (
            <ErrorMessage message={errors.product} color="#DC2626" />
          )}
        </View>

        {/* Store */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Store</Text>

          <StoreDropdown
            stores={stores}
            value={store}
            onChange={(selectedStore) => {
              setStore(selectedStore.name);
              handleBlur("store");
            }}
            onAddStore={handleAddStore}
          />
          {touched.store && (
            <ErrorMessage message={errors.store} color="#DC2626" />
          )}
        </View>

        {/* Price */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Price</Text>

          <View style={styles.priceInputContainer}>
            <Text style={styles.dollarSign}>$</Text>

            <TextInput
              style={styles.priceInput}
              value={price}
              onChangeText={setPrice}
              placeholder="0.00"
              placeholderTextColor={colors.textSecondary}
              keyboardType="decimal-pad"
              onBlur={() => handleBlur("price")}
            />
          </View>
          {touched.price && (
            <ErrorMessage message={errors.price} color="#DC2626" />
          )}
        </View>

        {/* Unit */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Unit</Text>

          <Dropdown
            options={unitOptions}
            value={unit}
            placeholder="Select a unit"
            onChange={(option) => {
              setUnit(option.label);
              handleBlur("unit");
            }}
          />
          {touched.unit && (
            <ErrorMessage message={errors.unit} color="#DC2626" />
          )}
        </View>

        {/* Check Button */}
        <Pressable style={styles.checkButton} onPress={handleCheckDeal}>
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

function ErrorMessage({ message, color }: { message: string; color: string }) {
  if (!message) return null;

  return <Text style={{ color, fontSize: 13, marginTop: 6 }}>{message}</Text>;
}
