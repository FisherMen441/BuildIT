import React, { Component, PropTypes } from "react";
import { Image } from "react-native";

export default class ScaleImage extends Component {
    constructor(props) {
        super(props);
        const radius = this.props.style.borderRadius ? this.props.style.borderRadius : 0;
        this.state = { source: { uri: this.props.uri }, borderRadius: radius};
    }

    componentWillMount() {
        Image.getSize(this.props.uri, (width, height) => {
            if (this.props.style.width && !this.props.style.height) {
                this.setState({
                    width: this.props.style.width,
                    height: height * (this.props.style.width / width)
                });
            } else if (!this.props.style.width && this.props.style.height) {
                this.setState({
                    width: width * (this.props.style.height / height),
                    height: this.props.style.height
                });
            } else {
                this.setState({ width: width, height: height });
            }
        });
    }

    render() {
        return (
            <Image
                source={this.state.source}
                // Maybe need support any # of styles ley
                style={{ height: this.state.height, width: this.state.width, borderRadius: this.state.borderRadius}}
            />
        );
    }
}