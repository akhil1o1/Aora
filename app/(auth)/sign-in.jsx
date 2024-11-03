import { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, ScrollView, Image, Alert } from "react-native";
import { Link, router } from "expo-router";

import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { images } from "../../constants/index";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

const SignIn = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);

   const { setUser, setIsLoggedIn } = useGlobalContext();

   const submit = async () => {
      console.table({ email, password });
      if (!email.trim() || !password.trim() || password.length < 6) {
         Alert.alert("Error", "Please fill in all the details.");
         return;
      }

      setIsSubmitting(true);
      try {
         await signIn(email, password);

         const result = await getCurrentUser();
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
                        Sign In
                     </Text>
                  </View>
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
                     title={"Sign In"}
                     handlePress={submit}
                     containerStyles={"mt-7"}
                     isLoading={isSubmitting}
                  />
                  <View className="mt-4">
                     <Text className="text-lg text-gray-100 text-center font-pregular">
                        Don't have an account?{" "}
                        <Link
                           className="text-secondary font-psemibold"
                           href={"/sign-up"}
                        >
                           Sign Up
                        </Link>
                     </Text>
                  </View>
               </View>
            </ScrollView>
         </SafeAreaView>
      </>
   );
};

export default SignIn;
