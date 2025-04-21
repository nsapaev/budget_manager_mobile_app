import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { PressSection } from '@/components/PressSecton';
import {router } from "expo-router"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { BalanceView } from '@/components/BalanceView';

export default function HomeScreen() {

  const asd = async () => {
    await AsyncStorage.clear();
  }

  // useEffect(() => {
  //   asd()
  // }, [])

  const handlePress = (sectionTitle: string) => {
    router.push({
      pathname: '/add-expense',
      params: { section: sectionTitle },
    });
  }
  const handleRedPress = () => {}
  const handleGreenPress = () => {
    router.push("/add-profit")
  }

  const goToBalance = () => {
    router.push("/balance")
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

    <View style={styles.sections} >
      <PressSection 
        handlePress={handlePress} 
        title="Продукты" 
        desc="Здесь будет список покупок на еду и напитки." 
      />
      <PressSection 
        handlePress={handlePress} 
        title="Карманные расходы" 
        desc="Сюда можно добавить расходы на проезд, кофе и т.п." 
      />
      <PressSection 
        handlePress={handlePress} 
        title="На дом" 
        desc="Сюда входят расходы на бытовую химию, ремонт и т.п." 
      />
  </View>

    <Pressable style={styles.balance} onPress={goToBalance}>
          <BalanceView/>
    </Pressable>

    <View style={styles.buttonSection}>
      <Pressable style={styles.redButton} onPress={handleRedPress}>
          <Text style={styles.buttonText}>Расход</Text>
        </Pressable>
        <Pressable style={styles.greenButton} onPress={handleGreenPress}>
          <Text style={styles.buttonText}>Доход</Text>
        </Pressable>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop : 50
  },
  sections: {
    marginBottom: 50
  },
  buttonSection: {
    display: 'flex',
    gap: 5,
    justifyContent: "center",
  },
  redButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 12,
  },
  greenButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  balance: {
    backgroundColor: 'orange',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 50
  },
  balanceText: {
    fontWeight: 600, 
    textAlign: 'center',
    fontSize: 18,
    color: "white"
  }
});