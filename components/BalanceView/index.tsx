import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Text } from "react-native";

export const BalanceView  = () => {
  const [transactions, setTransactions] = useState<any[]>([]);

  console.log(transactions)

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

    const balance = transactions.reduce((acc, curr) => {
        if (curr.type === 'profit') {
          return +acc + +curr.amount;
        } else if (curr.type === 'expense') {
          return acc - curr.amount;
        }
        return acc;
      }, 0);

    return <>
        <View>
            <Text style={styles.balanceText}>Баланс: {balance} </Text>
        </View>
    
    </>
}


const styles = StyleSheet.create({
    balanceText: {
        fontWeight: 600, 
        textAlign: 'center',
        fontSize: 18,
        color: "white"
      }
})

