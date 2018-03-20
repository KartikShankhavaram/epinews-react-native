import React, {Component} from'react';
import {ImageBackground, Text, View} from 'react-native';
import {Card} from "./Card";

export default class NewsCardView extends Component {
	render() {
		return(
			<Card style={{ height: 200, elevation: 5}}>
				<ImageBackground
					source={{uri: "https://si.wsj.net/public/resources/images/ON-CL576_wholef_G_20180312153223.jpg"}}
					style={{flexGrow:1, height:null, width:null, flex: 1,}}
				>
				<View style={styles.containerStyle}>
					<Text style={styles.titleStyle}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
					</Text>
					<Text style={styles.authorStyle}>
						by Name Surname
					</Text>
				</View>
				</ImageBackground>
			</Card>
		);
	}
}

const styles = {
	titleStyle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#000',
		textAlign: 'left',
	},
	authorStyle: {
		fontSize: 15,
		color: "#333",
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