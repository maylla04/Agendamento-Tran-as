import React from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useSQLiteContext } from 'expo-sqlite';
import { excluirAgendamento } from '../repositories/agendamentoRepository';
import BotaoPrimario from '../components/BotaoPrimario';

type Props = NativeStackScreenProps<RootStackParamList, 'Detalhes'>;

export default function DetalhesScreen({ navigation, route }: Props) {
  const { agendamento } = route.params;
  const db = useSQLiteContext();

  async function handleExcluir() {
    Alert.alert(
      'Excluir agendamento',
      `Deseja excluir o agendamento de ${agendamento.nome}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await excluirAgendamento(db, agendamento.id);
            navigation.goBack();
          }
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{agendamento.nome}</Text>

      {agendamento.foto_uri && (
        <Image source={{ uri: agendamento.foto_uri }} style={styles.foto} />
      )}

      <View style={styles.card}>
        <Text style={styles.label}>📞 Telefone</Text>
        <Text style={styles.valor}>{agendamento.telefone}</Text>

        <Text style={styles.label}>📅 Data</Text>
        <Text style={styles.valor}>{agendamento.data}</Text>

        <Text style={styles.label}>🕐 Horário</Text>
        <Text style={styles.valor}>{agendamento.horario}</Text>

        <Text style={styles.label}>✂️ Tipo de Trança</Text>
        <Text style={styles.valor}>{agendamento.tipo_tranca}</Text>
      </View>

      <BotaoPrimario texto="Excluir Agendamento" onPress={handleExcluir} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5ECD7',
    padding: 20,
    paddingTop: 50,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6B3F2A',
    marginBottom: 16,
  },
  foto: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#6B3F2A',
  },
  label: {
    fontSize: 13,
    color: '#4A2C1A',
    marginTop: 10,
    fontWeight: 'bold',
  },
  valor: {
    fontSize: 16,
    color: '#3A1F0D',
    marginTop: 2,
  },
});