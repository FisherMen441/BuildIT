import React from 'react';
import { SearchBar, Icon } from 'react-native-elements';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            naviFunc: props.naviFunc,
            naviScreen: props.naviScreen,
            screen: props.screen
        }
    }
    componentDidMount() {
        if (this.state.screen == 'Search')
            this.searchbar.focus();
    }
    render() {
        const icon = <Icon
            name={this.state.screen == 'Search' ? 'arrow-left' : 'magnify'}
            type='material-community'
            onPress={this.state.screen == 'Search' ? () => {
                this.state.naviFunc(this.state.naviScreen);
            } : () => {}}
        />
        return (
            <View style={styles.container}>
                <SearchBar
                    ref={ref => this.searchbar = ref}
                    inputContainerStyle={styles.inputContainer}
                    containerStyle={styles.barContainer}
                    placeholder="Find Furnitures...."
                    onChangeText={(text) => this.setState({ search: text })}
                    value={this.state.search}
                    onFocus={() => {
                        if (this.state.screen == 'Home') {
                            this.state.naviFunc(this.state.naviScreen);
                        }
                    }
                    }
                    onSubmitEditing={() => { console.log('HA') }}
                    returnKeyType={"search"}
                    searchIcon={icon}
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
        backgroundColor: 'white',
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