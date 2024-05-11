import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Feather from '@expo/vector-icons/Feather';


interface WeatherBubbleProps {
    time: number;
    weatherIcon: string;
    temperature: number;
}

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const WeatherBubble: React.FC<WeatherBubbleProps> = ({
    time,
    weatherIcon,
    temperature,
}) => {
    return (
        <View style={styles.container}>
            {
                time === 0 ? (
                    <Text style={styles.time}>Sun</Text>
                ) : time == 1 ? (
                    <Text style={styles.time}>Mon</Text>
                ) : time == 2 ? (
                    <Text style={styles.time}>Tue</Text>
                ) : time == 3 ? (
                    <Text style={styles.time}>Wed</Text>
                ) : time == 4 ? (
                    <Text style={styles.time}>Thu</Text>
                ) : time == 5 ? (
                    <Text style={styles.time}>Fri</Text>
                ) : (
                    <Text style={styles.time}>Sat</Text>
                )
            }
            {
                weatherIcon === 'Clear' ? (
                    <Feather name="sun" size={28} color="#99A0FA" />
                ) : weatherIcon === 'Clouds' ? (
                    <Feather name="cloud" size={28} color="#99A0FA" />
                ) : weatherIcon === 'Rain' ? (
                    <Feather name="cloud" size={28} color="#99A0FA" />
                ) : weatherIcon === 'Snow' ? (
                    <Feather name="cloud" size={28} color="#99A0FA" />
                ) : weatherIcon === 'Thunderstorm' ? (
                    <Feather name="cloud" size={28} color="#99A0FA" />
                ) : weatherIcon === 'Drizzle' ? (
                    <Feather name="cloud" size={28} color="#99A0FA" />
                ) : (
                    <Feather name="cloud" size={28} color="#99A0FA" />
                )

            }
            <Text style={styles.temperature}>{Math.floor(temperature)}°C</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.15,
        height: height * 0.15,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#5C6EE5',
        marginHorizontal: 10,
    },
    time: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#99A0FA',
    },
    weatherIcon: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    temperature: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#99A0FA',
    },
});

export default WeatherBubble;