import { useEffect, useState } from "react";
import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Tabs from "../components/tabs";
import Timer from "../components/timer";
import Boton from "../components/boton";
import { Audio } from "expo-av";

export default Main = () => {
  /*async function playSonido() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/Audio/game-over-38511.mp3")
    );
    await sound.playAsync();
  }*/

  const [seleccion, setSeleccion] = useState(0);
  //const { seleccion, setSeleccion } = useState(0); //Poner esto en los parentesis luego "POMO" | "SHORT" | "LONG"
  const [tiempo, setTiempo] = useState(25 * 60);
  const [activo, setActivo] = useState(false);
  const colores = ["#21EB98", "#BF60EB", "#EB8E21"];

  const playSonido = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/Audio/sonido.mp3")
    );
    await sound.playAsync();
  };

  useEffect(() => {
    let interval = null;
    if (activo && tiempo > 0) {
      interval = setInterval(() => {
        setTiempo(tiempo - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    if (tiempo === 0) {
      setActivo(false);
      setTiempo(seleccion == 0 ? 1500 : seleccion === 1 ? 300 : 600); //tiempoACtual=seleccion
      playSonido();
    }
    return () => clearInterval(interval);
  }, [tiempo, activo]);
  /*
  const playSonido = async () => {
    const { Audio } = await Audio.Sound.createAsync(
      require("../../assets/Audio/game-over.38511.mp3")
    );
    await Audio.playAsync();
  };*/

  return (
    <SafeAreaView
      style={[
        objetoEstilos.contenedor,
        { backgroundColor: colores[seleccion] },
      ]}
    >
      <View style={{ marginTop: Platform.OS === "android" ? 30 : 0 }}>
        <Tabs
          seleccion={seleccion}
          setSeleccion={setSeleccion}
          tiempo={tiempo}
          setTiempo={setTiempo}
          setActivo={setActivo}
        />

        <Timer tiempo={tiempo} />
        <Boton activo={activo} setActivo={setActivo} />
      </View>
    </SafeAreaView>
  );
};

//Tambien se puede usar export default function app(){}
const objetoEstilos = StyleSheet.create({
  contenedor: {
    backgroundColor: "red",
    flex: 0.5, //ocupa toda la pantalla con 1
  },
}); /**
/*<SafeAreaView style={objetoEstilos.contenedor}>
       <View >
            <Text>Buenas</Text>
        </View> 
        //Esto es para iphone
    </SafeAreaView>*/

/*<SafeAreaView style={objetoEstilos.contenedor}>
    <View style = {{marginTop: 30}} >
         <Text>Buenas</Text>
     </View> 
     //Esto es para android
    </SafeAreaView>*/
/*<SafeAreaView style={objetoEstilos.contenedor}>
      <View style={{ marginTop: Platform.OS === "android" && 30 }}>
        <Text>Buenas</Text>
      </View>
      //Esto es para iphone
    </SafeAreaView>*/
