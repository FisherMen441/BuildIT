import React, { Component } from "react";
import { View, Text, StyleSheet, ListView } from "react-native";
import { Icon } from 'react-native-elements';
import {HOST} from '../config';
import globalStyle, {
    width,
    rx
} from "./variable"

export default class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.maxRating = this.props.maxRating ? this.props.maxRating : 5
        this.rating = this.props.rating <= this.maxRating && this.props.rating >= 0 ? this.props.rating : 0
        this.editable = this.props.editable ? this.props.editable : false
        this.ratingArr = []
        this.dSource = (new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }))
        this.initPage()
        this.state = { rating: this.dSource.cloneWithRows(this.ratingArr), like: false, likes: this.props.likes ? this.props.likes : 0}
        this.props.selectStar = null
        this.userName = this.props.userName ? this.props.userName: null
        this.content = this.props.content ? this.props.content: null
        this.commentID = this.props.commentID
    }
    selectStar = (item, Windex) => {
        if (this.editable == true) {
            this.rating = item.level
            this.setRatingChange()
            this.setState({ rating: this.dSource.cloneWithRows(this.ratingArr) })
            this.props.selectStar ? this.props.selectStar(item.level) : ""
            fetch(`${HOST}/api/rate_comment/`, {
                credentials: 'same-origin',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    comment_id: this.commentID,
                    star: this.rating,
                })
            })
                .then(response => {
                    if (!response.stateText == 'OK')
                        throw Error("Not 200 status code");
                    return response.json();
                })
                .then((data) => {
                    return
                })
                .catch(error => console.log('Error: ', error))
            return item.level
        } else {
            return false
        }
    }
    componentWillReceiveProps = (nextProps) => {
        this.maxRating = nextProps.maxRating ? nextProps.maxRating : 5
        this.rating = nextProps.rating ? (nextProps.rating >= 0 && nextProps.rating <= this.maxRating ? nextProps.rating : this.maxRating) : this.maxRating
        this.editable = nextProps.editable ? nextProps.editable : false
        this.props.selectStar = nextProps.selectStar ? nextProps.selectStar : null
        this.initPage()
    }
    initPage = () => {
        this.setRatingChange()
    }
    
    likePress = () =>{
        console.log(this.commentID)
        var flag = false;
        if (!this.state.like){
            var temp = this.state.likes
            flag = !this.state.like
            this.setState ({
                like: true,
                likes: temp + 1
            })
        }else{
            var temp = this.state.likes
            flag = !this.state.like
            this.setState ({
                like: false, 
                likes: temp - 1
            })
        }
        console.log(flag)
        fetch(`${HOST}/api/like_comment/`, {
            credentials: 'same-origin',
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                comment_id: this.commentID,
                like: flag ? 'true' : 'false',
            })
        })
            .then(response => {
                if (!response.stateText == 'OK')
                    throw Error("Not 200 status code");
                return response.json();
            })
            .then((data) => {
                return
            })
            .catch(error => console.log('Error: ', error))
            
    }

    setRatingChange = () => {
        this.ratingArr = Array.from({ length: this.maxRating }).map((item, index) => {
            if (this.rating <= index + 1) {
                return {
                    status: true,
                    index,
                    level: index + 1
                }
            } else {
                return {
                    status: false,
                    index,
                    level: index + 1
                }
            }
        })
    }
    render = () => {
        return (
        <View style={styles.vView}>
            <View style={[styles.vRatingV, styles.vRating_s]}>
                <ListView
                    contentContainerStyle={styles.vRating}
                    dataSource={this.state.rating}
                    renderRow={(item, index) => <Text
                        onPress={this.selectStar.bind(this, item, index)}
                        style={[styles.rating, this.rating < item.level ? styles.rating_n : ""]}>&#11089;</Text>}
                />
                <View style={styles.vlike}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{this.userName}</Text>
                <View style={{flexDirection: "row", marginRight: 20}}>
                <Icon
                    name='heart'
                    type='feather'
                    style={styles.vheart}
                    color={this.state.like ? '#D81E06' : '#2C2C2C'}
                    onPress={this.likePress.bind(this)}
                />
                <Text style={{ fontSize: 18, marginLeft: 5}}> {this.state.likes}</Text>
                </View>
                
                </View>
                
                <Text style={{ fontSize: 16 }}>{this.content}</Text>
            </View>
        </View>)
    }
}

const styles = StyleSheet.create({
    vView: {
        position: "relative",
    },
    vlike:{
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    vheart:{
        alignSelf: 'flex-end',
        marginRight: rx(20),
    },
    vRating: {
        flexDirection: "row",
        flexWrap: "wrap",
        width,
    },
    vRatingV: {
        position: "absolute",
        top: 0,
        left: 0,
    },
    vRating_s: {
        zIndex: 1000
    },
    vRating_n: {
        zIndex: 800
    },
    rating: {
        // fontFamily: "iconfont",
        fontSize: rx(34),
        color: '#ff6600',
        marginRight: rx(10),
        backgroundColor: "#ffffff",
        alignItems: "flex-start",

    },
    rating_n: {
        color: '#cccccc',
    }
})
