import { useState, type ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { ThemeColors } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";

export type DropdownOption = {
  id: string;
  label: string;
};

type DropdownProps = {
  options: DropdownOption[];
  value: string;
  placeholder: string;
  onChange: (option: DropdownOption) => void;
  renderFooter?: (closeDropdown: () => void) => ReactNode;
};

export default function Dropdown({
  options,
  value,
  placeholder,
  onChange,
  renderFooter,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const colors = useTheme();
  const styles = createStyles(colors);

  const handleSelect = (option: DropdownOption) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <View>
      <Pressable
        style={styles.selectInput}
        onPress={() => setIsOpen((previous) => !previous)}
      >
        <Text style={[styles.selectText, !value && styles.placeholderText]}>
          {value || placeholder}
        </Text>

        <Text style={styles.arrow}>{isOpen ? "⌃" : "⌄"}</Text>
      </Pressable>

      {isOpen && (
        <View style={styles.dropdown}>
          {options.map((option) => (
            <Pressable
              key={option.id}
              style={styles.option}
              onPress={() => handleSelect(option)}
            >
              <Text style={styles.optionText}>{option.label}</Text>
            </Pressable>
          ))}
          {renderFooter?.(() => setIsOpen(false))}
        </View>
      )}
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    selectInput: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.backgroundElement,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 14,
    },
    selectText: {
      color: colors.text,
      fontSize: 16,
    },
    placeholderText: {
      color: colors.textSecondary,
    },
    arrow: {
      color: colors.textSecondary,
      fontSize: 18,
    },
    dropdown: {
      marginTop: 4,
      backgroundColor: colors.backgroundElement,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      overflow: "hidden",
    },
    option: {
      padding: 14,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    optionText: {
      color: colors.text,
      fontSize: 16,
    },
  });
