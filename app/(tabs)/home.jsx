import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, Image, RefreshControl } from "react-native";

import { getAllPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";

import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";

import { images } from "../../constants/index";

const Home = () => {
   const [refreshing, setRefreshing] = useState(false);

   const { data, isLoading, refetch } = useAppwrite(getAllPosts);

   console.log(data);

   const onRefresh = async () => {
      setRefreshing(true);
      // re call videos -> if any new videos appeared
      await refetch();
      setRefreshing(false);
   };

   return (
      <SafeAreaView className="bg-primary h-full">
         <FlatList
            data={data}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
              <VideoCard video={item}/>
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
                  <View className="w-full flex-1 pt-5 pb-8">
                     <Text className="text-gray-100 text-sm font-pregular">
                        Trending videos
                     </Text>

                     <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }]} />
                  </View>
               </View>
            )}
            ListEmptyComponent={() => (
               <EmptyState
                  title="No Videos Found"
                  subtitle="Be the first one to upload a video"
               />
            )}
            refreshControl={
               <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
         />
      </SafeAreaView>
   );
};

export default Home;
