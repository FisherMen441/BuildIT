import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, Dimensions, AppRegistry, TouchableOpacity, Image, TouchableHighlight, TextInput} from 'react-native';
import { Icon } from 'react-native-elements';
import ScaleImage from '../components/ScaleImage';
import Swiper from 'react-native-swiper';
import { Constants, Video } from 'expo';


export default class StepScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = props;
        this.state = {
            naviFunc: navigation.getParam('naviFunc', navigation.navigate),
            stepScreen: navigation.getParam('stepScreen', 'Step'),
            FID: navigation.getParam('FID', 1),
            SID: navigation.getParam('SID', 1),
            stepManualLoc: navigation.getParam('uri', 'https://cdn.shopify.com/s/files/1/2660/5106/files/LR-2-Main_159cda8c-8447-4d3b-888b-0bc8b8999dd2_960x.jpg'),
            videoLink: '',
            description:'Note: Insert cam-lock in open position. Rotate to open position with screw driver if necessary.',
            videoOnPlay: 'false'
        }
    }

    async componentDidMount() {
        const host = '';
        console.log('http://100.64.9.41:8000/api/manual/?furniture_id=' 
        + this.state.FID 
        + '&step=' + this.state.SID)
        fetch(
            'http://100.64.9.41:8000/api/manual/?furniture_id=' 
            + this.state.FID 
            + '&step=' + this.state.SID,
            {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => {
            if (!response.stateText == 'OK')
                throw Error("Not 200 status code");
            return;
        })
        .then((data)=>{
            this.setState({
                stepManualLoc: data.img_url,
                description: data.description,
                videoLink: data.video_link,
            })
        })
        .catch(error => console.log('Error: ', error))
    }

    backStep(){
        if (this.state.SID === 1){//back to intro
            this.props.navigation.navigate('Intro', {
                FID: this.state.FID,
            })
        } else{
            this.props.navigation.navigate('Step', {
                FID: this.state.FID,
                SID: this.state.SID - 1,
            })
        }
    }

    toolStep(){
        this.props.navigation.navigate('Tool', {
            FID: this.state.FID,
            SID: this.state.SID
        })
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
            this.props.addPost();
            this.refs.PostText.clear();
        })
        .catch(error => console.log('Error: ', error))

    }

    cameraNavigate(){
        this.state.naviFunc('Camera', {
            FID: this.state.FID,
            SID: this.state.SID
        })
    }

    render() {
        const { navigation } = this.props;
        console.log(this.state.videoOnPlay);
        if (this.state.videoOnPlay === 'false'){
            return (
                <Swiper 
                    loop={false}
                    horizontal={false}
                    showsPagination={false}
                >
                <View style={styles.container}>
                    <View style={styles.back}>
                        <Icon
                            name='arrow-left'
                            type='material-community'
                            style={{ flex: 0.1 }}
                            onPress={this.backStep.bind(this)}
                        />
                        <View style={{ flex: 0.9 }}/>
                    </View>
                    <View style={styles.main}>
                        <Text style={styles.title}>Step: {this.state.SID}</Text>
                        <ScaleImage uri={this.state.stepManualLoc} style={styles.image} />
                        <Text style={styles.description}>{this.state.description}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => {this.setState({videoOnPlay: 'True'})}}><Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}> Video</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={this.toolStep.bind(this)}><Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}> Tools</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={this.cameraNavigate.bind(this)} ><Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}> Camera</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.button}><Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}> Next</Text></TouchableOpacity>
                    </View>
                    <View style={styles.comment}>
                        <TouchableOpacity onPress={() => { this.state.naviFunc('Comment', {
                            uri: this.state.uri,
                        })}} >
                            <Image style={styles.stretch} source={require('../assets/swipedown.png')} />
                        </TouchableOpacity>
                    </View>
                </View>        
    
                <Swiper
                    loop={false}
                    horizontal={false}
                    showsPagination={false}
                >
                    <View style={styles.container} >
                    <View style={styles.tointro}>
                        <TouchableOpacity>
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
                        <TouchableOpacity style={styles.button} onPress={this.postPressed.bind(this)}>
                            <Text style={{ fontSize: 18, color: 'white'}}> Post </Text>
                        </TouchableOpacity>
                    </View>
                    </View>
    
                </Swiper>
    
    
                </Swiper>
            )
        }else {
            return (
                <View style={styles.container}>
                    <View style={styles.back}>
                            <Icon
                                name='arrow-left'
                                type='material-community'
                                style={{ flex: 0.1 }}
                                onPress={() => {this.setState({videoOnPlay: 'false'})}}
                            />
                            <View style={{ flex: 0.9 }}/>
                        </View>
                    <Video
                        source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="cover"
                        shouldPlay
                        isLooping
                        style={{ width: 300, height: 300 }}/>
                </View>
            )
        }

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
        marginTop: 30,
        alignItems: 'center'
    },
    title:{
        margin: 10,
        fontSize: 40,
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
