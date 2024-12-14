import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Modal} from "react-native";

const TwoPlayerScreen = () => {
  const navigation = useNavigation<any>();

    const [grid, setGrid] = useState([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    const [turn, setTurn] = useState("X");
    const [winner, setWinner] = useState<string | null>(null);
    const [xScore, setScoreX] = useState(0);
    const [oScore, setScoreO] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    // Check if there's a winner
    const checkWinner = (grid: string[][]) => {
      const lines = [
        // Horizontal lines
        [grid[0][0], grid[0][1], grid[0][2]],
        [grid[1][0], grid[1][1], grid[1][2]],
        [grid[2][0], grid[2][1], grid[2][2]],
        // Vertical lines
        [grid[0][0], grid[1][0], grid[2][0]],
        [grid[0][1], grid[1][1], grid[2][1]],
        [grid[0][2], grid[1][2], grid[2][2]],
        // Diagonals
        [grid[0][0], grid[1][1], grid[2][2]],
        [grid[0][2], grid[1][1], grid[2][0]],
      ];
      for (let line of lines) {
        if (line[0] && line[0] === line[1] && line[1] === line[2]) {
          return line[0];
        }
      }
      return null;
    };
    const handleCellPress = (row: number, col: number) => {
      if (grid[row][col] || winner) return;

    const newGrid = grid.map((r, rIndex) =>
      r.map((cell, cIndex) => (rIndex === row && cIndex === col ? turn : cell))
    );
    const nextTurn = turn === "X" ? "O" : "X";

    setGrid(newGrid);
    setTurn(nextTurn);

    const gameWinner = checkWinner(newGrid);
    if (gameWinner) {
      setWinner(gameWinner);
      setShowPopup(true);
      if (gameWinner === "X") {
        setScoreX((prev) => prev + 1);
      } else {
        setScoreO((prev) => prev + 1);
      }
    } else if (newGrid.flat().every((cell) => cell)) {
      // Check for a draw
      setWinner("Draw");
      setShowPopup(true);
    }
  };
  const resetGame = () => {
    setGrid([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setWinner(null);
    setTurn("X");
    setShowPopup(false);
  };
  return (
    <ImageBackground
      source={require("../menu/images/background.png")} // Replace this with your background image URL or local asset
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.contentWrapper}>
        {/* Player One and Player Two */}
        <View style={styles.playersContainer}>
          {/* Player One */}
          <View style={styles.playerBox}>
            <Image
              source={require("../menu/images/robot.png")} // Replace with your Player One icon
              style={styles.playerIcon}
            />
            <Text style={styles.playerText}>Player One</Text>
            
          </View>

          {/* Score */}
          <Text style={styles.score}>{xScore} : {oScore}</Text>


          {/* Player Two */}
          <View style={styles.playerBox}>
            <Image
              source={require("../menu/images/robot.png")} // Replace with your Player Two icon
              style={styles.playerIcon}
            />
            <Text style={styles.playerText}>Player Two</Text>
          </View>
        </View>

        {/* Game Grid */}
        <View style={styles.gridContainer}>
          {grid.map((row,rowindex)=>
          row.map((cell,colindex)=>(
              <TouchableOpacity
                key={`${rowindex}-${colindex}`}
                style={styles.gridCell}
                onPress={() => handleCellPress(rowindex,colindex)  
                }>
                <Text style={styles.cellText}>
                  {cell === "X" ? (
                    <Image source={require("../menu/images/x.png")} style={styles.img}/>
                  ) : cell === "O" ? (
                   <Image source={require("../menu/images/o.png")} style={styles.img}/>
                  ) : null} {/* This renders X or O, or nothing if cell is empty */}
                </Text>
              </TouchableOpacity>
            ))
          )
          }
        </View>
        <Modal visible={showPopup} transparent={true} animationType="slide">
        <View style={styles.popupContainer}>
          <View style={styles.popup}>
            <Text style={styles.popupText}>
              {winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`}
            </Text>
            <Image source={require("../menu/images/trophy.png")} style={styles.trophyIcon} />
            <View style={styles.popupButtons}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.popupButton}>
                <Text style={styles.popupButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={resetGame} style={styles.popupButton}>
                <Text style={styles.popupButtonText}>Play Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "space-evenly", // Adjust spacing between elements
    alignItems: "center",
    paddingVertical: 20,
  },
  playersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
  },
  playerBox: {
    alignItems: "center",
    backgroundColor: "#391898",
    borderRadius: 10,
    padding: 10,
    width: 100,
    marginTop:-150
  },
  playerIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  playerText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  score: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginTop:-110
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 350,
    height: 400,
    backgroundColor: "#391898",
    borderRadius: 20,
    padding: 10,
    marginTop:-100,
  },
  cellText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  gridCell: {
    width: "30%",
    height: "30%",
    backgroundColor: "#CCCCCC",
    margin: "1.5%",
    borderRadius: 5,
  },
  resetButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop:-100,
    marginBottom:-90
  },
  resetButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  popupContainer: { flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "rgba(0, 0, 0, 0.5)" 
  },
  popup: { 
    width: 300, 
    padding: 20,
    backgroundColor: "#3B1B88", 
    borderRadius: 20, 
    alignItems: "center" 
  },
  popupText: 
  { color: "#FFD700", 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20 
  },
  trophyIcon: 
  { width: 100, 
    height: 100, 
    marginBottom: 20 
  },
  popupButtons: 
  { flexDirection: "row", 
    justifyContent: "space-between", 
    width: "100%" 
  },
  popupButton: 
  { backgroundColor: "#FFB800", 
    padding: 10, 
    borderRadius: 10, 
    marginHorizontal: 10, 
    flex: 1, 
    alignItems: "center" 
  },
  popupButtonText: 
  { color: "#FFFFFF", 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  img:{
    padding:20,
    paddingTop:20
  }

});

export default TwoPlayerScreen;
