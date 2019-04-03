import React from 'react';
import { StyleSheet, View, Image, Text, FlatList, ScrollView, Button } from 'react-native';
import SearchQR from '../components/SearchQR';
import PicStack from '../components/PicStack';
import {HOST} from '../config'



export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            meta: {}
        }
    }

    componentDidMount() {
        fetch(`${HOST}/api/recommend/?user_id=1`, {
            method: 'GET',
        })
        .then(response => {
            if (!response.stateText == 'OK')
                throw Error("Not 200 status code");
            return response.json();
        })
        .then(data => {
            this.setState({meta: data["result"]});
        })
    }

    render() {
        let size = this.state.meta.length;
        let images1 = [], images2 = [];
        let FID1 = [], FID2 = [];
        for (let i  = 0; i < size /2; i++) {
            images1.push(`${HOST}${this.state.meta[i]["img"]}`);
            FID1.push(this.state.meta[i]["fid"]);
        }
        for (let i  = 0; i < size /2; i++) {
            images2.push(`${HOST}/${this.state.meta[i]["img"]}`);
            FID2.push(this.state.meta[i]["fid"]);
        }
        const focus={
            focusFunc: this.props.navigation.navigate.bind(this), 
            focusScreen: 'Search'
        };
        const { navigation } = this.props;
        console.log(images1);
        return (
            <View>
                <SearchQR naviFunc={navigation.navigate.bind(this)} naviScreen={'Search'} screen={'Home'}/>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={[styles.pic, styles.left]}>
                        <PicStack uris={images1} style={styles.PicStack} naviFunc={navigation.navigate.bind(this)} fid={FID1}/>
                    </View>
                    <View style={styles.pic}>
                        <PicStack uris={images2} style={styles.PicStack} naviFunc={navigation.navigate.bind(this)} fid={FID2}/>
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
    },
    PicStack: {
        alignSelf: 'center'
    }
})

