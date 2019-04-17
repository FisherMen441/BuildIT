import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, Dimensions, AppRegistry, TouchableOpacity, Image, TouchableHighlight, TextInput, ScrollView} from 'react-native';
import { Icon } from 'react-native-elements';
import ScaleImage from '../components/ScaleImage';
import Swiper from 'react-native-swiper';
import CommentBox from '../components/CommentBox';
import {HOST} from '../config';


export default class IntroScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = props;
        this.state = {
            naviFunc: navigation.getParam('naviFunc', navigation.navigate),
            naviScreen: navigation.getParam('naviScreen', 'Home'),
            commentScreen: navigation.getParam('commentScreen', 'Comment'),
            stepScreen: navigation.getParam('stepScreen', 'Step'),
            uri: navigation.getParam('uri', ''),
            name: navigation.getParam('name', ''),
            comments: [],
            text: '',
            FID: navigation.getParam('FID', 1),
        }
    }

    componentDidMount() {
        fetch(
            `${HOST}/api/furniture_info/?furniture_id=${this.state.FID}`,
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
                name: data.Name,
                uri: `${HOST}${data.Img_url}`,
            })
        })
        .catch(error => console.log('Error: ', error));

        fetch(`${HOST}/api/comment/?furniture_id=${this.state.FID}&step=0`, {
            method: 'GET',
        })
        .then(response => {
            if (!response.stateText == 'OK')
                throw Error("Not 200 status code");
            return response.json();
        })
        .then((data)=>{
            this.setState({
                comments: data.comments
            })
        })
        .catch(error => console.log('Error: ', error));
    }

    postPressed() {
        if (this.state.text === ''){
            return;
        }
        this.backgroundColor='#ffffff';
        fetch(`${HOST}/api/comment/?furniture_id=${this.state.FID}&step=0`, {
            credentials: 'same-origin',
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: 1,
                furniture_id: this.state.FID,
                text: this.state.text,
                step: 0,
            })
        })
        .then(response => {
            if (!response.stateText == 'OK')
                throw Error("Not 200 status code");
            return response.json();
        })
        .then((data)=>{
            const newComments = this.state.comments
            newComments.push({
                User_name: data.User_name,
                Content: data.Content,
                });
            this.setState({
                comments: newComments,
                text: '',
            })
        })
        .catch(error => console.log('Error: ', error))
    }

    pressAssemble(){
        const {navigate} = this.props.navigation;
        navigate('Step', {
            FID: this.state.FID,
            SID: 1,
        })
    }

    render() {
        const { navigation } = this.props;
        const comments_list = [];
        this.state.comments.forEach((element, i)=>{
            comments_list.push(
                <View  key={i} style={{height: 100}}>
                <CommentBox userName={element.User_name} content={element.Content} editable={true}/>
                </View>
            )
        })
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
                            style={{ flex: 0.1, size: 32 }}
                            onPress={() => {
                                navigation.goBack()
                            }}
                        />
                        <View style={{ flex: 0.9 }}/>
                    </View>
                    <View style={styles.main}>
                        {this.state.uri ? <ScaleImage uri={this.state.uri} style={styles.image} />: null} 
                        <Text style={{ margin: 10, fontSize: 20, fontWeight: "bold"}}>{this.state.name}</Text>
                        <TouchableOpacity style={styles.button} onPress={this.pressAssemble.bind(this)}>
                            <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}> Start assemble </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.comment}>
                        <TouchableOpacity onPress={() => { this.state.naviFunc('Comment', {
                            uri: this.state.uri,
                            naviFunc: this.state.naviFunc,
                            FID: this.state.FID,
                            SID: 0
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
                    <View style={{flexDirection: 'column', justifyContent: 'center',alignItems: 'stretch',}}>
                        <View style={styles.tointro}>
                            <TouchableOpacity underlayColor="#ffffff00" onPress={() => { this.state.naviFunc('Intro', {
                                naviFunc: this.state.naviFunc
                            }) }} > 
                                <Image style={styles.stretch} source={require('../assets/swipeup.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.post}>
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
                        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                        {comments_list}
                        </ScrollView>
                    </View>
                </Swiper>
            </Swiper>
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
        marginLeft: 5,
        marginRight: 5
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
    post: {
        flexDirection: 'row',
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