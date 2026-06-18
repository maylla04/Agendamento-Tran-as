import { NavigationContainer } from "@react-navigation/native";
import { SQLiteProvider } from "expo-sqlite";
import HomeScreen from "./src/screens/HomeScreen";
import NovoAgendamentoScreen from "./src/screens/NovoAgendamento";
import { inicializarBanco } from "./src/database/database";
import DetalhesScreen from "./src/screens/DetalhesScreen";
import { createStackNavigator } from "@react-navigation/stack";

// navegar para uma nova tela ela é "empilhada" 
// e ao voltar ela é "desempilhada"
const Stack = createStackNavigator();

export default function App() {
  return (
    <SQLiteProvider databaseName="agendamentos.db" onInit={inicializarBanco}>
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Detalhes" component={DetalhesScreen}/>
            <Stack.Screen name="Novo Agendamento" component={NovoAgendamentoScreen} />
        </Stack.Navigator>
    </NavigationContainer>
</SQLiteProvider>
  );
}


