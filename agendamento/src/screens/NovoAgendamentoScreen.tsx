import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useSQLiteContext } from 'expo-sqlite';
import { inserirAgendamento } from '../repositories/agendamentoRepository';
import BotaoPrimario from '../components/BotaoPrimario';

type Props = NativeStackScreenProps<RootStackParamList, 'NovoAgendamento'>;


export default function NovoAgendamentoScreen({ navigation }: Props) {

  const db = useSQLiteContext();
  
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [tipoTranca, setTipoTranca] = useState('');
  const [fotoUri, setFotoUri] = useState('');


  async function tirarFoto() {
    const { status: camStatus } = await ImagePicker.requestCameraPermissionsAsync();
    if (camStatus !== 'granted') {
    Alert.alert('Permissão negada', 'Precisamos acessar a câmera.');
    return;
    }
    const resultado = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.7,
    });

    if (!resultado.canceled) {
        setFotoUri(resultado.assets[0].uri);
    }
}

  async function salvar() {
    await inserirAgendamento(db, { nome, telefone, data, horario, tipo_tranca: tipoTranca, foto_uri: fotoUri });
    Alert.alert(`Agendamento de ${nome} feito com sucesso!`)
    navigation.goBack();
}

  return (
    <ScrollView>
      <Text>Novo Agendamento</Text>
      <TextInput
    placeholder="Nome do cliente"
    value={nome}
    onChangeText={(text: string) => setNome(text)}
    />
    <TextInput
    placeholder="Telefone do cliente"
    value={telefone}
    onChangeText={(text: string) => setTelefone(text)}
    />
    <TextInput
    placeholder="data do procedimento"
    value={data}
    onChangeText={(text: string) => setData(text)}
    />
    <TextInput
    placeholder="Horario do procedimento"
    value={horario}
    onChangeText={(text: string) => setHorario(text)}
    />
    <TextInput
    placeholder="Tipo da trança"
    value={tipoTranca}
    onChangeText={(text: string) => setTipoTranca(text)}
    />

    <BotaoPrimario texto="Tirar Foto do Cabelo" onPress={tirarFoto}/>

    {fotoUri !== '' && 
    <Image source={{ uri: fotoUri }} 
          style={{ width: 100, height: 100 }} 
      />}

    
    <BotaoPrimario texto="Salvar" onPress={salvar}/>
    </ScrollView>
  );
}