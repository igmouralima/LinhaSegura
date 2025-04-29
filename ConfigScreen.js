import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ConfigScreen = () => {
  const [contact, setContact] = useState('');
  const [contacts, setContacts] = useState([]);

  const addContact = () => {
    if (contact.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira um número de telefone válido.');
    } else {
      setContacts([...contacts, contact]);
      setContact('');
      Alert.alert('Sucesso', 'Contato adicionado com sucesso.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <Text style={styles.subtitle}>Adicione contatos de emergência</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o número de telefone"
        value={contact}
        onChangeText={setContact}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={addContact}>
        <Text style={styles.buttonText}>Adicionar Contato</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Contatos Salvos:</Text>
      {contacts.map((c, index) => (
        <Text key={index} style={styles.contact}>
          {c}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#6200EA',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contact: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
});

export default ConfigScreen;