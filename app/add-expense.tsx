import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Для работы с локальным хранилищем

export default function AddExpenseScreen() {
  const { section } = useLocalSearchParams();

  // Стейты для данных
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());

  // Обработчик для кнопки "Добавить"
  const handleAddExpense = async () => {
    if (!amount || !description) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    // Создание объекта расхода
    const newExpense = { section, category, amount, description, date: date.toLocaleString(), type: 'expense' };

    // Сохранение в AsyncStorage
    const savedExpenses = await AsyncStorage.getItem('expenses');
    const expenses = savedExpenses ? JSON.parse(savedExpenses) : [];
    expenses.push(newExpense);
    await AsyncStorage.setItem('expenses', JSON.stringify(expenses));

    // Очистка полей после добавления
    setAmount('');
    setDescription('');
    setCategory('');
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Добавить расход в раздел: {section || 'Без названия секции'}</Text>

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

      {/* Кнопка для добавления расхода */}
      <TouchableOpacity style={styles.button} onPress={handleAddExpense}>
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
