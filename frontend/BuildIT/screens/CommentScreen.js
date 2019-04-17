import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, Dimensions, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import {HOST} from '../config';
import CommentBox from '../components/CommentBox';


export default class CommentScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = props;
        this.state = {
            FID: navigation.getParam('FID', 1),
            SID: navigation.getParam('SID', 0),
            comments: [],
            text: '',
            naviFunc: navigation.getParam('naviFunc', navigation.navigate),
            introScreen: navigation.getParam('introScreen', 'Intro'),
            stepScreen: navigation.getParam('stepScreen', 'Step'),
            uri: navigation.getParam('uri', ''),
        }
    }

    componentDidMount() {
        fetch(`${HOST}/api/comment/?furniture_id=${this.state.FID}&step=0${this.state.SID}`, {
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

    commentBack() {
        if (this.state.SID === 0) {
            this.state.naviFunc('Intro', {
                naviFunc: this.state.naviFunc,
                FID: this.state.FID,
            })
        }
        else {
            this.state.naviFunc('Step', {
                naviFunc: this.state.naviFunc,
                FID: this.state.FID,
                SID: this.state.SID,
            })
        }
    }

    postPressed() {
        if (this.state.text === ''){
            return;
        }
        this.backgroundColor='#ffffff';
        fetch(`${HOST}/api/comment/?furniture_id=${this.state.FID}&step=${this.state.SID}`, {
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
                "my": 123,
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
            <View style={{flexDirection: 'column', justifyContent: 'center',alignItems: 'stretch',}}>
                <View style={styles.tointro}>
                    <TouchableOpacity underlayColor="#ffffff00" onPress={this.commentBack.bind(this)}>
                        <Image style={styles.stretch} source={require('../assets/swipeup.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.post}>
                    <TextInput style={styles.textInput}
                        ref="PostText"
                        editable={true}
                        multiline={true}
                        value={this.state.text}
                        onChangeText={(text) => this.setState({ text: text })}
                        placeholder="Post yout comments"
                    />
                    <TouchableOpacity style={styles.button} onPress={this.postPressed.bind(this)}>
                        <Text style={{ fontSize: 18, color: 'white' }}> Post </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    {comments_list}
                </ScrollView>
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