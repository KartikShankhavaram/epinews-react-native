import React from 'react';
import {Text, View} from "react-native";

const HeaderTitle = (props) => {
	return(
		<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
			<Text style={{fontSize: 20, fontWeight: 'bold'}}>
				{props.title}
			</Text>
		</View>
	);
};

export default HeaderTitle;