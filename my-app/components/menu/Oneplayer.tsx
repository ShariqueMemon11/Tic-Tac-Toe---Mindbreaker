import { useNavigation } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Modal } from "react-native";

const OnePlayer = () => {
  const navigation = useNavigation<any>();

  const [grid, setGrid] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [playerSymbol, setPlayerSymbol] = useState(""); // Player's symbol
  const [aiSymbol, setAiSymbol] = useState(""); // AI's symbol
  const [turn, setTurn] = useState(""); // Current turn
  const [winner, setWinner] = useState<string | null>(null);
  const [playerScore, setScoreplayer] = useState(0);
  const [aiScore, setScoreai] = useState(0);
  const [symbolSelected, setSymbolSelected] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const checkWinner = (grid: string[][]) => {
    const lines = [
      [grid[0][0], grid[0][1], grid[0][2]],
      [grid[1][0], grid[1][1], grid[1][2]],
      [grid[2][0], grid[2][1], grid[2][2]],
      [grid[0][0], grid[1][0], grid[2][0]],
      [grid[0][1], grid[1][1], grid[2][1]],
      [grid[0][2], grid[1][2], grid[2][2]],
      [grid[0][0], grid[1][1], grid[2][2]],
      [grid[0][2], grid[1][1], grid[2][0]],
    ];

    for (const line of lines) {
      if (line[0] !== "" && line[0] === line[1] && line[1] === line[2]) {
        return line[0];
      }
    }

    if (grid.every((row) => row.every((cell) => cell !== ""))) {
      return "Draw";
    }

    return null;
  };

  const handlePress = (row: number, col: number) => {
    if (grid[row][col] !== "" || winner) return;

    setGrid((prevGrid) => {
      const newGrid = [...prevGrid.map((row) => [...row])];
      newGrid[row][col] = playerSymbol;
      const gameWinner = checkWinner(newGrid);
      if (gameWinner) {
        setWinner(gameWinner);
        if (gameWinner === playerSymbol) setScoreplayer((prev) => prev + 1);
        if (gameWinner === aiSymbol) setScoreai((prev) => prev + 1);
        setShowPopup(true); // Show the popup when there's a winner
      } else {
        setTurn(aiSymbol); // Switch turn to AI
      }

      return newGrid;
    });
  };

  const resetGame = () => {
    setGrid([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setWinner(null);
    setTurn(playerSymbol); // Reset turn to the player's symbol
  };

  const setGame = (value: string) => {
    setPlayerSymbol(value);
    setAiSymbol(value === "X" ? "O" : "X"); // Set AI symbol to the opposite
    setSymbolSelected(true);
    setTurn("X")
    
  };

  useEffect(() => {
    if (symbolSelected && turn === aiSymbol && !winner) {
      Botmove(grid);
    }
  }, [grid, turn, winner, symbolSelected]);

  const Botmove = (grid: string[][]) => {
    let row = -1;
    let col = -1;
    let bestScore = -Infinity;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i][j] === "") {
          grid[i][j] = aiSymbol;
          const score = minmax(grid, 0, false);
          grid[i][j] = "";

          if (score > bestScore) {
            bestScore = score;
            row = i;
            col = j;
          }
        }
      }
    }

    if (row !== -1 && col !== -1) {
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid.map((row) => [...row])];
        newGrid[row][col] = aiSymbol;

        const gameWinner = checkWinner(newGrid);
        if (gameWinner) {
          setWinner(gameWinner);
          if (gameWinner === playerSymbol) setScoreplayer((prev) => prev + 1);
          if (gameWinner === aiSymbol) setScoreai((prev) => prev + 1);
          setShowPopup(true); // Show the popup when there's a winner
        } else {
          setTurn(playerSymbol); // Switch turn back to player
        }

        return newGrid;
      });
    }
  };

  const minmax = (grid: string[][], depth: number, maximizing: boolean) => {
    let result = checkWinner(grid);
    if (result !== null) {
      if (result === "Draw") {
        return 0;
      } else if (result === aiSymbol) {
        return 1; // AI wins
      } else {
        return -1; // Player wins
      }
    }

    if (maximizing) {
      let bestScore = -Infinity;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (grid[i][j] === "") {
            grid[i][j] = aiSymbol;
            let score = minmax(grid, depth + 1, false);
            grid[i][j] = "";
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (grid[i][j] === "") {
            grid[i][j] = playerSymbol;
            let score = minmax(grid, depth + 1, true);
            grid[i][j] = "";
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  };

  return (
    <ImageBackground
      source={require("../menu/images/background.png")}
      style={styles.container}
      resizeMode="cover"
    >
      {!symbolSelected && (
        <Modal visible={!symbolSelected} transparent={true} animationType="slide">
          <View style={styles.popupContainer}>
            <View style={styles.popup}>
              <Text style={styles.popupText}>Choose Your Symbol</Text>
              <View style={styles.popupButtons}>
                <TouchableOpacity
                  onPress={() => {
                    setGame("X");
                  }}
                  style={styles.popupButton}
                >
                  <Text style={styles.popupButtonText}>X</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setGame("O");
                  }}
                  style={styles.popupButton}
                >
                  <Text style={styles.popupButtonText}>O</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
      <View style={styles.contentWrapper}>
        <View style={styles.playersContainer}>
          <View style={styles.playerBox}>
            <Image
              source={require("../menu/images/robot.png")}
              style={styles.playerIcon}
            />
            <Text style={styles.playerText}>Player</Text>
          </View>
          <Text style={styles.score}>{playerScore} : {aiScore}</Text>
          <View 
            style={styles.playerBox}>
            <Image
              source={require("../menu/images/robot.png")}
              style={styles.playerIcon}
            />
            <Text style={styles.playerText}>AI</Text>
          </View>
        </View>
        <View style={styles.gridContainer}>
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <TouchableOpacity
                key={`${rowIndex}-${colIndex}`}
                style={styles.gridCell}
                onPress={() => handlePress(rowIndex, colIndex)}
              >
                <Text style={styles.cellText}>
                  {cell === "X" ? (
                    <Image source={require("../menu/images/x.png")} style={styles.img} />
                  ) : cell === "O" ? (
                    <Image source={require("../menu/images/o.png")} style={styles.img} />
                  ) : null}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>
        {winner && (
          <Modal visible={showPopup} transparent={true} animationType="slide">
            <View style={styles.popupContainer}>
              <View style={styles.popup}>
                <Text style={styles.popupText}>
                  {winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`}
                </Text>
                <Image source={require("../menu/images/trophy.png")} style={styles.trophyIcon} />
                <View style={styles.popupButtons}>
                  <TouchableOpacity onPress={() => { resetGame(); setSymbolSelected(false); }} style={styles.popupButton}>
                    <Text style={styles.popupButtonText}>Play Again</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.popupButton}>
                    <Text style={styles.popupButtonText}>Back</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
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
    justifyContent: "space-evenly",
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
    marginTop: -150,
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
    marginTop: -110,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 350,
    height: 400,
    backgroundColor: "#391898",
    borderRadius: 20,
    padding: 10,
    marginTop: -100,
  },
  cellText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gridCell: {
    width: "30%",
    height: "30%",
    backgroundColor: "#CCCCCC",
    margin: "1.5%",
    borderRadius: 5,
  },
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popup: {
    width: 300,
    padding: 20,
    backgroundColor: "#3B1B88",
    borderRadius: 20,
    alignItems: "center",
  },
  popupText: {
    color: "#FFD700",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  trophyIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  popupButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  popupButton: {
    backgroundColor: "#FFB800",
    padding: 10,
    borderRadius: 10 ,
    marginHorizontal: 10,
    flex: 1,
    alignItems: "center",
  },
  popupButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  img: {
    padding: 20,
    paddingTop: 20,
  },
});

export default OnePlayer;