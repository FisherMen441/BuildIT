import React from 'react';
import { StyleSheet, View, Text, Button, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import ScaleImage from '../components/ScaleImage'


export default class IntroScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = props;
        this.state = {
            naviFunc: navigation.getParam('naviFunc', navigation.navigate),
            naviScreen: navigation.getParam('naviScreen', 'Home'),
            uri: navigation.getParam('uri', 'https://cdn.shopify.com/s/files/1/2660/5106/files/LR-2-Main_159cda8c-8447-4d3b-888b-0bc8b8999dd2_960x.jpg'),
            name: navigation.getParam('name', 'annonymous')
        }
    }

    render() {
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
                    <Button title='Start assemble' color='black' onPress={() => { }} />
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
    main: {
        marginTop: 30,
        alignItems: 'center'
    }
})