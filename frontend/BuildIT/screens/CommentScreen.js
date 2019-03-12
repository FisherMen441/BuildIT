import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, Dimensions, AppRegistry, TouchableOpacity, Image, TouchableHighlight} from 'react-native';
import { Icon } from 'react-native-elements';
import ScaleImage from '../components/ScaleImage'


export default class CommentScreen extends React.Component {
    constructor(props) {
        super();
        this.state = {
            // naviFunc: navigation.getParam('naviFunc', navigation.navigate),
            // introScreen: navigation.getParam('naviScreen', 'Intro')
        }
    }

    render() {
        return (
            <View style={styles.container} >
                <View style={styles.tointro}>
                {/* TODO: the arrow needs to link to the intro page */}
                    <TouchableOpacity underlayColor="#ffffff00" > 
                        <Image style={styles.stretch} source={require('../assets/swipeup.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: Dimensions.get('window').width - 20,
        borderRadius: 30,
        margin: 10
    },
    back: {
        marginTop: 40,
        marginLeft: 10,
        flexDirection: 'row',
    },
    container: {
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#8a8a8a',
        color: '#ffffff',
        padding: 10,
        borderRadius:10,
    },
    main: {
        marginTop: 30,
        alignItems: 'center'
    },
    tointro: {
        marginTop: 30,
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        flex: 0
    },
    stretch: {
        width: 70,
        height: 50,
        backgroundColor: '#ffffff',
        alignItems: 'center'
    }
})