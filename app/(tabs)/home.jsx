import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, Image } from "react-native";

import SearchInput from "../../components/SearchInput";

import { images } from "../../constants/index";

const Home = () => {
   return (
      <SafeAreaView className="bg-primary h-full">
         <FlatList
            data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
               <Text className="text-white text-2xl px-8">{item.id}</Text>
            )}
            ListHeaderComponent={() => (
               <View className={"my-6 px-4 space-y-6"}>
                  <View className="flex flex-row items-center justify-between">
                     <View>
                        <Text className="text-gray-100 text-sm font-pmedium">
                           Welcome back to
                        </Text>
                        <Text className="text-white text-2xl font-psemibold">
                           Aora
                        </Text>
                     </View>
                     <View>
                        <Image
                           source={images.logoSmall}
                           resizeMode="contain"
                           className="w-[30px] h-[35px]"
                        />
                     </View>
                  </View>
                  <SearchInput placeholder={"Search for a video topic"} />
                  <View>
                     
                  </View>
               </View>
            )}
         />
      </SafeAreaView>
   );
};

export default Home;
