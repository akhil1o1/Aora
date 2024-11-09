import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants/index";

const SearchInput = ({
   title,
   placeholder,
   onChangeText,
   value,
   extraStyles,
   ...props
}) => {
   return (
      <View className={`h-16 px-4 w-full bg-black-100 rounded-lg flex-row items-center ${extraStyles}`}>
         <TextInput
            placeholder={placeholder}
            className="text-base text-white flex-1 font-pregular mb-4"
            placeholderTextColor={"#7B7B8B"}
            onChangeText={onChangeText}
            value={value}
            {...props}
         />
         <TouchableOpacity>
            <Image source={icons.search} className="w-6 h-6" resizeMode="contain"/>
         </TouchableOpacity>
      </View>
   );
};

export default SearchInput;
