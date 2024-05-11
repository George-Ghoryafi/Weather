import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';


const { width } = Dimensions.get('window');
const componentWidth = width * 0.85;
const componentHeight = width * 0.2;

const DetailsComponent: React.FC = () => {
    return (
        <View style={[styles.container, { width: componentWidth, height: componentHeight }]}>
            <View style={styles.div}>
                <Feather name="umbrella" size={28} color="#99A0FA" />
                <Text style={styles.detailsText}>0%</Text>
                <Text style={styles.detailsText}>Precipitation</Text>
            </View>
            <View style={styles.div}>
                <Feather name="droplet" size={28} color="#99A0FA" />
                <Text style={styles.detailsText}>20%</Text>
                <Text style={styles.detailsText}>Humidity</Text>
            </View>
            <View style={styles.div}>
                <MaterialCommunityIcons name="weather-windy" size={28} color="#99A0FA" />
                <Text style={styles.detailsText}>12 km/h</Text>
                <Text style={styles.detailsText}>Wind Speed</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 50,
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        elevation: 5,
    },
    div: {
        flex: 1,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#99A0FA',
    },
});

export default DetailsComponent;