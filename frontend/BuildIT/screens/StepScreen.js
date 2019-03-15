import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, Dimensions, AppRegistry, TouchableOpacity, Image, TouchableHighlight, TextInput} from 'react-native';
import { Icon } from 'react-native-elements';
import ScaleImage from '../components/ScaleImage'
import { NavigationActions } from 'react-navigation'


export default class StepScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = props;
        this.state = {
            naviFunc: navigation.getParam('naviFunc', navigation.navigate),
            stepScreen: navigation.getParam('stepScreen', 'Step'),
            FID: props.FID,
            SID: props.SID,
            uri: navigation.getParam('uri', 'https://cdn.shopify.com/s/files/1/2660/5106/files/LR-2-Main_159cda8c-8447-4d3b-888b-0bc8b8999dd2_960x.jpg'),
            stepManualLoc: '',
            videoLink: '',
            description:'This is description',
            name: navigation.getParam('name', 'annonymous'),
        }
    }

    async componentDidMount() {
        const host = '';
        fetch(
            '0.0.0.0:8000/api/manual/?furniture_id=' 
            + this.state.FID 
            + '&step=' + this.state.SID,
            {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: "testuser5",
                message: 'get step',
            })
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
                videoLink: data.video_link
            })
        })
        .catch(error => console.log('Error: ', error))
    }

    backStep(){
        if (this.state.step === 0){//back to intro
            this.props.navigation.navigate('Intro', {
                uri: this.state.uri,
                FID: this.props.FID,
            })
        } else{
            this.props.navigation.navigate('Step', {
                FID: this.state.FID,
                SID: this.state.SID - 1,
            })
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
                            const backAction = NavigationActions.back({
                                key: null
                              });
                              navigation.dispatch(backAction);
                        }}
                    />
                    <View style={{ flex: 0.9 }}/>
                </View>
                <View style={styles.main}>
                    <ScaleImage uri={this.state.uri} style={styles.image} />
                    <Text style={{ margin: 10 }}>{this.state.name}</Text>
                </View>
                {/* <View style={styles.comment}>
                    <TouchableOpacity onPress={() => { this.state.naviFunc('Comment', {
                        uri: this.state.uri,
                    })}} >
                        <Image style={styles.stretch} source={require('../assets/swipedown.png')} />
                    </TouchableOpacity>
                </View> */}
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
        marginTop: 30,
        alignItems: 'center'
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
        marginLeft: 5,
        marginRight: 5
    },
})