import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, ScrollView, TouchableOpacity, Alert, Linking, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';


export default function GasScreen({ navigation }) {
  let [isLoading, setIsLoading] = useState(true);
  let [response, setResponse] = useState();
  let [sorting, setSorting] = useState(0);
  

  const onPress = (lat, lng) => {
    var url = "http://maps.apple.com/?daddr=" + `${lat},${lng}`;
    Linking.openURL(url);
  };
  
  useEffect(() => {
    fetch("https://apis.is/petrol")
        .then(response => {
          return response.json();
        })
        .then(result => {
          setResponse(result.results)
          setIsLoading(false);
        })
  }, []);

  

  const getContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }



    let data = response;

    let geoLat = 63.996515;
    let geoLong = -22.560588;

    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }

    function dist(lat1, lon1, lat2, lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      return d;
    }

    for(let i = 0; i < data.length; i++){
      data[i]["distance"] = dist(geoLat, geoLong, data[i]["geo"]["lat"], data[i]["geo"]["lon"])
    }

    if (sorting == 0){
      data.sort((a,b) => a.distance > b.distance)
    }
    else {
      data.sort((a,b) => a.bensin95 > b.bensin95)
    }
    

    
    return (
        <ScrollView>
          <TouchableOpacity style={styles.button} onPress={() => setSorting(0)}>
            <Text>Sort by distance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setSorting(1)}>
            <Text>Sort by price</Text>
          </TouchableOpacity>
          
            {data.map((station) => {
              console.log
                return (
                    <View key={station.key} style={styles.station}>
                        <Text>{station.company}, {station.name}</Text>

                        <View style={styles.info}>
                          <Text>{station.bensin95}</Text>
                            <TouchableOpacity style={styles.button} onPress={() => onPress(station.geo.lat, station.geo.lon)}>
                              <Text>MAPS</Text>
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