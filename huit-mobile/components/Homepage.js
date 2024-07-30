import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, SafeAreaView, Text, TextInput, Button, Platform, TouchableOpacity, Picker, ActivityIndicator, Image, ScrollView} from "react-native";

import { URL_API } from "../config/config";
import DetectServiceAPI from '../config/detect-service';
import axios from 'axios';

import {Dimensions} from 'react-native';

import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

function Homepage(props) {

    let cameraRef = useRef();
	const windowWidth = Dimensions.get('window').width;
	const windowHeight = Dimensions.get('window').height;

	const [isCam, setIsCam] = useState(true);
	const [typeCam, setTypeCam] = useState(CameraType.back);

    const [hasCameraPermission, setHasCameraPermission] = useState();
	const [photo, setPhoto] = useState();
	const [imgBase, setImgBase] = useState("")
	const [resDetect, setResDetect] = useState(false);
	const [age, setAge] = useState("");
	const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
		if ( isCam ) {
			(async () => {
				const cameraPermission = await Camera.requestCameraPermissionsAsync();
	
				setHasCameraPermission(cameraPermission.status === "granted");
			})();
		}
    }, [isCam]);

	let takePhoto = async () => {
		const options = { quality: 0.5, base64: true, skipProcessing: true };
		await cameraRef.current.takePictureAsync().then((photo) => {
			setPhoto(photo);
		})
	}

	const requestDetectImage = async () => {
		setIsLoading(true);
		const base64 = await FileSystem.readAsStringAsync(photo.uri, { encoding: 'base64' });
		try{

			const data = await DetectServiceAPI.detectImage(base64, windowWidth, windowHeight);
			setIsLoading(false);
			setResDetect(true);
			if(data.status == 200){
				setAge(data.data.age);
				setImgBase(`data:image/jpeg;base64,${data.data.img}`)
			}
		}catch(err){
			console.log("ErrorHomePage:", err)
		}
	}

	const again = () => {
		setPhoto(undefined)
		setResDetect(false);
		setImgBase(undefined)
	}

	if ( photo ) {

		let savePhoto = async () => {
			await MediaLibrary.saveToLibraryAsync(photo.uri);
		};
		let img;
		if (imgBase){
			img = <Image style={{height: '95%', width: '100%'}}  resizeMode="cover" source={{uri: imgBase}} />
		}else{
			img = <Image style={{height: '95%', width: '100%'}} source={{uri: photo.uri}} />
		}

		return (
			<SafeAreaView style={styles.containerTmp}>
				{img}
				{isLoading && <ActivityIndicator style={{position: 'absolute'}} size={60} color="#FF5A80" />}
				{!resDetect &&<View style={styles.btnAfter}>
					<TouchableOpacity style={styles.btnDetect} onPress={() => requestDetectImage()}>
						<Text>PREDICT</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.btnDiscard} onPress={again}>
						<Text>DISCARD</Text>
					</TouchableOpacity>
				</View>}
				{resDetect && <View style={styles.btnRes}>
					<Text>AGE PREDICT: {age}</Text>	
					<TouchableOpacity style={styles.btnDiscard} onPress={again}>
						<Text>AGAIN</Text>
					</TouchableOpacity>
				</View>}
			</SafeAreaView>
		)
	}
	const toggleTypeCam = () => {
		setTypeCam(current => (current === CameraType.back ? CameraType.front : CameraType.back));
	}
	const getCam = () => {
		setIsCam(true)
	}

	const back = () => {
		// if(isRecording) {
		// 	stopRecording();
		// 	setVideo(undefined)
		// }
		setIsCam(false)
	}

	

		

	const renderCamera = () => {
		return <Camera style={styles.container} ref={cameraRef} type={typeCam}>
				<View style={styles.btnVideo}>
					{/* <TouchableOpacity onPress={isRecording ? stopRecording : recordVideo} style={styles.btnRecord}>
						<Text>{isRecording ? "Stop Recording" : "Record Video"}</Text>
					</TouchableOpacity> */}
					<TouchableOpacity onPress={takePhoto} style={styles.btnTakePhoto}>
						<Text>Take photo</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={toggleTypeCam} style={styles.btnBack}>
						<Text>Flip</Text>
					</TouchableOpacity>
					{/* <TouchableOpacity onPress={() => back()} style={styles.btnBack}>
						<Text>BACK</Text>
					</TouchableOpacity> */}
				</View>
			</Camera>
	}
	
	return (
		<SafeAreaView style={styles.container}>
			{renderCamera()}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:"#3b8fd9"
	},
	group:{
		marginTop:10,
		alignContent:"center"
	},
	mssv: {
		color: "#626262",
		fontSize: 18,
		marginTop: 22,
		marginLeft: 10,
		
	},
	eventText:{
		color: "#FFFFFF",
		fontSize: 18,
		marginTop: 10,
		marginLeft: 10,
	},
	rect2: {
		borderRadius: 10,
		marginStart:5,
		marginEnd:5,
		height:30,
	},
	userNameContainer: {
		backgroundColor:"white",
		borderRadius: 10,
		height: 35,
		justifyContent: 'center',
		marginHorizontal:10,
		marginVertical:10,
		shadowOffset: {
			width:0,
			height: 2,
	},
	elevation: 12,
		shadowRadius: 5,
	},
	passwordContainer:{
		backgroundColor:"white",
		borderRadius: 10,
		height: 35,
		justifyContent: 'center',
		marginHorizontal:10,
		marginVertical:10,
		shadowOffset: {
			width:0,
			height: 2,
		},
		elevation: 12,
		shadowRadius: 5,
	},
	time: {
		color: "#FFFFFF",
		fontSize: 18,
		marginTop: 9,
		marginLeft: 10,
	},
	rect4: {
		height: 40,
		backgroundColor: "#FF7918",
		borderRadius: 10,
		marginTop: 30,
		marginHorizontal:50
	},
	xacNhanText: {
		color: "rgba(255,255,255,1)",
		fontSize: 18,
		marginVertical: 10,
		textAlign:"center"
	
	},
	icon:{
		fontSize:20,
		color:"#C9C0C3",
		direction:"rtl",
		marginHorizontal:15
	},
	btnStartTime: {
		marginTop: 10,
		width: 200,
		backgroundColor: 'white',
		height: 40,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: '25%',
	},
	btnEndTime:{
		marginTop: 20,
		width: 200,
		backgroundColor: 'white',
		height: 40,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: '25%',
	},
	btnPhoto: {
		marginTop: 10,
		width: 140,
		backgroundColor: '#14FF8E',
		height: 50,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: 'center',
		marginLeft: '33%'
	},
	btnVideo: {
		width: 140,
		backgroundColor: '#DAD9CC',
		height: 50,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: 'center',
		marginTop: 20,
		marginLeft: '33%'
	},
	textBtn: {
		fontSize: 20,
		fontWeight: '400',
		lineHeight: 25
	},
	dropdown: {
		color: '#FFFFFF',
		fontSize: 18
	},
	box: {
		marginTop: 10,
		width : '90%',
		marginLeft: '5%',
		borderColor: '#FFFFFF',
		marginBottom: 40
	},
	containerTmp: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%'
    },
	btnGetCam: {
		backgroundColor: '#FF5A80',
		width: '30%',
		padding: 10,
		alignSelf:'center',
		borderRadius: 10
	},	
    buttonContainer: {
		backgroundColor: "gray",
		alignSelf: "flex-end"
	},
    video: {
		flex: 1,
		alignSelf: "stretch"
    },
	btnVideo: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: '170%',
		justifyContent: 'space-between'
	},
	btnRecord: {
		backgroundColor: '#FF5A80',
		padding: 15,
		borderRadius: 15
	}, 
	btnTakePhoto: {
		marginLeft: 10,
		marginRight: 10,
		backgroundColor: '#FF5A80',
		padding: 15,
		borderRadius: 15
	},
	btnBack: {
		backgroundColor: 'gray',
		padding: 15,
		borderRadius: 15
	},
	btnAfter: {
		display: 'flex',
		flexDirection: 'row',
		width: '90%',
		justifyContent: 'space-around',
		marginBottom: '5%'
	},
	btnRes: {
		marginTop: '2%',
		display: 'flex',
		flexDirection: 'row',
		width: '90%',
		justifyContent: 'space-around',
		marginBottom: '5%'
	},
	btnSave: {
		backgroundColor: '#5db8f0',
		padding: 10,
		borderRadius: 10
	},
	btnDetect: {
		backgroundColor: '#FF5A80',
		padding: 10,
		borderRadius: 10
	},
	btnDiscard: {
		backgroundColor: '#a1abad',
		padding: 10,
		borderRadius: 10
	}
});

export default Homepage;
