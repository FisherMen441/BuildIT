import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import SearchQR from '../components/SearchQR';

export default class SearchScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: ''
        }
    }

    updateSearchText(text) {
        this.setState(
            { searchText: text }
        )
    }


    searchResult(searchText) {
        if (searchText === '')
            return [
                { name: 'Table', id: 0, uri: 'https://cdn.shopify.com/s/files/1/2660/5106/files/LR-2-Main_159cda8c-8447-4d3b-888b-0bc8b8999dd2_960x.jpg'},
                { name: 'Bed', id: 1 , uri: 'https://cdn.shopify.com/s/files/1/2660/5106/files/LR-2-Main_159cda8c-8447-4d3b-888b-0bc8b8999dd2_960x.jpg'},
                { name: 'Lamp', id: 2, uri: 'https://cdn.shopify.com/s/files/1/2660/5106/files/LR-2-Main_159cda8c-8447-4d3b-888b-0bc8b8999dd2_960x.jpg' }
            ]
        else return [];
    }


    render() {
        let sr = this.searchResult(this.state.searchText);
        return (
            <View>
                <SearchQR naviFunc={this.props.navigation.navigate.bind(this)} naviScreen={'Home'} screen={'Search'} />
                <FlatList
                    data={sr}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Intro', {
                                uri: item.uri,
                                naviFunc: this.props.navigation.navigate.bind(this),
                                naviScreen: 'Search',
                                FID: item.id,
                            })}>
                            <View style={styles.searchItem}>
                                <Icon name='clock-outline' type='material-community' containerStyle={{ flex: 0.1 }} />
                                <Text style={{ flex: 0.9, fontSize: 16 }}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchItem: {
        borderColor: '#d7dadd',
        flexDirection: 'row',
        margin: 10
    },
})