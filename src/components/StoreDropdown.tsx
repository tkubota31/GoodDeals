import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import Dropdown from "@/components/Dropdown";
import type { ThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import type { Store } from "@/types/store";

type StoreDropdownProps = {
  stores: Store[];
  value: string;
  onChange: (store: Store) => void;
  onAddStore: (store: Store) => void;
};

export default function StoreDropdown({
  stores,
  value,
  onChange,
  onAddStore,
}: StoreDropdownProps) {
  const [isAddingStore, setIsAddingStore] = useState(false);
  const [newStoreName, setNewStoreName] = useState("");

  const colors = useTheme();
  const styles = createStyles(colors);

  const storeOptions = stores.map((store) => ({
    id: store.id,
    label: store.name,
  }));

  const submitNewStore = (closeDropdown: () => void) => {
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
    closeDropdown();
  };

  return (
    <Dropdown
      options={storeOptions}
      value={value}
      placeholder="Select a store"
      onChange={(option) => onChange({ id: option.id, name: option.label })}
      renderFooter={(closeDropdown) => (
        <View>
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
                onPress={() => submitNewStore(closeDropdown)}
              >
                <Text style={styles.saveStoreButtonText}>Add</Text>
              </Pressable>
            </View>
          )}
        </View>
      )}
    />
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
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
