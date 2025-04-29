import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import SendSMS from 'react-native-sms';

const HomeScreen = ({ navigation }) => {
  const handleEmergency = () => {
    // Obter localização atual
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Enviar SMS para contatos de emergência
        SendSMS.send(
          {
            body: `Emergência! Minha localização: https://maps.google.com/?q=${latitude},${longitude}`,
            recipients: ['+5511999999999'], // Substituir pelo número do contato de emergência
            successTypes: ['sent', 'queued'],
          },
          (completed, cancelled, error) => {
            if (completed) {
              Alert.alert('Emergência!', 'Mensagem enviada com sucesso.');
            } else if (cancelled) {
              Alert.alert('Cancelado', 'Envio de mensagem foi cancelado.');
            } else {
              Alert.alert('Erro', 'Não foi possível enviar a mensagem.');
            }
          }
        );
      },
      (error) => {
        console.log(error);
        Alert.alert('Erro', 'Não foi possível obter a localização.');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Linha Segura</Text>
      <Text style={styles.subtitle}>Proteção e segurança ao seu alcance</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.emergencyButton}
        onPress={handleEmergency}
      >
        <Text style={styles.emergencyText}>Emergência</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>© 2025 Linha Segura</Text>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#6200EA',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emergencyButton: {
    backgroundColor: '#D32F2F',
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  emergencyText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    fontSize: 14,
    color: '#999',
    position: 'absolute',
    bottom: 20,
  },
});

export default HomeScreen;