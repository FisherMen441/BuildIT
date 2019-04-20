import React, { Component } from "react";
import { View, Text, StyleSheet, ListView } from "react-native";
import globalStyle, {
    width,
    rx
} from "./variable"

export default class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.maxRating = this.props.maxRating ? this.props.maxRating : 5
        this.rating = this.props.rating <= this.maxRating && this.props.rating >= 0 ? this.props.rating : this.maxRating
        this.editable = this.props.editable ? this.props.editable : false
        this.ratingArr = []
        this.dSource = (new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }))
        this.initPage()
        this.state = { rating: this.dSource.cloneWithRows(this.ratingArr) }
        this.props.selectStar = null
        this.userName = this.props.userName ? this.props.userName: null
        this.content = this.props.content ? this.props.content: null
    }
    selectStar = (item, Windex) => {
        if (this.editable == true) {
            this.rating = item.level
            this.setRatingChange()
            this.setState({ rating: this.dSource.cloneWithRows(this.ratingArr) })
            this.props.selectStar ? this.props.selectStar(item.level) : ""
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
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{this.userName}</Text>
                <Text style={{ fontSize: 16 }}>{this.content}</Text>
            </View>
        </View>)
    }
}

const styles = StyleSheet.create({
    vView: {
        position: "relative",
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