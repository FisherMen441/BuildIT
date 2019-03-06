import React from 'react';
import { StyleSheet, View, Text, FlatList} from 'react-native';
import {Icon } from 'react-native-elements';
import SearchQR from '../components/SearchQR';

export default class SearchScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: ''
        }
    }

    updateSearchText(text){
        this.setState(
        {searchText: text}
        )
    }


    searchResult(searchText){
        if (searchText === '' )
            return [
                {name: 'Table', id: 0},
                {name: 'Bed', id: 1},
                {name: 'Lamp', id: 2}
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
                    renderItem={({item}) => 
                        <View style={styles.searchItem}>
                            <Icon name='clock-outline' type='material-community' containerStyle={{flex: 0.1}}/>
                            <Text style={{flex: 0.9, fontSize: 16 }}>{item.name}</Text>
                        </View>
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