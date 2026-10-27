module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|expo(nent)?|@expo(nent)?|expo-router|@expo/vector-icons|react-navigation|@react-navigation|@react-native-async-storage/async-storage)",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: [],
  testMatch: ["**/?(*.)+(spec|test).ts?(x)"],
};
