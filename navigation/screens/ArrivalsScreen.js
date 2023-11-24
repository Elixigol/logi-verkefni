import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, ScrollView, TouchableOpacity, Alert, Linking, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function ArrivalsScreen({ navigation }) {
    let [isLoading, setIsLoading] = useState(true);
    let [response, setResponse] = useState();
    let [sorting, setSorting] = useState(0);
    
    useEffect(() => {
      fetch("https://www.isavia.is/fids/arrivals.aspx?_=1700818678295")
          .then(response => {
            return response.json();
          })
          .then(result => {
            setResponse(result.results)
            setIsLoading(false);
          })
    }, []);



    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Mahmoud Chikh</Text>
        </View>
    );
}