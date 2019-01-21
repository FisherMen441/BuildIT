import React from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class PostBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
        };
    }

    postPressed() {
        fetch('http://159.89.181.188/addchatt/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: "testuser5",
                message: this.state.text,
            })
        })
        .then(response => {
            if (!response.stateText == 'OK')
                throw Error("Not 200 status code");
            return;
        })
        .then(()=>{
            this.props.addPost()
            this.refs.PostText.clear();
        })
        .catch(error => console.log('Error: ', error))

    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.textInput}
                    ref="PostText"
                    editable={true}
                    multiline={true}
                    value={this.state.text}
                    onChangeText={(text) => this.setState({ text: text }) }
                    placeholder="Post some news...."
                />
                <View style={styles.postButton}>
                    <Button
                        color="#841584"
                        title="Post"
                        onPress={this.postPressed.bind(this)}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: '#d1e5e1',
    },
    textInput: {
        flex: 0.8,
        height: 40,
        backgroundColor: '#fff',
        paddingLeft: 10,
        borderWidth: 2,
        borderColor: '#d1e5e1',
    },
    postButton: {
        paddingLeft: 10,
        flex: 0.2,
        justifyContent: 'center',
    }
});

AppRegistry.registerComponent('Chatter', () => PostBar);
