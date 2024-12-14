import { useNavigation } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, Pressable, Image, ImageBackground } from 'react-native';

const HomeScreen = () => { 
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../menu/images/background.png")} // Replace this with your background image URL or local asset
        style={styles.background}
        resizeMode='cover'
      >
        <View style={styles.xoContainer}>
          <Image source={require("../menu/images/xo.png")} style={styles.xo} />
        </View>
        <Text style={styles.tic}>TIC</Text>
        <Text style={styles.tac}>TAC</Text>
        <Text style={styles.toe}>TOE</Text>

        <View style={styles.starContainer}>
          <Image source={require("../menu/images/star.png")} style={styles.star} />
          <Image source={require("../menu/images/star.png")} style={styles.star} />
          <Image source={require("../menu/images/star.png")} style={styles.star} />
        </View>

        <Pressable  onPress={() => navigation.navigate("Menu")} style={({ pressed }) => [ styles.button, pressed && { opacity: 0.6 }]}>
          <Text style={styles.buttonText}>Let’s play</Text>
        </Pressable>
        <View style={styles.iconsContainer}>
          <Image source={require("../menu/images/rocket.png")} style={styles.icon} />
          <Image source={require("../menu/images/ufo.png")} style={styles.icon} />
        </View>
      </ImageBackground>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width : "100%",
    height : "100%",
    justifyContent : "center",
    alignItems : "center"
  },
  tic: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginRight:2
  },
  tac: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#e773ff',
  },

  toe: {
    fontSize: 48,
    fontWeight: 'bold',
    color: "#4ffaff",
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    gap:15,
  },
  star: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },

  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 30,
  },
  icon: {
    width: 130,
    height: 130,
  },
  xoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  xo: {
    width: 85,
    height: 40,
  },
});
