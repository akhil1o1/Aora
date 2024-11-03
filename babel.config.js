// babel.config.js

module.exports = function (api) {
   api.cache(true);
   return {
     presets: ['babel-preset-expo'],
     plugins: [
       'nativewind/babel', // Existing plugin
       [
         'module:react-native-dotenv', // Add the dotenv plugin
         {
           moduleName: 'react-native-dotenv',
           path: '.env.local', 
         },
       ],
     ],
   };
 };
 