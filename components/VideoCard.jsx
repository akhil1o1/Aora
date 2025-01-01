import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Video, ResizeMode } from "expo-av";

import { icons } from "../constants";

const VideoCard = ({
   video: {
      title,
      thumbnail,
      video,
      creator: { username, avatar },
   },
}) => {
   const [play, setPlay] = useState(false);

   return (
      <View className="flex-col items-center px-4 mb-10">
         <View className="flex-row gap-3 items-start">
            <View className="justify-center items-center flex-row flex-1">
               <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                  <Image
                     source={{ uri: avatar }}
                     resizeMode="contain"
                     className="w-full h-full rounded-lg"
                  />
               </View>
               <View className="justify-center flex-1 ml-3 gap-y-1">
                  <Text
                     className="text-white font-psemibold "
                     numberOfLines={1}
                  >
                     {title}
                  </Text>
                  <Text
                     className="text-gray-100 text-xs fonr font-pregular"
                     numberOfLines={1}
                  >
                     {username || "Unknown"}
                  </Text>
               </View>
            </View>
            <View className="pt-2">
               <Image
                  source={icons.menu}
                  resizeMode="contain"
                  className="w-5 h-5"
               />
            </View>
         </View>
         {play ? (
            <Video
               source={{ uri: video }}
               className="w-full h-60 rounded-xl mt-3 bg-white"
               resizeMode={ResizeMode.CONTAIN}
               useNativeControls
               shouldPlay
               onPlaybackStatusUpdate={(status) => {
                  if (status.didJustFinish) {
                     setPlay(false);
                  }
               }}
            />
         ) : (
            <TouchableOpacity
               className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
               activeOpacity={0.7}
               onPress={() => setPlay(true)}
            >
               <Image
                  source={{ uri: thumbnail }}
                  resizeMode="cover"
                  className="w-full h-full rounded-xl mt-3"
               />
               <Image
                  source={icons.play}
                  className="absolute w-12 h-12"
                  resizeMode="contain"
               />
            </TouchableOpacity>
         )}
      </View>
   );
};

export default VideoCard;
