import React from 'react';
import { AppRegistry, StyleSheet, Text, View, FlatList, Keyboard, KeyboardAvoidingView, Dimensions } from 'react-native';
import PostBar from './components/PostBar';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      currentY: 0,
      flheight: Dimensions.get('window')['height'] - 70,
      keyboardHeight: 0,
      keyboardOn: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  renderMessages() {
    let finalMsg = [];
    this.state.messages.forEach(msg => {
      finalMsg.push({
        user: msg[0],
        post: msg[1],
        time: msg[2]
      })
    });
    return finalMsg;
  }

  handleScroll(event) {
    this.setState({
      currentY: event.nativeEvent.contentOffset.y,
      flheight: this.state.flheight,
    });
  }

  componentWillUnmount() {
    this.keyboardDidShowListener && this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener && this.keyboardDidHideListener.remove();
  }

  keyboardDidShow = (event) => {
    this.setState({
      keyboardOn: 1,
      flheight: this.state.flheight - event.endCoordinates.height,
      keyboardHeight: event.endCoordinates.height,
    }, () => {
      setTimeout(() => this.refs.FlatList.scrollToOffset({ offset: this.state.currentY + this.state.keyboardHeight, animated: false }), 5)
    });

  }

  keyboardDidHide = () => {
    this.setState({
      keyboardOn: 0,
      flheight: this.state.flheight + this.state.keyboardHeight,
    }, () => {
      this.refs.FlatList.scrollToOffset({ offset: this.state.currentY - this.state.keyboardHeight, animated: false })
    });
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    fetch('http://159.89.181.188/getchatts/', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(result => {
        this.setState({
          messages: result.chatts,
          currentY: this.state.currentY,
          flheight: this.state.flheight,
        });
      })
      .catch(error => console.log("Error: ", error))
  }

  addPost() {
    fetch('http://159.89.181.188/getchatts/', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(result => {
        if (result.chatts.length > this.state.messages.length) {
          let newMsg = this.state.messages;
          for (let i = newMsg.length; i < result.chatts.length; i++)
            newMsg.push(result.chatts[i]);
          this.setState({
            messages: newMsg,
          }, () => setTimeout(() => this.refs.FlatList.scrollToEnd({ animated: true }), 10)
          )
        }
      })
      .catch(error => console.log("Error: ", error))
  }

  render() {
    const flatlist = this.renderMessages();
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <View style={{ height: this.state.flheight }}>
          <FlatList
            ref="FlatList"
            onScroll={this.handleScroll}
            data={flatlist}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>
              <View style={styles.item}>
                <View style={styles.firstLine}>
                  <Text>{item.user} </Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: 'right' }}>{item.time}</Text>
                  </View>
                </View>
                <Text style={{ fontSize: 16 }}>{item.post}</Text>
              </View>
            }
          />
        </View>
        <PostBar addPost={this.addPost.bind(this)} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    borderWidth: 8,
    borderColor: '#fff',
    borderRadius: 30,
    backgroundColor: '#b2d0e4',
  },
  firstLine: {
    flexDirection: 'row',
  },
});

AppRegistry.registerComponent('Chatter', () => App)
