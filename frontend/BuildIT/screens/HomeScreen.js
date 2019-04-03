import React from 'react';
import { StyleSheet, View, Image, Text, FlatList, ScrollView, Button } from 'react-native';
import SearchQR from '../components/SearchQR';
import PicStack from '../components/PicStack';



export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        let images1 = [
            'https://www.ikea.com/PIAimages/0314514_PE514214_S5.JPG',
            'https://www.ikea.com/PIAimages/0314514_PE514214_S5.JPG',
            'https://www.ikea.com/PIAimages/0314514_PE514214_S5.JPG',
            'https://www.ikea.com/PIAimages/0314514_PE514214_S5.JPG',
            'https://www.ikea.com/PIAimages/0314514_PE514214_S5.JPG',
            'https://www.ikea.com/PIAimages/0314514_PE514214_S5.JPG',
        ]
        let images2 = [
            'https://images-na.ssl-images-amazon.com/images/I/71yCFbAM0jL._SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71yCFbAM0jL._SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71yCFbAM0jL._SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71yCFbAM0jL._SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71yCFbAM0jL._SL1500_.jpg'

        ]
        const focus={
            focusFunc: this.props.navigation.navigate.bind(this), 
            focusScreen: 'Search'
        };
        const { navigation } = this.props;
        return (
            <View>
                <SearchQR naviFunc={navigation.navigate.bind(this)} naviScreen={'Search'} screen={'Home'}/>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={[styles.pic, styles.left]}>
                        <PicStack uris={images1} style={styles.PicStack} naviFunc={navigation.navigate.bind(this)} />
                    </View>
                    <View style={styles.pic}>
                        <PicStack uris={images2} style={styles.PicStack} naviFunc={navigation.navigate.bind(this)} />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white', 
        // backgroundColor: 'yellow'
    },
    contentContainer: {
        flexDirection: 'row'
    },
    pic: {
        flex: 1
    },
    left: {
        backgroundColor: 'white',
        // backgroundColor: 'red'
    },
    PicStack: {
        alignSelf: 'center'
    }
})

