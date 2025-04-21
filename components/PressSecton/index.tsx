import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


interface IPressSectionProps {
    handlePress: (section: string ) => void 
    title: string,
    desc: string
}

export const PressSection = ({handlePress, title, desc }:IPressSectionProps ) => {

 
 


    return (
         <Pressable onPress={() => handlePress(title)}>
            <ThemedView style={styles.section} >
                <ThemedText type="title">{title}</ThemedText>
                <ThemedText>{desc}</ThemedText>
            </ThemedView>
         </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    section: {
      padding: 16,
      marginBottom: 12,
      borderRadius: 12,
      backgroundColor: 'green',
    },
  });
  