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
            FID: 0,
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
        this.state.FID = data;
        const query = `http://35.3.117.173:8000/api/furniture_info/?furniture_id=${this.state.FID.toString()}`;
        const url = encodeURI(query);
        fetch(url, {
            credentials: 'same-origin',
        })
        .then(response => {
            if (!response.stateText == 'OK') throw Error("Not 200 status code");
            return response.json();
        })
        .then((data)=>{
            this.setState({
                uri: data.Img_url,
                name: data.Name
            })
            // console.log(data)
        })
        .catch(error => console.log('Error: ', error))

        // This is the place holder for recent demo
        this.state.naviFunc('Intro', {
            uri: this.state.uri,
            name: this.state.name,
            FID: this.state.FID,
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
