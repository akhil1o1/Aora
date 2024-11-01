import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants/index";

const FormField = ({
   title,
   placeholder,
   keyboardType,
   onChangeText,
   value,
   extraStyles,
   ...props
}) => {
   const [showPassword, setShowPassword] = useState(false);
   return (
      <View className={`space-y-2 ${extraStyles}`}>
         <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
         <View className="h-16 px-4 w-full bg-black-100 rounded-lg flex-row items-center">
            <TextInput
               placeholder={placeholder}
               keyboardType={keyboardType}
               className="text-gray-50 flex-1"
               placeholderTextColor={"#7B7B8B"}
               onChangeText={onChangeText}
               value={value}
               {...props}
               secureTextEntry={title === "Password" && !showPassword}
            />
            {title === "Password" && (
               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Image
                     source={!showPassword ? icons.eye : icons.eyeHide}
                     className="w-6 h-6"
                  />
               </TouchableOpacity>
            )}
         </View>
      </View>
   );
};

export default FormField;
