import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import ScaleImage from './ScaleImage';

export default class PicStack extends React.Component {
    constructor(props) {
        super(props);
        console.log("PicStack", props.uris);
        this.state = {
            uris: props.uris,
            naviFunc: props.naviFunc,
            fid: props.fid,
        }
    }


    render() {
        // console.log(this.state)
        let images = [];
        for (let [index, uri] of this.props.uris.entries())
            images.push(
                <TouchableOpacity  onPress={() => this.props.naviFunc('Intro', {
                    uri: uri,
                    naviFunc: this.props.naviFunc,
                    naviScreen: 'Home',
                    FID:  this.props.fid[index],
                })} key={index}  >
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
        width: Dimensions.get('window').width/2 - 10
    }

})

