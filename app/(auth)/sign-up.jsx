import { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, ScrollView, Image, Alert } from "react-native";
import { Link, router } from "expo-router";

import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { images } from "../../constants/index";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

const SignUp = () => {
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);

   const { setUser, setIsLoggedIn } = useGlobalContext();

   const submit = async () => {
      // console.table({ username, email, password });
      if (
         !email.trim() ||
         !password.trim() ||
         !username.trim()
      ) {
         Alert.alert("Error", "Please fill in all the details.");
         return;
      }

      setIsSubmitting(true);
      try {
         const result = await createUser(email, password, username);

         // set the result/user details as global state
         setUser(result);
         setIsLoggedIn(true);

         router.replace("/home");
      } catch (error) {
         Alert.alert("Error", error.message);
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <>
         <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ height: "100%" }}>
               <View className={"w-full my-auto justify-center px-4"}>
                  <View>
                     <Image
                        source={images.logo}
                        resizeMode="contain"
                        className={"w-[115px] h-[35px]"}
                     />
                  </View>
                  <View className="mt-4">
                     <Text className={"text-white font-psemibold text-2xl"}>
                        Sign Up
                     </Text>
                  </View>
                  <FormField
                     title={"Username"}
                     placeholder={"Your your username"}
                     onChangeText={(username) => setUsername(username)}
                     value={username}
                     extraStyles={"mt-4"}
                  />
                  <FormField
                     title={"Email"}
                     placeholder={"Enter your email"}
                     onChangeText={(email) => setEmail(email)}
                     value={email}
                     extraStyles={"mt-4"}
                     keyboardType={"email-address"}
                  />
                  <FormField
                     title={"Password"}
                     placeholder={"Enter Password"}
                     onChangeText={(password) => setPassword(password)}
                     extraStyles={"mt-4"}
                     value={password}
                  />
                  <CustomButton
                     title={"Sign Up "}
                     handlePress={submit}
                     containerStyles={"mt-7"}
                     isLoading={isSubmitting}
                  />
                  <View className="mt-4">
                     <Text className="text-lg text-gray-100 text-center font-pregular">
                        Already have an account?{" "}
                        <Link
                           className="text-secondary font-psemibold"
                           href={"/sign-in"}
                        >
                           Sign In
                        </Link>
                     </Text>
                  </View>
               </View>
            </ScrollView>
         </SafeAreaView>
      </>
   );
};

export default SignUp;
