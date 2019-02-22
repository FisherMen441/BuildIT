import React from 'react';
import { SearchBar } from 'react-native-elements';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';

export default class HomeScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            search: ''
        }
    }
    render(){
        return (
            <View style={styles.container}>
            <SearchBar
                inputContainerStyle={styles.inputContainer}
                containerStyle={styles.barContainer}
                placeholder="Find Furnitures...."
                onChangeText={(text) => this.setState({search: text})}
                value={this.state.search}
                onFocus={()=>{console.log('AA')}}
                onSubmitEditing={()=>{console.log('AHA')}} 
                returnKeyType={"search"}
            />
            <View style={styles.qrcode}>
                <TouchableOpacity  onPress={()=>console.log("QR")} >
                    <Image style={{resizeMode: 'contain', height: 40, width: 40}} source={require('../assets/qr_code.png')}/>
                </TouchableOpacity> 
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:
    {
        flexDirection: 'row',
        flex: 1
    },
    inputContainer: {
        backgroundColor: '#fff',
        borderRadius: 10
    },
    barContainer: {
        flex: 0.9,
        paddingTop:30, 
        backgroundColor:'white',
        borderBottomWidth: 2,
        borderBottomColor: '#d7dadd'
    },
    qrcode: {
        flex: 0.1,
        paddingTop: 30,
        width: 40,
        height: 40
    }
})