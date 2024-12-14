import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Importing the function to create a stack navigator for managing navigation.

const Stack = createNativeStackNavigator();
// Initializing the stack navigator.

import Menu from "../../components/menu/Menu";
// Importing the Menu component, which will be the first screen.

import Twoplayer from "../../components/menu/Twoplayer";
import HomeScreen from "@/components/menu/HomeScreen";
import Oneplayer from "../../components/menu/Oneplayer";
// Importing the Twoplayer component, which will be navigated to from the Menu.

export default function Index() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      {/* Defining the stack navigator to manage the navigation between screens. */}
      
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
        // Adding the Home screen to the stack and hiding its header.
      />

      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{ headerShown: false }}
        // Adding the Menu screen to the stack and hiding its header.
      />

      <Stack.Screen
        name="Twoplayer"
        component={Twoplayer}
        options={{ headerShown: false }}
        // Adding the Twoplayer screen to the stack and hiding its header.
      />

      <Stack.Screen
        name="Oneplayer"
        component={Oneplayer}
        options={{ headerShown: false }}
        // Adding the Twoplayer screen to the stack and hiding its header.
      />
    </Stack.Navigator>
  );
}