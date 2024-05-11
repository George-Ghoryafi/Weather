import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable, Image, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import * as Location from 'expo-location';
import moment from 'moment';
import Details from './details';
import WeatherBubble from './weatherBubble';
import { Weather, Forecast } from './Types';


const StartScreen = () => {

    const numbers = Array.from({ length: 40 }, (_, i) => i); // Create an array from 0 to 40
    const [weather, setWeather] = useState<Weather>();
    const [fiveDay, setFiveDay] = useState<Forecast>();
    const [location, setLocation] = useState(' ');
    const [currentDate, setCurrentDate] = useState(new Date());
    const date = moment(currentDate).format('MMMM Do YYYY, h:mm a');
    const [time, setTime] = useState(date);
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);

    const apiCall = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=e3583e9337a2eaf5236a2a072f79bbff`

    const fiveDayForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=e3583e9337a2eaf5236a2a072f79bbff`

    const getWeather = async () => {
        const response = await fetch(apiCall);
        const data = await response.json();
        setWeather(data);
        //this prints out the day of the week as an integer Sunday 0 - Saturday 6
        //console.log(moment(currentDate).add(0, 'days').day()); 
    }

    const getFiveDayForecast = async () => {
        const response = await fetch(fiveDayForecast);
        const data = await response.json();
        setFiveDay(data);
    }

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
            
            const { longitude, latitude} = location.coords;
            setLatitude(latitude); //setting the initial value
            setLongitude(longitude);

            //setting the initial value
        
            } catch (error) {
                console.error('Error getting location:', error);
              }
            };
      
        getLocationAsync();
        getWeather();
        getFiveDayForecast();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentDate(new Date());
          setTime(moment(currentDate).format('MMMM Do YYYY, h:mm a'));
        }, 60000);

        return () => clearInterval(interval);
    }, []);


    if (!weather) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#5C6EE5" />
            </View>
        )
    }

    const handleMore = () => {
        
    }

    const handleplus = () => {
        
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Pressable onPress={() => handleMore()}>
                    <Image style={styles.moreInfo} source={require('./more.png')} />
                </Pressable>
                <View style={styles.centerTopContainer}>
                    <View style={styles.centerTopContainerTop}>
                       <Image source={require('./map-pin.png')} />
                        <Text style={styles.title}>{location}</Text>
                    </View>

                    <Text style={styles.date}>{time}</Text>
                    
                </View>

                <Pressable onPress={() => handleplus()}>
                    <Image style={styles.moreLocations} source={require('./plus-circle.png')}/>
                </Pressable>
            </View>
            
            <ScrollView style={styles.weatherContentContainer}>
                <View style={styles.weatherOverview}>
                    <View style={styles.currentWeatherCentral}>
                        <View style={styles.weatherOverview}>
                            <View style={styles.tempAndSky}>
                                <Text style={styles.currentWeather}>{Math.floor(weather.current.temp)}</Text>
                            </View>
                            <Text style={styles.degree}>°</Text> 
                        </View>
                        <Text style={styles.currentSky}>{weather.current.weather[0].main}</Text>
                        
                    </View> 

                </View>
                <View style={styles.detailedOval}>
                    <Details precipitation={(weather.daily[0].pop)*100} humidity={weather.current.humidity} windSpeed={Math.floor((weather.current.wind_speed) * 3.6)}></Details>
                </View>

                <View>
                    <Text style={styles.forecastTitle}>5-Day Forecast</Text>
                    <View style={styles.fiveDays}>
                        {
                        numbers.map((number) => (
                            <React.Fragment key={number}>
                                {number % 8 === 0 &&
                                    <WeatherBubble
                                        time={ fiveDay ? moment.unix(fiveDay?.list[number].dt).day() : 0}
                                        weatherIcon={fiveDay ? fiveDay?.list[number].weather[0].main : ' '}
                                        temperature={fiveDay ? fiveDay?.list[number].main.temp : 0}
                                    />
                                }
                            </React.Fragment>
                        ))
                            
                        }
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
        marginBottom: 40,
        
    },
    forecastTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#5C6EE5',
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 50,
    },
    fiveDays: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    currentWeatherCentral: {
        flexDirection: 'column',
        alignItems: 'center',
    }
});

export default StartScreen;