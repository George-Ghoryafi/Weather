import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

const StartScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Pressable>
                    <Image source={require('./more.png')} />
                </Pressable>
                
                
                <Text style={styles.text}>Your Location</Text>
            </View>
            

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
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        marginTop: 50,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default StartScreen;