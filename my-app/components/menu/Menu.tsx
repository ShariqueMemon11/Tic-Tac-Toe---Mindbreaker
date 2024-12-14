import { useNavigation } from 'expo-router';
import React from 'react';
import { Text, StyleSheet, View, ImageBackground, Pressable, Image } from 'react-native';

const Menu = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require("../menu/images/background.png")}
        style={styles.background}
        resizeMode="cover"
      >

        <View style={styles.textContainer}>
          <Text style={styles.title}>Start Game</Text>
          <View style={styles.underline} />
        </View>
        {/* Single Player Button */}
        <View style={styles.optionContainer}>
          <View style={styles.optionCircleYellow}>
            <Image source={require("../menu/images/robot.png")} style={styles.icon} />
          </View>
          <Pressable onPress={() => navigation.navigate("Oneplayer")} style={({ pressed }) => [ 
          pressed && { opacity: 0.6 } // Reduce opacity on press
        ]}>
            <View style={styles.buttonSingle}>
              <Text style={styles.buttonText}>Single Player</Text>
            </View>
          </Pressable>
        </View>

        {/* Two Players Button */}
        <View style={styles.optionContainer}>
          <View style={styles.optionCirclePink}>
            <Image source={require("../menu/images/2player.png")} style={styles.icon} />
          </View>
          <Pressable onPress={() => navigation.navigate("Twoplayer")} style={({ pressed }) => [
          pressed && { opacity: 0.6 }
        ]}>
            <View style={styles.buttonTwo}>
              <Text style={styles.buttonText}>Two Players</Text>
            </View>
          </Pressable>
        </View>

         <View style={styles.logosContainer}>
                  <Image source={require("../menu/images/music.png")} style={styles.logos} />
                  <Image source={require("../menu/images/remort.png")} style={styles.logos} />
                </View>
      </ImageBackground>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center", // Centers all content horizontally
    justifyContent: "center", // Centers content vertically
  },
  textContainer: {
    marginTop:-110,
    marginBottom:100, // Moves the container from the top
    marginRight:100,
    alignItems: "center", // Aligns text and underline horizontally
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF", 
  },
  underline: {
    marginTop: 4, // Space between text and underline
    width: 250, // Fixed width for the underline
    height: 4, // Thickness of the underline
    backgroundColor: "#FFD700", // Yellow color for the underline
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  optionCircleYellow: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFA500", // Yellow Circle
    justifyContent: "center",
    alignItems: "center",
    zIndex:1
  },
  optionCirclePink: {
    width: 100,
    marginLeft:-8,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FF00FF", // Pink Circle
    justifyContent: "center",
    alignItems: "center",
    zIndex:1
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  buttonSingle: {
    backgroundColor: "#FF4500", // Red-Orange Button
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: -15,
  },
  buttonTwo: {
    backgroundColor: "#8B00FF", // Purple Button
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: -15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  logosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 50,
    marginBottom:-110
  },
  logos: {
    width: 130,
    height: 130,
  },
});
