import React from "react";
import { Text, TouchableOpacity } from "react-native";

type Props = {
  isChecked: boolean;
  onPress: () => void;
};

export const Checkbox = ({ isChecked, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{isChecked ? "[x]" : "[  ]"}</Text>
    </TouchableOpacity>
  );
};
