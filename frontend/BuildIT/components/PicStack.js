import React from 'react';
import { StyleSheet, View } from 'react-native';
import ScaleImage from './ScaleImage';

export default class PicStack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uris: props.uris
        }
    }

    render() {
        let images = [];
        for (let [index, uri] of this.state.uris.entries())
            images.push(
                <View style={styles.part} key={index}>
                    <ScaleImage uri={uri} style={styles.image}/>
                </View>
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
    },
    part: {
        margin: 10
    },
    image: {
        width: 170
    }

})

