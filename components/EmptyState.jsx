import { View, Text, Image } from "react-native";

import CustomButton from "./CustomButton";

import { images } from "../constants";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
   return (
      <View className="justify-center items-center px-4">
         <Image
            source={images.empty}
            className="w-[270px] h-[125px]"
            resizeMode="contain"
         />
         <Text className="text-white text-xl font-psemibold mt-2">{title}</Text>
         <Text className="text-gray-100 text-sm font-pmedium">{subtitle}</Text>

         <CustomButton
            title={"Create video"}
            handlePress={() => router.push("/create")}
            containerStyles={"w-full my-5"}
         />
      </View>
   );
};

export default EmptyState;
