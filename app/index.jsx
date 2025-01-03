import 'react-native-url-polyfill/auto'

import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Image, ScrollView } from "react-native";
import { router, Redirect } from "expo-router";

import { useGlobalContext } from '../context/GlobalProvider';
import { images } from "../constants";
import CustomButton from "../components/CustomButton";


export default function App() {
   const {isLoading, isLoggedIn} = useGlobalContext();
   

   if(!isLoading && isLoggedIn) {
      return <Redirect href={"/home"}/>
   }

   return (
      <SafeAreaView className="bg-primary h-full">
         <ScrollView contentContainerStyle={{ height: "100%" }}>
            <View className="w-full justify-center items-center min-h-[90vh] px-4 gap-2">
               <Image
                  source={images.logo}
                  className={"w-[132px] h-[84px]"}
                  resizeMode="contain"
               />
               <Image
                  source={images.cards}
                  className={"max-w-[380px] h-[300px]"}
                  resizeMode="contain"
               />
               <View>
                  <Text
                     className={
                        "text-white font-psemibold text-3xl text-center tracking-tighter"
                     }
                  >
                     Discover Endless Possibilities with{" "}
                     <Text className={"text-secondary"}>Aora</Text>
                  </Text>
                  <Image
                     source={images.path}
                     resizeMode="contain"
                     className="w-[130px] h-[15px] absolute -bottom-1.5 -right-7"
                  />
               </View>
               <Text className="text-gray-100 mt-4 text-center px-4">
                  Where Creativity Meets Innovation: Embark on a Journey of
                  Limitless Exploration with Aora
               </Text>
               <CustomButton
                  title={"Continue with Email"}
                  handlePress={() => router.push("/sign-in")}
                  containerStyles={"mt-7"}
               />
            </View>
         </ScrollView>
      </SafeAreaView>
   );
}
