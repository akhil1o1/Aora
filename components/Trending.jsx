import { useState } from "react";
import {
   FlatList,
   TouchableOpacity,
   ImageBackground,
   Image,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import * as AnimaTable from "react-native-animatable";

import { icons } from "../constants";

const zoomIn = {
   0: {
      scale: 0.8,
   },
   1: {
      scale: 1,
   },
};

const zoomOut = {
   0: {
      scale: 1,
   },
   1: {
      scale: 0.8,
   },
};

const TendingItem = ({ activeItem, item }) => {
   const [play, setPlay] = useState(false);
   // console.log(activeItem, item.$id)
   return (
      <AnimaTable.View
         className="mr-7"
         animation={activeItem === item.$id ? zoomIn : zoomOut}
         duration={500}
      >
         {play ? (
            <Video
               source={{ uri: item.video }}
               className="w-52 h-72 rounded-[35px] bg-white"
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
               className="relative justify-center items-center"
               activeOpacity={0.7}
               onPress={() => setPlay(true)}
            >
               <ImageBackground
                  source={{
                     uri: item.thumbnail,
                  }}
                  className="w-52 h-72 rounded-[35px] overflow-hidden shadow-lg shadow-black/40"
                  resizeMode="cover"
               />
               <Image
                  source={icons.play}
                  className="w-12 h-12 absolute"
                  resizeMode="contain"
               />
            </TouchableOpacity>
         )}
      </AnimaTable.View>
   );
};

const Trending = ({ posts }) => {
   // console.log(posts)
   const [activeItem, setActiveItem] = useState();

   const viewableItemsChanged = ({ viewableItems }) => {
      if (viewableItems.length > 0) {
         setActiveItem(viewableItems[0].key);
      }
   };
   return (
      <FlatList
         data={posts}
         keyExtractor={(item) => item.$id}
         renderItem={({ item }) => (
            <TendingItem activeItem={activeItem} item={item} />
         )}
         onViewableItemsChanged={viewableItemsChanged}
         viewabilityConfig={{
            itemVisiblePercentThreshold: 70,
         }}
         contentOffset={{ x: 170 }}
         horizontal
      />
   );
};

export default Trending;
