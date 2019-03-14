import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, Dimensions, TouchableOpacity, Image, TextInput} from 'react-native';
import { Icon } from 'react-native-elements';
import ScaleImage from '../components/ScaleImage'


export default class CommentScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = props;
        this.state = {
            comments: '',
            text: '',
            naviFunc: navigation.getParam('naviFunc', navigation.navigate),
            introScreen: navigation.getParam('introScreen', 'Intro'),
            uri: navigation.getParam('uri', 'https://cdn.shopify.com/s/files/1/2660/5106/files/LR-2-Main_159cda8c-8447-4d3b-888b-0bc8b8999dd2_960x.jpg'),
        }
    }

    postPressed() {
        this.backgroundColor='#ffffff';
        const host = '';
        fetch('', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: "testuser5",
                message: this.state.text,
            })
        })
        .then(response => {
            if (!response.stateText == 'OK')
                throw Error("Not 200 status code");
            return;
        })
        .then(()=>{
            this.props.addPost()
            this.refs.PostText.clear();
        })
        .catch(error => console.log('Error: ', error))

    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container} >
                <View style={styles.tointro}>
                    <TouchableOpacity underlayColor="#ffffff00" onPress={() => { this.state.naviFunc('Intro', {
                        uri: this.state.uri,
                        naviFunc: this.state.naviFunc
                    }) }} > 
                        <Image style={styles.stretch} source={require('../assets/swipeup.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.post}>
                {/* TODO: align to bottom and keyboard align */}
                    <TextInput style={styles.textInput}
                        ref="PostText"
                        editable={true}
                        multiline={true}
                        value={this.state.text}
                        onChangeText={(text) => this.setState({ text: text }) }
                        placeholder="Post yout comments"
                    />
                    <View style={styles.right}>
                        <TouchableOpacity style={styles.button} onPress={this.postPressed.bind(this)}>
                            <Text style={{ fontSize: 18, color: 'white'}}> Post </Text>
                        </TouchableOpacity>
                    </View>
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
    post: {
        flexDirection: 'row'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#bfbfbf',
        color: '#ffffff',
        padding: 10,
        borderRadius:10,
    },
    main: {
        marginTop: 30,
        alignItems: 'center'
    },
    right: {
        alignSelf: 'flex-end'
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
    },
    textInput: {
        flex: 1,
        height: 40,
        width: Dimensions.get('window').width - 70,
        backgroundColor: '#fff',
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: '#8a8a8a',
        borderRadius:30,
    }
})