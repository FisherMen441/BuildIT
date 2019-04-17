import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, Dimensions, AppRegistry, TouchableOpacity, Image, TouchableHighlight, TextInput} from 'react-native';
import { Icon } from 'react-native-elements';
import ScaleImage from '../components/ScaleImage'
import Swiper from 'react-native-swiper'
import {HOST} from '../config'


export default class ToolScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = props;
        this.state = {
            naviFunc: navigation.getParam('naviFunc', navigation.navigate),
            stepScreen: navigation.getParam('stepScreen', 'Step'),
            FID: navigation.getParam('FID', 1),
            SID: navigation.getParam('SID', 1),
            tools: '',
            description:'',
            img_uri: ''
        }
    }

    async componentDidMount() {
        fetch(
            `${HOST}/api/tools/?furniture_id=${this.state.FID}&step=${this.state.SID}`,
            {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => {
            if (!response.stateText == 'OK')
                throw Error("Not 200 status code");
            return response.json();
        })
        .then((data)=>{
            this.setState({
                tools: data['tool_list'][0]['Name'],
                img_uri: `${HOST}${data['tool_list'][0]['Img_url']}`,
            })
        })
        .catch(error => console.log('Error: ', error))
    }

    backStep(){
        this.props.navigation.navigate('Step', {
            FID: this.state.FID,
            SID: this.state.SID,
        })
    }

    cameraNavigate(){
        this.state.naviFunc('CameraTool', {
            FID: this.state.FID,
            SID: this.state.SID
        })
    }

    postPressed() {
        this.backgroundColor='#ffffff';
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
            this.props.addPost();
            this.refs.PostText.clear();
        })
        .catch(error => console.log('Error: ', error))

    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.back}>
                    <Icon
                        name='arrow-left'
                        type='material-community'
                        style={{ flex: 0.1, size: 32 }}
                        onPress={this.backStep.bind(this)}
                    />
                    <View style={{ flex: 0.45 }} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign : "center" }}> Tools </Text>
                </View>
                <View style={styles.main}>
                    <Text style={styles.title}>Step: {this.state.SID}</Text>
                    {this.state.img_uri ? <ScaleImage uri={this.state.img_uri} style={styles.image} /> : null}
                    {this.state.tools ? <Text style={styles.description}>{this.state.description}</Text> : <Text>No tools needed</Text>}
                    <TouchableOpacity style={styles.button} onPress={this.cameraNavigate.bind(this)} ><Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}> Find Tools</Text></TouchableOpacity>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
    },
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
    main: {
        marginTop: 5,
        alignItems: 'center'
    },
    title:{
        margin: 5,
        fontSize: 30,
        color: '#696969',
    },
    description:{
        margin: 10,
        fontSize: 15,
        color: '#696969',
        textAlign: 'center'
    },
    comment: {
        marginTop: 40,
        alignItems: 'center',
        flexDirection: 'column',
        flex: 0,
    },
    stretch: {
        width: 70,
        height: 50,
        alignItems: 'center'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#8a8a8a',
        color: '#ffffff',
        padding: 10,
        borderRadius:10,
        margin:5,
    },
    post: {
        flexDirection: 'row'
    },
    tointro: {
        marginTop: 30,
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        flex: 0
    },
    textInput: {
        flex: 1,
        height: 40,
        width: Dimensions.get('window').width - 70,
        backgroundColor: '#fff',
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: '#8a8a8a',
        borderRadius:10,
    }
})