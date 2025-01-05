import { useState } from "react";
import { View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { router, usePathname } from "expo-router";

import { icons } from "../constants/index";

const SearchInput = ({
   title,
   initialQuery,
   placeholder,
   onChangeText,
   value,
   extraStyles,
   ...props
}) => {
   const [query, setQuery] = useState(initialQuery);

   const pathName = usePathname();

   return (
      <View
         className={`h-16 px-4 w-full bg-black-100 rounded-lg flex-row items-center ${extraStyles}`}
      >
         <TextInput
            placeholder={placeholder}
            className="text-base text-white flex-1 font-pregular mb-4"
            placeholderTextColor={"#cdcde0"}
            onChangeText={setQuery}
            value={query}
            {...props}
         />
         <TouchableOpacity
            onPress={() => {
               if (!query) {
                  Alert.alert(
                     "Missing Query",
                     "Please input something to search"
                  );
                  return;
               }
               if (pathName.startsWith("./search")) {
                  router.setParams({ query });
               } else {
                  router.push(`/search/${query}`);
               }
            }}
         >
            <Image
               source={icons.search}
               className="w-6 h-6"
               resizeMode="contain"
            />
         </TouchableOpacity>
      </View>
   );
};

export default SearchInput;
