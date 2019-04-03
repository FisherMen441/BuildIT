import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import SearchQR from '../components/SearchQR';
import {IP} from '../config'

export default class SearchScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: ''
        };
        this.updateSearchText = this.updateSearchText.bind(this);
        this.searchResult = this.searchResult.bind(this);
    }

    updateSearchText(text) {
        this.setState(
            { searchText: text }
        )
    }


    searchResult(searchText) {
        if (searchText === '')
            return [
                { name: 'Accent Table', id: 0, uri:  'https://images-na.ssl-images-amazon.com/images/I/71yCFbAM0jL._SL1500_.jpg'},
                { name: 'Lamp', id: 1 , uri: 'https://www.ikea.com/PIAimages/0314514_PE514214_S5.JPG'},
            ]
        else {
            console.log('search: ', this.state.searchText);
            fetch(
                `http://${IP}/api/search/?search_text=${this.state.searchText}`,
                {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(response => {
                if (!response.stateText == 'OK')
                    throw Error("Not 200 status code");
            })
            .then((data)=>{
                return_list = []
                data.forEach((d) => {return_list.push({name: d.name, id: d.id})});
                return return_list;
            })
            .catch(error => console.log('Error: ', error))
        };
    }


    render() {
        let sr = this.searchResult(this.state.searchText);
        return (
            <View>
                <SearchQR 
                    updateSearchText={this.updateSearchText.bind(this)} 
                    naviFunc={this.props.navigation.navigate.bind(this)} 
                    naviScreen={'Home'} 
                    screen={'Search'} />
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
                    } />
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