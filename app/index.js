import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
   return (
      <View className="flex-1 items-center justify-center bg-white">
         <Text className="text-3xl font-pblack">
            Aora the AI video generating app
         </Text>
         <StatusBar style="auto" />
         <Link href={"/profile"} style={{ color: "blue" }}>
            Profile
         </Link>
      </View>
   );
}
