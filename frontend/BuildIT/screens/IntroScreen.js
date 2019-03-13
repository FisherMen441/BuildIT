import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, Dimensions, AppRegistry, TouchableOpacity, Image, TouchableHighlight} from 'react-native';
import { Icon } from 'react-native-elements';
import ScaleImage from '../components/ScaleImage'


export default class IntroScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = props;
        this.state = {
            naviFunc: navigation.getParam('naviFunc', navigation.navigate),
            naviScreen: navigation.getParam('naviScreen', 'Home'),
            commentScreen: navigation.getParam('commentScreen', 'Comment'),
            uri: navigation.getParam('uri', 'https://cdn.shopify.com/s/files/1/2660/5106/files/LR-2-Main_159cda8c-8447-4d3b-888b-0bc8b8999dd2_960x.jpg'),
            name: navigation.getParam('name', 'annonymous')
        }
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.back}>
                    <Icon
                        name='arrow-left'
                        type='material-community'
                        style={{ flex: 0.1 }}
                        onPress={() => {
                            this.state.naviFunc(this.state.naviScreen);
                        }}
                    />
                    <View style={{ flex: 0.9 }}/>
                </View>
                <View style={styles.main}>
                    <ScaleImage uri={this.state.uri} style={styles.image} />
                    <Text style={{ margin: 10 }}>{this.state.name}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => { this.backgroundColor='#ffffff' }}><Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}> Start assemble </Text></TouchableOpacity>
                </View>
                <View style={styles.comment}>
                    <TouchableOpacity onPress={() => { this.state.naviFunc('Comment', {
                        uri: this.state.uri,
                        naviFunc: this.state.naviFunc
                    })} } >
                        <Image style={styles.stretch} source={require('../assets/swipedown.png')} />
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
    comment: {
        marginTop: 40,
        alignItems: 'center',
        flexDirection: 'column',
        flex: 0
    },
    stretch: {
        width: 70,
        height: 50,
        alignItems: 'center'
    }
})