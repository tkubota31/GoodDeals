import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { ThemeColors } from "@/constants/theme";

import { Store } from "@/types/store";

type StoreDropdownProps = {
  stores: Store[];
  value: string;
  onChange: (store: Store) => void;
  onAddStore: (store: Store) => void;
  colors: ThemeColors;
};

export default function StoreDropdown({
  stores,
  value,
  onChange,
  onAddStore,
  colors,
}: StoreDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddingStore, setIsAddingStore] = useState(false);
  const [newStoreName, setNewStoreName] = useState("");

  const styles = createStyles(colors);

  const handleSelect = (store: Store) => {
    onChange(store);
    setIsOpen(false);
  };

  const submitNewStore = () => {
    const trimmedName = newStoreName.trim();

    if (!trimmedName) {
      return;
    }

    const newStore: Store = {
      id: trimmedName.toLowerCase().replace(/\s+/g, "-"),
      name: trimmedName,
    };

    onAddStore(newStore);

    setNewStoreName("");
    setIsAddingStore(false);
    setIsOpen(false);
  };

  return (
    <View>
      {/* Selected store */}
      <Pressable
        style={styles.selectInput}
        onPress={() => setIsOpen((previous) => !previous)}
      >
        <Text style={[styles.selectText, !value && styles.placeholderText]}>
          {value || "Select a store"}
        </Text>

        <Text style={styles.arrow}>{isOpen ? "⌃" : "⌄"}</Text>
      </Pressable>

      {/* Dropdown options */}
      {isOpen && (
        <View style={styles.dropdown}>
          {stores.map((store) => (
            <Pressable
              key={store.id}
              style={styles.option}
              onPress={() => handleSelect(store)}
            >
              <Text style={styles.optionText}>{store.name}</Text>
            </Pressable>
          ))}

          {/* Add a store */}
          <Pressable
            style={styles.addOption}
            onPress={() => setIsAddingStore(true)}
          >
            <Text style={styles.addOptionText}>+ Add a store</Text>
          </Pressable>
          {isAddingStore && (
            <View style={styles.addStoreContainer}>
              <TextInput
                style={styles.addStoreInput}
                placeholder="Enter store name"
                placeholderTextColor={colors.textSecondary}
                value={newStoreName}
                onChangeText={setNewStoreName}
                autoFocus
              />

              <Pressable
                style={styles.saveStoreButton}
                onPress={submitNewStore}
              >
                <Text style={styles.saveStoreButtonText}>Add</Text>
              </Pressable>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    selectInput: {
      backgroundColor: colors.backgroundElement,
      borderRadius: 12,
      padding: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    selectText: {
      color: colors.text,
      fontSize: 16,
    },

    placeholderText: {
      color: colors.textSecondary,
    },

    arrow: {
      fontSize: 20,
      color: colors.textSecondary,
    },

    dropdown: {
      backgroundColor: colors.backgroundElement,
      borderRadius: 12,
      marginTop: 6,
      overflow: "hidden",
    },

    option: {
      padding: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },

    optionText: {
      color: colors.text,
      fontSize: 16,
    },

    addOption: {
      padding: 16,
    },

    addOptionText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "600",
    },
    addStoreContainer: {
      padding: 16,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
    },

    addStoreInput: {
      backgroundColor: colors.background,
      color: colors.text,
      borderRadius: 10,
      padding: 14,
      fontSize: 16,
      marginBottom: 10,
    },

    saveStoreButton: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      padding: 12,
      alignItems: "center",
    },

    saveStoreButtonText: {
      color: colors.primaryText,
      fontSize: 15,
      fontWeight: "600",
    },
  });
