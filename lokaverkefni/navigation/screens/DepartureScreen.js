import * as React from 'react';
import { View, Text, Image } from 'react-native';

export default function DepartureScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => alert('Skydoesminecraft likes budder xD')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Departure Screen</Text>
        </View>
    );
}