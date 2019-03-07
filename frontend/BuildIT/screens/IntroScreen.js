import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import ScaleImage from '../components/ScaleImage'


export default class IntroScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            naviFunc: navigation.getParam('naviFunc', navigation.navigate),
            naviScreen: navigation.getParam('naviScreen', 'Home'),
            uri: navigation.getParam('uri', '/'),
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
                        onPress={() => this.state.naviFunc(this.state.naviScreen)}
                    />
                </View>
                <ScaleImage uri={this.state.uri} style={styles.image} />
                <Text>{this.state.name}</Text>
                <Button title='Start assemble' color='black' onPress={()=>{}} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: 200
    },
    back: {
        marginTop: 30,
        justifyContent: 'flex-start'
    },
    container: {
        justifyContent: 'center'
    }
})