import React from 'react';
import { StyleSheet, View, Image, Text, FlatList, ScrollView, Button } from 'react-native';
import SearchQR from '../components/SearchQR';
import PicStack from '../components/PicStack';
import {HOST} from '../config'



export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            images1: [`${HOST}/sql/uploads/Accent_table.jpg`],
            images2: [`${HOST}/sql/uploads/lamp.png`],
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
            var images1_new = [], images2_new = [];
            var FID1 = [], FID2 = [];
            for (let i  = 0; i < size; i++) {
                images1_new.push(`${HOST}${data[i]["img"]}`);
                FID1.push(data[i]["fid"]);
            }
            for (let i  = size/2; i < size; i++) {
                images2_new.push(`${HOST}${data[i]["img"]}`);
                FID2.push(data[i]["fid"]);
            }
            this.setState({
                images1: images1_new,
                images2: images2_new
            })
        })
    }

    render() {
        const focus={
            focusFunc: this.props.navigation.navigate.bind(this), 
            focusScreen: 'Search'
        };
        const { navigation } = this.props;
        console.log('123')
        // console.log(this.state)
        return (
            <View>
                <SearchQR naviFunc={navigation.navigate.bind(this)} naviScreen={'Search'} screen={'Home'}/>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
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

