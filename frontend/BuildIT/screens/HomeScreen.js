import React from 'react';
import { StyleSheet, View, Image, Text, FlatList, ScrollView, Button } from 'react-native';
import SearchQR from '../components/SearchQR';
import PicStack from '../components/PicStack';
import {HOST} from '../config'



export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            images1: ['http://35.3.117.173:8000/sql/uploads/Accent_table.jpg'],
            images2: ['http://35.3.117.173:8000/sql/uploads/Accent_table.jpg'],
            FID1: [1],
            FID2: [2],
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
            data = data["result"]
            let size = data.length;
            var images1 = [], images2 = [];
            var FID1 = [], FID2 = [];
            for (let i  = 0; i < size /2; i++) {
                images1.push(`${HOST}${data[i]["img"]}`);
                FID1.push(data[i]["fid"]);
            }
            for (let i  = size/2; i < size; i++) {
                images2.push(`${HOST}${data[i]["img"]}`);
                FID2.push(data[i]["fid"]);
            }
        })
    }

    render() {
        const focus={
            focusFunc: this.props.navigation.navigate.bind(this), 
            focusScreen: 'Search'
        };
        const { navigation } = this.props;
        return (
            <View>
                <SearchQR naviFunc={navigation.navigate.bind(this)} naviScreen={'Search'} screen={'Home'}/>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Text>{images1[0]}</Text>
                <View style={[styles.pic, styles.left]}>
                    <PicStack uris={this.state.images1} style={styles.PicStack} naviFunc={navigation.navigate.bind(this)} fid={this.state.FID1}/>
                </View>
                <View style={styles.pic}>
                    <PicStack uris={this.state.images2} style={styles.PicStack} naviFunc={navigation.navigate.bind(this)} fid={this.state.FID2}/>
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

