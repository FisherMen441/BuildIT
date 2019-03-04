import React from 'react';
import { StyleSheet, View, Image, Text, FlatList, ScrollView } from 'react-native';
import SearchQR from '../components/SearchQR';

export default class SearchScreen extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <SearchQR naviFunc={this.props.navigation.navigate.bind(this)} naviScreen={'Home'} screen={'Search'} />
        );
    }
} 