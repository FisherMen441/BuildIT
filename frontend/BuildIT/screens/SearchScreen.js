import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import SearchQR from '../components/SearchQR';
import { HOST } from '../config';
import ScaleImage from '../components/ScaleImage';

export default class SearchScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: '',
            return_list: []
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
                { name: 'Accent Table', id: 1, uri:  'https://images-na.ssl-images-amazon.com/images/I/71yCFbAM0jL._SL1500_.jpg'},
                { name: 'Lamp', id: 2 , uri: 'https://www.ikea.com/PIAimages/0314514_PE514214_S5.JPG'},
            ]
        else {
            fetch(
                `${HOST}/api/search/?search_text=${this.state.searchText}`,
                {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(response => {
                if (!response.stateText == 'OK')
                    throw Error("Not 200 status code");
                return response.json();
            })
            .then((data)=>{
                return_list = []
                data = data['result']
                data.forEach((d) => {return_list.push({name: d.name, id: d.id, uri: `${HOST}${d.img_url}`})});
                console.log('list', return_list)
                this.setState({
                    return_list: return_list
                })
                return return_list;
            })
            .catch(error => console.log('Error: ', error))
        };
    }


    render() {
        let sr = this.searchResult(this.state.searchText);
        const search_result = [];
        console.log(this.state.return_list)
        this.state.return_list.forEach((element) => {
            search_result.push(
                <ScaleImage uri={element.img_url} style={styles.small_image}/> ,
            );
        });

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
                <Text>haha</Text>
                {search_result}
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
    small_image: {
        width: Dimensions.get('window').width/2 - 10
    }
})