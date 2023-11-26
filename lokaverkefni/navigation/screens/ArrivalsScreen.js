import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, ScrollView, TouchableOpacity, Alert, Linking, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function ArrivalsScreen({ navigation }) {
  let [isLoading, setIsLoading] = useState(true);
  let [response, setResponse] = useState();
  let [sorting, setSorting] = useState(0);
  

  const onPress = (lat, lng) => {
    var url = "http://maps.apple.com/?daddr=" + `${lat},${lng}`;
    Linking.openURL(url);
  };
  
  useEffect(() => {
    fetch("http://localhost:3000/api/arrivals")
        .then(response => {
          return response.json();
        })
        .then(result => {
          setResponse(result.Items)
          setIsLoading(false);
        })
  }, []);

  

  const getContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }



    let data = response;

    

    
    return (
        <ScrollView>
          <TouchableOpacity style={styles.button} onPress={() => setSorting(0)}>
            <Text>IcelandAir</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setSorting(1)}>
            <Text>Airport Associates</Text>
          </TouchableOpacity>
          
            {data.map((flight) => {
              console.log
                return (
                    <View style={styles.station}>
                        <Text>{flight.Airline}, {flight.DisplayName}</Text>

                        <View style={styles.info}>
                          <Text>{flight.No}</Text>
                            <TouchableOpacity style={styles.button}>
                              <Text>Meow</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            })}
        </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {getContent()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  h3: {
    fontWeight: "bolder"
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    
    alignItems: "center",
    paddingLeft: "5px",
    paddingRight: "50px",

  },
  container: {
    flex: '1',
    backgroundColor: '#f2f2f2',
    color: "#FFFFFF",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "5px"
  },
  station: {
    display: "flex",
    
    backgroundColor: '#BCE3FF',
    margin: '10px',
    marginBottom: '5px',
    padding: '20px',
    borderRadius: "20px",
    width: '300px',
    marginLeft: "50px",
    marginRight: "50px",
    
  },
  button: {
    textDecorationLine: "none",
    padding: "20px",
    borderRadius: "5px",
    backgroundColor: "#789EFF",
    color: "#ffffff",
    fontWeight: "900",
    margin: "5px",
    marginTop: "5px"
  }

});