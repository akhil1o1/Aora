import {
   Client,
   Account,
   ID,
   Avatars,
   Databases,
   Query,
} from "react-native-appwrite";

export const config = {
   endpoint: process.env.APPWRITE_ENDPOINT,
   platform: process.env.APPWRITE_PLATFORM,
   projectId: process.env.APPWRITE_PROJECT_ID,
   databaseId: process.env.APPWRITE_DATABASE_ID,
   userCollectionId: process.env.APPWRITE_USER_COLLECTION_ID,
   videoCollectionId: process.env.APPWRITE_VIDEO_COLLECTION_ID,
   storageId: process.env.APPWRITE_STORAGE_ID,
};

const {
   endpoint,
   platform,
   projectId,
   databaseId,
   userCollectionId,
   videoCollectionId,
   storageId,
} = config;

// Init React Native SDK
const client = new Client();

client
   .setEndpoint(endpoint) // Appwrite Endpoint
   .setProject(projectId) // project ID
   .setPlatform(platform); // application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export const createUser = async (email, password, username) => {
   try {
      // create account with appwrite's auth service
      const newAccount = await account.create(
         ID.unique(),
         email,
         password,
         username
      );
      console.log(newAccount);

      if (!newAccount) {
         throw new Error("Failed to create user account");
      }

      // creates an avatar of user name initials
      const avatarUrl = avatars.getInitials(newAccount.name);

      // sign in user by creating a session
      try {
         await signIn(email, password);
      } catch (signInError) {
         console.log("Error during sign-in:", signInError);
         throw new Error("Failed to sign in after account creation");
      }

      // create the user in the user collection
      try {
         const newUser = await databases.createDocument(
            databaseId,
            userCollectionId,
            ID.unique(),
            {
               accountId: newAccount.$id,
               email: newAccount.email,
               username: newAccount.name,
               avatar: avatarUrl,
            }
         );
         return newUser;
      } catch (dbError) {
         console.log("Error creating user document:", dbError);
         throw new Error("Failed to save user to database");
      }
   } catch (error) {
      console.log("Error creating user:", error);
      throw new Error("Create user error: " + error.message);
   }
};

// create a login/signin session
export const signIn = async (email, password) => {
   try {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
   } catch (error) {
      console.log("Error creating session:", error);
      throw new Error("Session error: " + error.message);
   }
};

export const getCurrentUser = async () => {
   try {
      const currentAccount = await account.get();
      console.log(currentAccount);

      if (!currentAccount) {
         throw new Error("current account not found");
      }

      const currentUser = await databases.listDocuments(
         databaseId,
         userCollectionId,
         [Query.equal("accountId", currentAccount.$id)]
      );
      console.log(currentUser);

      if (!currentUser) {
         throw new Error("No current user found");
      }

      return currentUser.documents[0];
   } catch (error) {
      console.log(error);
   }
};

export const getAllPosts = async () => {
   try {
      const posts = await databases.listDocuments(
         databaseId,
         videoCollectionId
      );

      return posts.documents;
   } catch (error) {
      throw new Error(error);
   }
};
