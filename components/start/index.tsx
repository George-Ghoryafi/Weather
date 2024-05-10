import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';

const StartScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Pressable>
                    <Image style={styles.moreInfo} source={require('./more.png')} />
                </Pressable>
                <View style={styles.centerTopContainer}>
                    <View style={styles.centerTopContainerTop}>
                       <Image source={require('./map-pin.png')} />
                        <Text style={styles.title}>Your Location</Text> 
                    </View>

                    <Text style={styles.date}>Monday, 3 October 9:00</Text>
                    
                </View>

                <Pressable onPress={() => {console.log('pressed')}}>
                    <Image style={styles.moreLocations} source={require('./plus-circle.png')}/>
                </Pressable>
            </View>
            
            <ScrollView style={styles.weatherContentContainer}>
                <View style={styles.borderAvoidance}>
                    <View style={styles.weatherOverview}>
                        <View style={styles.tempAndSky}>
                            <Text style={styles.currentWeather}>19</Text>
                            <Text style={styles.currentSky}>Cloudy</Text>
                        </View>
                        <Text style={styles.degree}>°</Text>
                        
                    </View>
                    
                    
                    
                    
                </View>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    headerContainer: {
        width: '100%',
        height: '10%',

        marginTop: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#5C6EE5',
        marginLeft: '4%',
    },
    centerTopContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: '12%',
    },
    centerTopContainerTop: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    moreLocations: {
        marginRight: '5%',
    },
    moreInfo: {
        marginLeft: '15%',
    },
    date: {
        color: '#5C6EE5',
        fontSize: 16,
        marginTop: 5,
    },
    weatherContentContainer: {
        width: '100%',
        height: '90%',
        backgroundColor: '#99A0FA',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: '5%',
    },
    borderAvoidance: {
        marginTop: 30,
    },
    weatherOverview: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 20,
    },
    currentWeather: {
        fontSize: 100,
        color: 'white',
    },
    currentSky: {
        fontSize: 24,
        color: 'white',
        marginLeft: 20,
    },
    degree: {
        fontSize: 100,
        color: 'white',
    },
    tempAndSky: {
        marginLeft: 20,
    },
});

export default StartScreen;