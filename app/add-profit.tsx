import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';
import { router } from 'expo-router'; // Для навигации
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddProfitScreen() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleAddProfit = async () => {
    if (!amount || !description) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    const newProfit = { amount, description, type: 'profit', date: new Date().toLocaleString() };

    try {
      // Получаем текущие данные из AsyncStorage
      const existingData = await AsyncStorage.getItem('transactions');
      const transactions = existingData ? JSON.parse(existingData) : [];

      // Добавляем новую операцию
      transactions.push(newProfit);

      // Сохраняем обновленные данные обратно в AsyncStorage
      await AsyncStorage.setItem('transactions', JSON.stringify(transactions));

      // Очистка полей после добавления
      setAmount('');
      setDescription('');

      // Перенаправление на главную страницу
      router.push('/');
    } catch (error) {
      console.error('Ошибка при добавлении прибыли:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Добавить прибыль</Text>

      {/* Поле для ввода суммы */}
      <TextInput
        style={styles.input}
        placeholder="Введите сумму"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholderTextColor="#B0B0B0"
      />

      {/* Поле для ввода описания */}
      <TextInput
        style={styles.input}
        placeholder="Введите описание"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#B0B0B0"
      />

      {/* Кнопка для добавления прибыли */}
      <TouchableOpacity style={styles.button} onPress={handleAddProfit}>
        <Text style={styles.buttonText}>Добавить</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#B0B0B0',
    backgroundColor: '#333',
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});
