import React from 'react';
import { StyleSheet, View, Image, Text, FlatList, ScrollView } from 'react-native';
import SearchQR from '../components/SearchQR';
import PicStack from '../components/PicStack';



export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        let images1 = [
            'https://secure.img1-fg.wfcdn.com/im/12654093/resize-h600-w600%5Ecompr-r85/6840/68402479/.jpg',
            'https://cdn.shopify.com/s/files/1/2660/5106/files/LR-2-Main_159cda8c-8447-4d3b-888b-0bc8b8999dd2_960x.jpg', 
            'https://secure.img1-fg.wfcdn.com/im/12654093/resize-h600-w600%5Ecompr-r85/6840/68402479/.jpg'

            ,
            'https://secure.img1-fg.wfcdn.com/im/12654093/resize-h600-w600%5Ecompr-r85/6840/68402479/.jpg',
            'https://cdn.shopify.com/s/files/1/2660/5106/files/LR-2-Main_159cda8c-8447-4d3b-888b-0bc8b8999dd2_960x.jpg', 
            'https://secure.img1-fg.wfcdn.com/im/12654093/resize-h600-w600%5Ecompr-r85/6840/68402479/.jpg'

            ,
            'https://secure.img1-fg.wfcdn.com/im/12654093/resize-h600-w600%5Ecompr-r85/6840/68402479/.jpg',
            'https://cdn.shopify.com/s/files/1/2660/5106/files/LR-2-Main_159cda8c-8447-4d3b-888b-0bc8b8999dd2_960x.jpg', 
            'https://secure.img1-fg.wfcdn.com/im/12654093/resize-h600-w600%5Ecompr-r85/6840/68402479/.jpg'
        ]
        let images2 = [
            'https://cdn.shopify.com/s/files/1/2660/5106/files/LR-2-Main_159cda8c-8447-4d3b-888b-0bc8b8999dd2_960x.jpg', 
            'https://secure.img1-fg.wfcdn.com/im/12654093/resize-h600-w600%5Ecompr-r85/6840/68402479/.jpg',
            'https://cdn.shopify.com/s/files/1/2660/5106/files/LR-2-Main_159cda8c-8447-4d3b-888b-0bc8b8999dd2_960x.jpg', 

            'https://cdn.shopify.com/s/files/1/2660/5106/files/LR-2-Main_159cda8c-8447-4d3b-888b-0bc8b8999dd2_960x.jpg', 
            'https://secure.img1-fg.wfcdn.com/im/12654093/resize-h600-w600%5Ecompr-r85/6840/68402479/.jpg',
            'https://cdn.shopify.com/s/files/1/2660/5106/files/LR-2-Main_159cda8c-8447-4d3b-888b-0bc8b8999dd2_960x.jpg', 

            'https://cdn.shopify.com/s/files/1/2660/5106/files/LR-2-Main_159cda8c-8447-4d3b-888b-0bc8b8999dd2_960x.jpg', 
            'https://secure.img1-fg.wfcdn.com/im/12654093/resize-h600-w600%5Ecompr-r85/6840/68402479/.jpg',
            'https://cdn.shopify.com/s/files/1/2660/5106/files/LR-2-Main_159cda8c-8447-4d3b-888b-0bc8b8999dd2_960x.jpg', 
        ]
        return (
            <View>
                <SearchQR />
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={[styles.pic, styles.left]}>
                        <PicStack uris={images1}/>
                        {/* <Image style={{resizeMode: 'contain', width: 100, height: 100}} source={{uri: 'https://cdn.shopify.com/s/files/1/2660/5106/files/LR-2-Main_159cda8c-8447-4d3b-888b-0bc8b8999dd2_960x.jpg'}}/> */}
                    </View>
                    <View style={styles.pic}>
                        <PicStack uris={images2}/>
                        {/* <Image style={{resizeMode: 'contain',width: 100, height: 100}}  source={{uri: 'https://secure.img1-fg.wfcdn.com/im/12654093/resize-h600-w600%5Ecompr-r85/6840/68402479/.jpg'}} /> */}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white', 
        // backgroundColor: 'yellow'
    },
    contentContainer: {
        flexDirection: 'row'
    },
    pic: {
        flex: 1
    },
    left: {
        backgroundColor: 'white',
        // backgroundColor: 'red'
    }
})

