import React from 'react';
import { StyleSheet, View} from 'react-native';
import SearchQR from '../components/SearchQR'



export default class HomeScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            LargeRecommends: [],
            SmallRecommends: [],
        }
    }

    render(){
        return (
            <SearchQR/>
        )
    }
}
