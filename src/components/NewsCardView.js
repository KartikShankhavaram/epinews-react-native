import React, {Component} from'react';
import {ImageBackground, Text, TouchableNativeFeedback, View} from 'react-native';
import {Card} from "./Card";
import LinearGradient from "react-native-linear-gradient";
import FastImage from "react-native-fast-image";

export default class NewsCardView extends Component {

	renderImage() {
		if(this.props.imgSrc === null) {
			return(
				<LinearGradient colors={['transparent', 'grey']} style={{flex: 1}}>
					<View style={styles.containerStyle}>
						<Text style={styles.titleStyle}>
							{this.props.title}
						</Text>
						<Text style={styles.authorStyle}>
							{this.props.author}
						</Text>
					</View>
				</LinearGradient>
			);
		} else {
			return(
				<FastImage
					source={{uri: this.props.imgSrc}}
					style={[{flexGrow:1, height:null, width:null, flex: 1,}, this.props.imageStyle]}
				>
					<LinearGradient colors={['transparent', 'grey']} style={{flex: 1}}>
						<View style={styles.containerStyle}>
							<Text style={styles.titleStyle}>
								{this.props.title}
							</Text>
							<Text style={styles.authorStyle}>
								{this.props.author}
							</Text>
						</View>
					</LinearGradient>
				</FastImage>
			);
		}
	}

	render() {
		console.log('news card view props', this.props);
		return(
			<TouchableNativeFeedback
				onPress={this.props.onPress}
				background={TouchableNativeFeedback.SelectableBackground()}
			>
				<Card style={{ height: 200, elevation: 5}}>
					{this.renderImage()}
				</Card>
			</TouchableNativeFeedback>
		);
	}
}

const styles = {
	titleStyle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
		textAlign: 'left',
	},
	authorStyle: {
		fontSize: 15,
		color: "white",
		paddingBottom: 10,
		textAlign: 'left',
	},
	containerStyle: {
		justifyContent: 'flex-end',
		flex: 1,
		alignItems: 'flex-start',
		padding: 10
	}
};