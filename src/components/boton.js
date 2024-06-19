import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import { Audio } from "expo-av";
export default Boton = (props) => {
  const { activo, setActivo } = props;

  const handleClick = () => {
    setActivo(!activo);
    playsound(); //Aca se pone el sonido
  };
  const playsound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/Audio/sonido.mp3") //lugar donde se pone la ubicacion del archivo
    );

    await sound.playAsync();
  };
  return (
    <View>
      <TouchableOpacity style={styles.boton} onPress={() => handleClick()}>
        <Text style={styles.texto}>{activo ? "Parar" : "Comenzar"}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  boton: {
    backgroundColor: "White",
    width: 100,
    margin: 20,
    height: 80,
    borderRadius: 10,
  },
  texto: {
    fontSize: 20,
    alignSelf: "center",
  },
});
