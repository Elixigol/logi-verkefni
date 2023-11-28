import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, ScrollView, TouchableOpacity, Alert, Linking, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function ArrivalsScreen({ navigation }) {
  let [isLoading, setIsLoading] = useState(true);
  let [response, setResponse] = useState();
  let [filter, setFilter] = useState(0);

  let FIHandlers = ["GL", "RC", "OS", "WK", "LX", "AY", "FI", "LH", "DY", "SK", "UA"];

  const [dropdownStates, setDropdownStates] = useState({});

  const options = ['Option 1', 'Option 2'];



  useEffect(() => {
    fetch("http://localhost:3000/api/departures")
        .then(response => {
          return response.json();
        })
        .then(result => {
          setResponse(result.Items)
          setIsLoading(false);
        })
  }, []);

  const getFilteredData = () => {
    if (filter === 1) {
      return response.filter((flight) => FIHandlers.includes(flight.AirlineIATA))
    } else if (filter === 2) {
      return response.filter((flight) => !FIHandlers.includes(flight.AirlineIATA))
    }
    return response
  }

  const handleFilterPress = (value) => {
    setFilter((prevFilter) => (prevFilter === value ? 0 : value))
  }

  const toggleDropdown = (flightId) => {
    setDropdownStates(prevStates => ({
      ...prevStates,
      [flightId]: !prevStates[flightId],
    }));
  };

  const getContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }



    let data = getFilteredData();

    

    
    return (
        <ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => handleFilterPress(1)}>
              <Text>ICELANDAIR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleFilterPress(2)}>
              <Text>AIRPORT ASSOCIATES</Text>
            </TouchableOpacity>
          </View>
          
            {data.map((flight) => {
              console.log
                return (
                    <View key={flight.Id} style={styles.station}>
                        <Text style={styles.h3}>{flight.DisplayName}, {flight.Airline}</Text>
                        <Text>{flight.No}, STD: {flight.Scheduled.substring(11,16)}</Text>
                        <Text>{flight.Additional == null ? flight.Status :flight.Additional}</Text>
                        <TouchableOpacity key={flight.Id} onPress={() => toggleDropdown(flight.Id)}>
                          <Text style={styles.h3}>{dropdownStates[flight.Id] ? 'Show Less' : 'Show More'}</Text>
                        </TouchableOpacity>
                        {dropdownStates[flight.Id] && (
                          <View>
                            <Text>A/C Reg: {flight.Aircraft}</Text>
                            <Text>A/C Type: {flight.AircraftType}</Text>
                            <Text>Gate: {flight.Gate}</Text>
                            <Text>Stand: {flight.Stand}</Text>
                          </View>
                        )}
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
    width: '380px',
    alignSelf: "center"
    
  },
  button: {
    display: "flex",
    textDecorationLine: "none",
    padding: "20px",
    borderRadius: "5px",
    backgroundColor: "#789EFF",
    color: "#ffffff",
    fontWeight: "900",
    margin: "5px",
    marginTop: "5px",
    width: "200px",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    
  }


});