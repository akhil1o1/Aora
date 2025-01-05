import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { searchPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";

import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";


const Search = () => {
   const { query } = useLocalSearchParams();
   console.log(query);

   const { data, refetch } = useAppwrite(() => searchPosts(query));

   console.log(data);

   useEffect(() => {
      refetch();
   }, [query]);

   return (
      <SafeAreaView className="bg-primary h-full">
         <FlatList
            data={data}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => <VideoCard video={item} />}
            ListHeaderComponent={() => (
               <View className={"my-6 px-4 space-y-6"}>
                  <View className="flex flex-row items-center justify-between mb-4">
                     <View>
                        <Text className="text-gray-100 text-sm font-pmedium">
                           Search Results
                        </Text>
                        <Text className="text-white text-2xl font-psemibold">
                           {query}
                        </Text>
                     </View>
                  </View>
                  <SearchInput
                     initialQuery={query}
                     placeholder={"Search for a video topic"}
                  />
               </View>
            )}
            ListEmptyComponent={() => (
               <EmptyState
                  title="No Videos Found"
                  subtitle="No Videos found for this search query"
               />
            )}
         />
      </SafeAreaView>
   );
};

export default Search;
