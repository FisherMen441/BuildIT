import React from 'react';
import { AppRegistry, StyleSheet, View, TouchableOpacity, Text, Dimensions, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { Camera, Permissions } from 'expo';
import { HOST } from '../config';

export default class CameraScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = props;
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            naviFunc: navigation.getParam('naviFunc', navigation.navigate),
            naviScreen: navigation.getParam('naviScreen', 'Step'),
            FID: navigation.getParam('FID', 1),
            SID: navigation.getParam('SID', 1)
        };
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    keeptaking() {
        setInterval(() => this.takePicture(), 50)
    }

    async takePicture() {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync({ skipProcessing: false, base64: true, quality: 0.0 });
            // const postData = {};
            //console.log(JSON.stringify(postData))
            fetch(`${HOST}/api/upload/`, {
                // headers: {
                //     'Content-Type' : "application/json", 
                // },
                method: 'POST',
                body: JSON.stringify({
                    img: photo.base64,
                    FID: this.state.FID,
                    SID: this.state.SID
                })
            }).
            then(response => {
                if (!response.stateText == 'OK')
                    throw Error("Not 200 status code");
                return response.json();
            })
            .then(data => console.log(data))
            .catch(err => console.log(err))
        }
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <View style={styles.back}>
                        <Icon
                            name='arrow-left'
                            type='material-community'
                            style={{ flex: 0.1 }}
                            onPress={() => {
                                this.state.naviFunc(this.state.naviScreen, {
                                    FID: this.state.FID,
                                    SID: this.state.SID,
                                });
                            }}
                        />
                        <View style={{ flex: 0.45 }} />
                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: "center" }}> Recognizing Components </Text>
                    </View>
                    <Camera style={{ flex: 1 }}
                        type={this.state.type}
                        ref={ref => { this.camera = ref; }}
                        ratio={'16:9'}
                        style={styles.camera}
                    >
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 500,
                                marginLeft: 150,
                            }}>
                            {/* <TouchableOpacity
                                style={{
                                    flex: 0.1,
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    this.setState({
                                        type: this.state.type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back,
                                    });
                                }}>
                                <Text
                                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                                    {' '}Flip{' '}
                                </Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity
                                // style={{
                                //     // flex: 0.1,
                                //     // alignSelf: 'flex',
                                // }}
                                onPress={() => this.takePicture()}
                            >
                            <Image source={require('../assets/takepic.jpg')} style={styles.icon}/>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    back: {
        marginTop: 40,
        marginLeft: 10,
        flexDirection: 'row'
    },
    camera: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 16 / 10,
    },
    icon: {
        width: Dimensions.get('window').width / 4,
        height: Dimensions.get('window').width / 4,
        resizeMode: 'contain'
    },
})