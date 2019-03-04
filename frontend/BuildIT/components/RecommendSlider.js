import React from 'react';
import { StyleSheet, View , Image, TouchableHighlight, Text} from 'react-native';
import ImageSlider from 'react-native-image-slider';

export default class RecommendSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageList: props.imageList
        }
    }

    render() {
        const images = [
            'https://www.ikea.com/gb/en/images/visual-navigation/ikea-ikea-outdoor-seating-chairs-benches-and-loungers-__1364425482466-s5.jpg',
            'https://www.ikea.com/de/de/images/products/ekenaset-sessel-grau__0620563_PE689666_S4.JPG',
            'https://www.ikea.com/PIAimages/0516608_PE640444_S5.JPG'
        ];
        return (
            <View> 
                <ImageSlider
                    loopBothSides
                    autoPlayWithInterval={3000}
                    images={images}
                    style={{padding: 100}}
                    customSlide={({ index, item, style, width }) => (
                        // It's important to put style here because it's got offset inside
                        <View key={index} style={[style, styles.customSlide]}>
                            <Image source={{ uri: item }} style={styles.customImage} />
                        </View>
                    )}
                    customButtons={(position, move) => (
                        <View style={styles.buttons}>
                            {images.map((image, index) => {
                                return (
                                    <TouchableHighlight
                                        key={index}
                                        underlayColor="#ccc"
                                        onPress={() => move(index)}
                                        style={styles.button}
                                    >
                                        <Text style={position === index && styles.buttonSelected}>
                                            {index + 1}
                                        </Text>
                                    </TouchableHighlight>
                                );
                            })}
                        </View>
                    )}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonSelected: {},
    customSlide: {
    },
    customImage: {
        height: 50,
        width: 50
    }
});