import { Text, View, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";

import { icons } from "../../constants";

const TabsLayout = () => {
   const TabIcon = ({ icon, color, focused, name }) => {
      return (
         <View className="flex items-center justify-center gap-2">
            <Image
               source={icon}
               resizeMode="contain"
               tintColor={color}
               className="w-6 h-6"
            />
            <Text
               className={`${focused ? "font-psemibold" : "font-pregular"}`}
               style={{ color: color }}
            >
               {name}
            </Text>
         </View>
      );
   };

   return (
      <>
         <Tabs
            screenOptions={{
               tabBarShowLabel: false,
               tabBarActiveTintColor: "#ffa001",
               tabBarInactiveTintColor: "#cdcde0",
               tabBarStyle: {
                  backgroundColor: "#161622",
                  borderTopWidth: 1,
                  borderTopColor: "#232533",
                  height: 80,
               },
            }}
         >
            <Tabs.Screen
               name="home"
               options={{
                  title: "Home",
                  headerShown: false,
                  tabBarIcon: ({ color, focused }) => (
                     <TabIcon
                        color={color}
                        focused={focused}
                        name={"Home"}
                        icon={icons.home}
                     />
                  ),
               }}
            />
            <Tabs.Screen
               name="bookmark"
               options={{
                  title: "Bookmark",
                  headerShown: false,
                  tabBarIcon: ({ color, focused }) => (
                     <TabIcon
                        color={color}
                        focused={focused}
                        name={"Bookmark"}
                        icon={icons.bookmark}
                     />
                  ),
               }}
            />
            <Tabs.Screen
               name="create"
               options={{
                  title: "Create",
                  headerShown: false,
                  tabBarIcon: ({ color, focused }) => (
                     <TabIcon
                        color={color}
                        focused={focused}
                        name={"Create"}
                        icon={icons.plus}
                     />
                  ),
               }}
            />

            <Tabs.Screen
               name="profile"
               options={{
                  title: "Profile",
                  headerShown: false,
                  tabBarIcon: ({ color, focused }) => (
                     <TabIcon
                        color={color}
                        focused={focused}
                        name={"Profile"}
                        icon={icons.profile}
                     />
                  ),
               }}
            />
         </Tabs>
      </>
   );
};

export default TabsLayout;
