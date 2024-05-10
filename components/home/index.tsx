import React from 'react';
import { View, Text, StyleSheet, Image, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ navigation }: { navigation: any }) => {
    const handleSignUp = () => {
        navigation.navigate('Start');
    };

    return (
        <View style={styles.container}>
            <Image source={require('./cloud.png')} />
            <Text style={styles.title}>Weather</Text>
            <Pressable 
                style={styles.signUp}
                onPress={handleSignUp}
            >
                <Text style={styles.signUpText}>Get Started</Text>
            </Pressable>
            <Pressable style={styles.skip}>
                <Text style={styles.text}>Continue Without Account</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#99A0FA',
    },
    text: {
        fontSize: 16,
        color: '#5C6EE5',
    },
    title: {
        fontSize: 50,
        color: 'white',
    },
    signUp: {
        backgroundColor: '#5C6EE5',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 50,
        marginTop: '40%',
    },
    signUpText: {
        fontSize: 20,
        color: 'white',
    },
    skip: {
        marginTop: 20,
    },
});

export default HomeScreen;