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
            naviScreen: navigation.getParam('naviScreen', 'Tool'),
            FID: navigation.getParam('FID', 1),
            SID: navigation.getParam('SID', 1),
            cvResult: 'false'
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
            this.setState({
                cvResult: 'loading'
            })
            let photo = await this.camera.takePictureAsync({ skipProcessing: false, base64: true, quality: 0.0 });
            fetch(`${HOST}/api/upload/`, {
                method: 'POST',
                body: JSON.stringify({
                    img: photo.base64,
                    FID: this.state.FID,
                    SID: this.state.SID,
                    requirement: 'tools',
                })
            }).
                then(response => {
                    if (!response.stateText == 'OK')
                        throw Error("Not 200 status code");
                    return response.json();
                })
                .then((data) => {
                    if (data['img_url']) {
                        this.setState({
                            cvResult: 'true'
                        })
                    }
                })
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
            if (this.state.cvResult === 'true') {
                return (
                    <View>
                        <View style={styles.back}>
                            <Icon
                                name='arrow-left'
                                type='material-community'
                                style={{ flex: 0.1 }}
                                onPress={() => { this.setState({ cvResult: 'false' }) }}
                            />
                            <View style={{ flex: 0.9 }} />
                        </View>
                        <View style={styles.img_container}>
                            <Image style={{ width: Dimensions.get('window').width - 30, height: Dimensions.get('window').height - 70 }} source={{ uri: `${HOST}/buildIT/result.jpg?${new Date().getTime()}` }} />
                        </View>
                    </View>
                );
            }
            else {
                return (
                    <View style={{ flex: 1 }}>
                        <View style={styles.back}>
                            <Icon
                                name='arrow-left'
                                type='material-community'
                                style={{ flex: 0.1, size: 32 }}
                                onPress={() => {
                                    this.state.naviFunc(this.state.naviScreen, {
                                        FID: this.state.FID,
                                        SID: this.state.SID,
                                    });
                                }}
                            />
                            <View style={{ flex: 0.45 }} />
                            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: "center" }}> Find Tools </Text>
                        </View>
                        <Camera style={{ flex: 1 }}
                            type={this.state.type}
                            ref={ref => { this.camera = ref; }}
                            ratio={'16:9'}
                            style={styles.camera}
                        >
                            {this.state.cvResult === 'loading' ?
                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: 'rgba(112, 112, 112, 0.8)',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    <Image source={require('../assets/Loading.png')} style={styles.loading} />
                                </View>
                                :
                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: 'transparent',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginTop: 400,
                                        marginLeft: 150,
                                    }}>
                                    <TouchableOpacity
                                        onPress={() => this.takePicture()}
                                    >
                                        <Image source={require('../assets/takepic.jpg')} style={styles.icon} />
                                    </TouchableOpacity>
                                </View>
                            }
                        </Camera>
                    </View>
                );
            }
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
        height: Dimensions.get('window').width * 16 / 9,
    },
    icon: {
        width: Dimensions.get('window').width / 4,
        height: Dimensions.get('window').width / 4,
        resizeMode: 'contain'
    },
    loading: {
        marginLeft: 150,
        width: Dimensions.get('window').width / 4,
        height: Dimensions.get('window').width / 4,
        resizeMode: 'contain'
    },
    img_container: {
        marginEnd: 10,
        marginLeft: 15
    }
})