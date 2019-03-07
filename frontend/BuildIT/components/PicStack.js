import React from 'react';
import { StyleSheet, View, TouchableOpacity} from 'react-native';
import ScaleImage from './ScaleImage';

export default class PicStack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uris: props.uris,
            naviFunc: props.naviFunc
        }
    }

    render() {
        let images = [];
        for (let [index, uri] of this.state.uris.entries())
            images.push(
                <TouchableOpacity  onPress={() => this.state.naviFunc('Intro', {
                    uri: uri,
                    naviFunc: this.state.naviFunc,
                    naviScreen: 'Home'
                })} key={index} >
                    <View style={styles.part}>
                        <ScaleImage uri={uri} style={styles.image}/>
                    </View>
                </TouchableOpacity>
            );
        return (
            <View style={styles.container}>
               {images}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center'
    },
    part: {
        marginTop: 5,
        marginBottom: 5,
    },
    image: {
        width: 190
    }

})

