import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, ListView, Dimensions, AppRegistry, TouchableOpacity, Image, TouchableHighlight, TextInput, WebView, ScrollView, Slider } from 'react-native';
import { Icon } from 'react-native-elements';
import ScaleImage from '../components/ScaleImage';
import Swiper from 'react-native-swiper';
import CommentBox from '../components/CommentBox';
import { Constants, Video } from 'expo';
import { HOST } from '../config'


export default class StepScreen extends React.Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.Content !== r2.Content });
        const { navigation } = props;
        this.state = {
            naviFunc: navigation.getParam('naviFunc', navigation.navigate),
            stepScreen: navigation.getParam('stepScreen', 'Step'),
            FID: navigation.getParam('FID', 1),
            SID: navigation.getParam('SID', 1),
            stepManualLoc: navigation.getParam('stepManualLoc', ''),
            videoLink: navigation.getParam('videoLink', ''),
            description: navigation.getParam('description', ''),
            videoOnPlay: 'false',
            comments: ds.cloneWithRows([]),
            text: '',
            arr: [],
            skipStep: navigation.getParam('SID', 1)
        }
    }

    async componentDidMount() {
        fetch(
            `${HOST}/api/manual/?furniture_id=${this.state.FID}&step=${this.state.SID}`,
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
            .then((data) => {
                this.setState({
                    stepManualLoc: `${HOST}${data.img_url}`,
                    description: data.description,
                    videoLink: data.Video_loc,
                })
            })
            .catch(error => console.log('Error: ', error));

        fetch(`${HOST}/api/comment/?furniture_id=${this.state.FID}&step=${this.state.SID}`, {
            method: 'GET',
        })
            .then(response => {
                if (!response.stateText == 'OK')
                    throw Error("Not 200 status code");
                return response.json();
            })
            .then((data) => {
                this.setState({
                    comments: this.state.comments.cloneWithRows(data.comments),
                    arr: data.comments,
                })
            })
            .catch(error => console.log('Error: ', error));
    }

    change(value) {
        this.setState(() => {
            return {
                skipStep: value,
            };
        });
    }

    backStep() {
        if (this.state.SID === 1) { // back to intro
            this.props.navigation.navigate('Intro', {
                FID: this.state.FID,
            })
        } else {
            var prev_sid = this.state.SID - 1;
            fetch(
                `${HOST}/api/manual/?furniture_id=${this.state.FID}&step=${this.state.SID - 1}`,
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
                .then((data) => {
                    if (data.img_url != '') {
                        this.setState({
                            FID: this.state.FID,
                            SID: this.state.SID - 1,
                            stepManualLoc: `${HOST}${data.img_url}`,
                            description: data.description,
                            videoLink: data.Video_loc,
                        })
                    }
                })
                .catch(error => console.log('Error: ', error));

            fetch(`${HOST}/api/comment/?furniture_id=${this.state.FID}&step=&step=${prev_sid}`, {
                method: 'GET',
            })
                .then(response => {
                    if (!response.stateText == 'OK')
                        throw Error("Not 200 status code");
                    return response.json();
                })
                .then((data) => {
                    this.setState({
                        comments: this.state.comments.cloneWithRows([])
                    });
                    this.setState({
                        arr: data.comments,
                        comments: this.state.comments.cloneWithRows(data.comments)
                    })
                })
                .catch(error => console.log('Error: ', error));
        }
    }

    toolStep() {
        this.props.navigation.navigate('Tool', {
            FID: this.state.FID,
            SID: this.state.SID
        })
    }

    postPressed() {
        if (this.state.text === '') {
            return;
        }
        this.backgroundColor = '#ffffff';
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
                step: this.state.SID,
            })
        })
            .then(response => {
                if (!response.stateText == 'OK')
                    throw Error("Not 200 status code");
                return response.json();
            })
            .then((data) => {
                const newComments = this.state.arr;
                newComments.push({
                    User_name: data.User_name,
                    Content: data.Content,
                });
                this.setState({
                    comments: this.state.comments.cloneWithRows(newComments),
                    text: '',
                })
            })
            .catch(error => console.log('Error: ', error))
    }

    cameraNavigate() {
        this.state.naviFunc('Camera', {
            FID: this.state.FID,
            SID: this.state.SID
        })
    }

    skipStep() {
        this.setState({
            SID: this.state.skipStep
        })
        fetch(
            `${HOST}/api/manual/?furniture_id=${this.state.FID}&step=${this.state.skipStep}`,
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
            .then((data) => {
                console.log(this.state.SID)
                this.setState({
                    stepManualLoc: `${HOST}${data.img_url}`,
                    description: data.description,
                    videoLink: data.Video_loc,
                })
            })
            .catch(error => console.log('Error: ', error));

        fetch(`${HOST}/api/comment/?furniture_id=${this.state.FID}&step=${this.state.skipStep}`, {
            method: 'GET',
        })
            .then(response => {
                if (!response.stateText == 'OK')
                    throw Error("Not 200 status code");
                return response.json();
            })
            .then((data) => {
                this.setState({
                    comments: this.state.comments.cloneWithRows(data.comments),
                    arr: data.comments,
                })
            })
            .catch(error => console.log('Error: ', error));
    }

    nextStep() {
        var next_sid = this.state.SID + 1;
        fetch(
            `${HOST}/api/manual/?furniture_id=${this.state.FID}&step=${this.state.SID + 1}`,
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
            .then((data) => {
                if (data.img_url != '') {
                    this.setState({
                        FID: this.state.FID,
                        SID: this.state.SID + 1,
                        stepManualLoc: `${HOST}${data.img_url}`,
                        description: data.description,
                        videoLink: data.Video_loc,
                    })
                } else {
                    alert(`This is the final step!`);
                }
            })
            .catch(error => console.log('Error: ', error));

        fetch(`${HOST}/api/comment/?furniture_id=${this.state.FID}&step=${next_sid}`, {
            method: 'GET',
        })
            .then(response => {
                if (!response.stateText == 'OK')
                    throw Error("Not 200 status code");
                return response.json();
            })
            .then((data) => {
                this.setState({
                    comments: this.state.comments.cloneWithRows([])
                });
                this.setState({
                    arr: data.comments,
                    comments: this.state.comments.cloneWithRows(data.comments)
                })
            })
            .catch(error => console.log('Error: ', error));
    }

    render() {
        const { navigation } = this.props;
        // const comments_list = [];
        // this.state.comments.forEach((element, i)=>{
        //     comments_list.push(
        //         <View  key={i} style={{height: 100}}>
        //         <CommentBox userName={element.User_name} content={element.Content} editable={true}/>
        //         </View>
        //     )
        // })
        if (this.state.videoOnPlay === 'false') {
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
                            <View style={{ flex: 0.9 }} />
                        </View>
                        <View style={styles.main}>
                            <Text style={styles.title}>Step: {this.state.SID}</Text>
                            {this.state.stepManualLoc ? <ScaleImage uri={this.state.stepManualLoc} style={styles.image} /> : null}
                            <Text style={styles.description}>{this.state.description}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{ fontSize: 18 }}>Skip to step {this.state.skipStep}</Text>
                                <TouchableOpacity style={styles.button} onPress={this.skipStep.bind(this)}><Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}> Go </Text></TouchableOpacity>
                            </View>
                            {this.state.FID === 1 ?
                                <Slider
                                    style={{ width: 300 }}
                                    step={1}
                                    minimumValue={1}
                                    maximumValue={7}
                                    onValueChange={this.change.bind(this)}
                                    value={this.state.SID}
                                />
                                :
                                <Slider
                                    style={{ width: 200 }}
                                    step={1}
                                    minimumValue={1}
                                    maximumValue={1}
                                    onValueChange={this.change.bind(this)}
                                    value={this.state.SID}
                                />
                            }
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity style={styles.button} onPress={() => { this.setState({ videoOnPlay: 'True' }) }}><Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}> Video</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={this.toolStep.bind(this)}><Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}> Tools</Text></TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.button} onPress={this.cameraNavigate.bind(this)} ><Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}> Component Camera</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={this.nextStep.bind(this)}><Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}> Next</Text></TouchableOpacity>
                        </View>
                        <View style={styles.comment}>
                            <TouchableOpacity onPress={() => {
                                this.state.naviFunc('Comment', {
                                    uri: this.state.uri,
                                    naviFunc: this.state.naviFunc,
                                    FID: this.state.FID,
                                    SID: this.state.SID,
                                })
                            }} >
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
                                <ListView
                                    enableEmptySections={true}
                                    dataSource={this.state.comments}
                                    renderRow={(rowData) => <View style={{ height: 100 }}><CommentBox userName={rowData.User_name} content={rowData.Content} editable={true} /></View>}
                                />
                            </ScrollView>
                        </View>

                    </Swiper>
                </Swiper>
            )
        } else {
            console.log(this.state.videoLink);
            return (
                <View style={styles.container}>
                    <View style={styles.back}>
                        <Icon
                            name='arrow-left'
                            type='material-community'
                            style={{ flex: 0.1, size: 32 }}
                            onPress={() => { this.setState({ videoOnPlay: 'false' }) }}
                        />
                        <View style={{ flex: 0.9 }} />
                    </View>
                    <View style={{ height: 240 }}>
                        <WebView
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            source={{ uri: this.state.videoLink }}
                        />
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
    },
    image: {
        width: Dimensions.get('window').height / 4 - 20,
        borderRadius: 30,
        margin: 10
    },
    back: {
        marginTop: 30,
        marginLeft: 10,
        flexDirection: 'row',
    },
    main: {
        marginTop: 5,
        alignItems: 'center'
    },
    title: {
        margin: 5,
        fontSize: 30,
        color: '#696969',
    },
    description: {
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
        padding: 7,
        borderRadius: 6,
        margin: 3,
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
        borderRadius: 10,
    }
})
