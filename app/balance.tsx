import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system'; // Для работы с файлами
import XLSX from 'xlsx';

export default function Balance() {
  const [transactions, setTransactions] = useState<any[]>([]);

  console.log(transactions)
  // Загрузка данных из AsyncStorage при монтировании компонента и обновление при изменении
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const savedTransactions = await AsyncStorage.getItem('expenses');
        const savedProfit = await AsyncStorage.getItem("transactions")


        // Преобразуем данные, если они существуют, иначе присваиваем пустой массив
        const transactions = savedTransactions ? JSON.parse(savedTransactions) : [];
        const profit = savedProfit ? JSON.parse(savedProfit) : [];
        console.log(savedProfit )
        // Объединяем оба массива, если они не пустые
        if (transactions.length > 0 || profit.length > 0) {
          setTransactions([...transactions, ...profit]);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchTransactions();
  }, []); // Загрузка при монтировании компонента

 // Функция для экспорта в Excel
 const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(transactions); // Преобразуем данные в лист Excel
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');

  // Генерация файла Excel
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  // Сохраняем файл в систему
  const fileUri = FileSystem.documentDirectory + 'transactions.xlsx';
  FileSystem.writeAsStringAsync(fileUri, excelBuffer, { encoding: FileSystem.EncodingType.Base64 })
    .then(() => {
      // Сообщаем пользователю о успешной загрузке
      Alert.alert("Файл Excel", "Ваш файл был успешно сохранён!");
      // Можно использовать кастомный способ обмена через другие библиотеки
    })
    .catch((error) => console.error('Ошибка при сохранении файла:', error));
};


  return (
    <ScrollView style={styles.container}>
      <View style={styles.flex}>  
        <Text style={styles.header}>Баланс</Text>
      {/* Кнопка для экспорта в Excel */}
      <TouchableOpacity style={styles.button} onPress={exportToExcel}>
        <Text style={styles.buttonText}>Выгрузить в Excel</Text>
      </TouchableOpacity>
      </View>
     
      {transactions.map((transaction, index) => (
        <View
          key={index}
          style={[
            styles.transactionCard,
            transaction.type === 'profit' ? styles.profitCard : styles.expenseCard,
          ]}
        >
          <Text style={styles.amount}>{transaction.amount} ₽</Text>
          <Text style={styles.description}>{transaction.description}</Text>
          <Text style={styles.date}>{transaction.date}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  transactionCard: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  profitCard: {
    backgroundColor: '#28a745', // Зеленый для доходов
  },
  expenseCard: {
    backgroundColor: '#dc3545', // Красный для расходов
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: '#fff',
  },
  date: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#1E90FF', // Синий цвет кнопок
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 15,
    
  },
  buttonText: {
    color: '#fff', // Белый текст на кнопке
    fontSize: 16,
    textAlign: 'center',
  },
  flex:{
    display: 'flex',
    flexDirection: "row",
    gap: 20,
    alignItems: 'center',
    justifyContent: "space-between"
  }
});
