import React from 'react';
import { AppRegistry, StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class QRScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = props;
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            naviFunc: navigation.getParam('naviFunc', navigation.navigate),
            naviScreen: navigation.getParam('naviScreen', 'Step'),
            FID: this.props.FID,
            SID: this.props.SID
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
            console.log('photo.base64.length')
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
                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: "center" }}> Scan QR Code </Text>
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
                            }}>
                            <TouchableOpacity
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
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    // flex: 0.1,
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                }}
                                onPress={() => this.takePicture()}
                            >
                                <Text
                                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                                    {' '}Take Picture{' '}
                                </Text>
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
        height: Dimensions.get('window').width * 16 / 9
    },

})