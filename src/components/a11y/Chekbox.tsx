import React from "react";
import { Text, TouchableOpacity } from "react-native";

type Props = {
  isChecked: boolean;
  onPress?: () => void;
  disabled?: boolean;
};

const MIN_HIT_SIZE = 44;
export const CheckboxA11y = ({ isChecked, onPress, disabled }: Props) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      accessible={false}
      onPress={onPress}
      style={{
        width: MIN_HIT_SIZE,
        height: MIN_HIT_SIZE,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{isChecked ? "[x]" : "[  ]"}</Text>
    </TouchableOpacity>
  );
};
