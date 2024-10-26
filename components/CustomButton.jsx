import { Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
   title,
   handlePress,
   containerStyles,
   textStyles,
   isLoading,
}) => {
   return (
      <TouchableOpacity
         className={`w-[320px] min-h-[60px] items-center justify-center bg-secondary rounded-xl ${containerStyles} ${
            isLoading ? "opacity-50" : ""
         }`}
         onPress={handlePress}
         activeOpacity={0.7}
         disabled={isLoading}
      >
         <Text className={`font-psemibold text-primary text-lg ${textStyles}`}>
            {title}
         </Text>
      </TouchableOpacity>
   );
};

export default CustomButton;
