// import React from 'react';
// import { AppRegistry, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
// import { Camera, Permissions } from 'expo';

// export default class QRScreen extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             hasCameraPermission: null,
//             type: Camera.Constants.Type.back,
//         };
//     }

//     async componentDidMount() {
//         const { status } = await Permissions.askAsync(Permissions.CAMERA);
//         this.setState({ hasCameraPermission: status === 'granted' });
//     }

//     keeptaking(){
//         setInterval(() => this.takePicture(), 50)
//     }

//     async takePicture () {
//         if (this.camera) {
//             let photo = await this.camera.takePictureAsync({skipProcessing: false, base64:true, quality: 0.0 });
//             console.log('photo.base64.length')
//         }
//     }

//     render() {
//         const { hasCameraPermission } = this.state;
//         if (hasCameraPermission === null) {
//             return <View />;
//         } else if (hasCameraPermission === false) {
//             return <Text>No access to camera</Text>;
//         } else {
//             return (
//                 <View style={{ flex: 1 }}>
//                     <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref; }} >
//                         <View
//                             style={{
//                                 flex: 1,
//                                 backgroundColor: 'transparent',
//                                 flexDirection: 'row',
//                             }}>
//                             <TouchableOpacity
//                                 style={{
//                                     flex: 0.1,
//                                     alignSelf: 'flex-end',
//                                     alignItems: 'center',
//                                 }}
//                                 onPress={() => {
//                                     this.setState({
//                                         type: this.state.type === Camera.Constants.Type.back
//                                             ? Camera.Constants.Type.front
//                                             : Camera.Constants.Type.back,
//                                     });
//                                 }}>
//                                 <Text
//                                     style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
//                                     {' '}Flip{' '}
//                                 </Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={{
//                                     // flex: 0.1,
//                                     alignSelf: 'flex-end',
//                                     alignItems: 'center',
//                                 }}
//                                 onPress={() => this.takePicture()}
//                             >
//                                 <Text
//                                     style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
//                                     {' '}Take Picture{' '}
//                                 </Text>
//                             </TouchableOpacity>
//                         </View>
//                     </Camera>
//                 </View>
//             );
//         }
//     }
// }

// const styles = StyleSheet.create({
//     preview: {

//     },

// })

import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { Icon } from 'react-native-elements';
import React, { Component } from 'react'

export default class QRScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = props;
        this.state = {
            hasCameraPermission: null,
            naviFunc: navigation.getParam('naviFunc', navigation.navigate),
            naviScreen: navigation.getParam('naviScreen', 'Home'),
            furniture_id: 0,
            uri: '',
            name: ''
        }
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    render() {
        const { hasCameraPermission } = this.state;
        const { navigation } = this.props;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View style={styles.container}>
                <View style={styles.back}>
                    <Icon
                        name='arrow-left'
                        type='material-community'
                        style={{ flex: 0.1 }}
                        onPress={() => {
                            this.state.naviFunc(this.state.naviScreen);
                        }}
                    />
                    <View style={{ flex: 0.45 }} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign : "center" }}> Scan QR Code </Text>
                </View>
                <BarCodeScanner
                    onBarCodeScanned={this.handleBarCodeScanned}
                    style={styles.camera}
                />
            </View>
        );
    }

    handleBarCodeScanned = ({ type, data }) => {
        this.state.furniture_id = data;
        const query = `/api/furniture_info/?furniture_id=${this.state.furniture_id.toString()}`;
        const url = encodeURI(query);
        // fetch(url, {
        //     credentials: 'same-origin',
        // })
        // .then(response => {
        //     if (!response.stateText == 'OK')
        //         throw Error("Not 200 status code");
        //     return;
        // })
        // .then((data)=>{
        //     this.setState({
        //         uri: data.uri,
        //         name: data.name
        //     })
        // })
        // .catch(error => console.log('Error: ', error))

        // This is the place holder for recent demo
        this.state.naviFunc('Intro', {
            uri: 'https://cdn.shopify.com/s/files/1/2660/5106/files/LR-2-Main_159cda8c-8447-4d3b-888b-0bc8b8999dd2_960x.jpg',
            naviFunc: this.state.naviFunc
        }) 
    }
}

const styles = StyleSheet.create({
    back: {
        marginTop: 40,
        marginLeft: 10,
        flexDirection: 'row'
    },
    container: { 
        flex: 1
    },
    post: {
        flexDirection: 'row'
    },
    camera: {
        position: 'absolute',
        left: 0, 
        right: 0, 
        top: 80, 
        bottom: 0
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
    }
})
