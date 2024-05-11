import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable, Image, ScrollView, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import moment from 'moment';
import Details from './details';

type Weather = {
    timezone: string;
    current: {
        temp: number;
        dt: number;
        weather :[
            {
               id : number,
               main : string,
               description :string,
               icon : string
            }
         ]
    }

}


const StartScreen = () => {

    const [weather, setWeather] = useState<Weather>();
    const [location, setLocation] = useState(' ');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [time, setTime] = useState(moment(currentDate).format('MMMM Do YYYY, h:mm a'));

    const apiCall = `https://api.openweathermap.org/data/3.0/onecall?lat=43.5288426&lon=-79.7121996&units=metric&appid=e3583e9337a2eaf5236a2a072f79bbff`

    const getWeather = async () => {
        const response = await fetch(apiCall);
        const data = await response.json();
        setWeather(data);
    }

    useEffect(() => {
        getWeather();
    }, []);

    useEffect(() => {
        const getLocationAsync = async () => {
          try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              console.log('Location permission denied');
              return;
            }
    
            let location = await Location.getCurrentPositionAsync({});
            const address = await Location.reverseGeocodeAsync(location.coords);
            if(address[0].city != null){
                setLocation(address[0].city);
            }
            //setting the initial value

            let interval = setInterval(() => {
                setCurrentDate(new Date());
                setTime(moment(currentDate).format('MMMM Do YYYY, h:mm a'));
              }, 1000);

            return () => clearInterval(interval);
        
        } catch (error) {
            console.error('Error getting location:', error);
          }
        };
    
        getLocationAsync();
      }, []);

    if (!weather) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#5C6EE5" />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Pressable onPress={() => {console.log("more info")}}>
                    <Image style={styles.moreInfo} source={require('./more.png')} />
                </Pressable>
                <View style={styles.centerTopContainer}>
                    <View style={styles.centerTopContainerTop}>
                       <Image source={require('./map-pin.png')} />
                        <Text style={styles.title}>{location}</Text>
                    </View>

                    <Text style={styles.date}>{time}</Text>
                    
                </View>

                <Pressable onPress={() => {console.log('pressed')}}>
                    <Image style={styles.moreLocations} source={require('./plus-circle.png')}/>
                </Pressable>
            </View>
            
            <ScrollView style={styles.weatherContentContainer}>
                <View style={styles.weatherOverview}>
                    <View style={styles.weatherOverview}>
                        <View style={styles.tempAndSky}>
                            <Text style={styles.currentWeather}>{Math.floor(weather.current.temp)}</Text>
                            <Text style={styles.currentSky}>{weather.current.weather[0].main}</Text>
                        </View>
                        <Text style={styles.degree}>°</Text> 
                    </View> 

                </View>
                <View style={styles.detailedOval}>
                    <Details></Details>
                </View>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
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
        height: '100%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: '5%',
    },
    weatherOverview: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 10,
    },
    currentWeather: {
        fontSize: 100,
        color: '#99A0FA',
    },
    currentSky: {
        fontSize: 24,
        color: '#99A0FA',
        marginLeft: 20,
    },
    degree: {
        fontSize: 100,
        color: '#99A0FA',
    },
    tempAndSky: {
        marginLeft: 20,
    },
    loading: {
        marginTop: '20%',
    }, 
    detailedOval: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        
    },
});

export default StartScreen;