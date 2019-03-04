import React from 'react';
import { SearchBar } from 'react-native-elements';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    inputContainerStyle={styles.inputContainer}
                    containerStyle={styles.barContainer}
                    placeholder="Find Furnitures...."
                    onChangeText={(text) => this.setState({ search: text })}
                    value={this.state.search}
                    onFocus={() => { console.log('AA') }}
                    onSubmitEditing={() => { console.log('AHA') }}
                    returnKeyType={"search"}
                />
                <View style={styles.qrcode}>
                    <TouchableOpacity onPress={() => console.log("QR")} >
                        <Image style={{ resizeMode: 'center', height: 45, width: 45 }} source={require('../assets/qr_code.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:
    {
        flexDirection: 'row'
    },
    inputContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        backgroundColor: 'white'
    },
    barContainer: {
        flex: 0.9,
        marginTop: 25,
        paddingBottom: 0, 
        backgroundColor: 'green',
        borderBottomWidth: 1,
        borderBottomColor: '#d7dadd',
        borderTopWidth: 0
    },
    qrcode: {
        flex: 0.1,
        marginTop: 30,
        width: 50,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#d7dadd',
        backgroundColor: 'white'
    }
})