import React, { useState } from 'react';
import {  View, Dimensions, StyleSheet, TouchableOpacity, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CGPACalculator = () => {
  const [currentSem, setSem] = useState('');
  const [currentCGPA, setCurrentCGPA] = useState('');
  const [desiredCGPA, setDesiredCGPA] = useState('');
  const [requiredCGPA, setRequiredCGPA] = useState('');

  const ResetVal = () => {
    setSem('');
    setCurrentCGPA('');
    setDesiredCGPA('');
    setRequiredCGPA('');
  }
  const calculateCGPA = () => {
    const semVal = parseInt(currentSem);
    const current = parseFloat(currentCGPA);
    const desired = parseFloat(desiredCGPA);
    var semsub = {
      1:{"Maths":[4,4],"Chemistry":[4,4],"C program":[3,4],"basic electronics":[3,4],"mechanical engineering":[3,4],"chemistry lab":[1,4],"c program lab":[1,4],"english":[1,4]},
      2:{"Maths":[4,4],"Physics":[4,4],"Electrical engineering":[3,4],"civil":[3,4],"engineering graphics":[3,4],"physics lab":[1,4],"electrical lab":[1,4],"english":[1,4]},
      3:{"DSA":[4,4],"Maths":[3,4],"ADE":[3,4],"CO":[3,4],"SE":[3,4],"DMS":[3,4],"ADE Lab":[2,4],"DS Lab":[2,4],"CPC":[1,4]},
      4:{"DAA":[4,4],"Maths":[3,4],"OS":[3,4],"MES":[3,4],"OOC":[3,4],"DC":[3,4],"DAA Lab":[2,4],"MES Lab":[2,4],"Kannada":[1,4]},
      5:{"CNS":[4,4],"DBMS":[4,4]," M&E":[3,4],"ATC":[3,4],"ADP":[3,4],"UNIX":[3,4],"CNS lab":[2,4],"DBMS Lab":[2,4],"EVS":[1,4]},
      6:{"FS":[4,4],"ST":[4,4],"WTA":[4,4],"PROF ELECT":[3,4],"OPEN ELECT":[3,4],"ST lab":[2,4],"FS lab":[2,4],"MAD lab":[2,4]},
      7:{"AIML":[4,4],"BDA":[4,4],"PROF ELECT1":[3,4],"PROF ELECT2":[3,4],"OPEN ELECT":[3,4],"AIML lab":[2,4],"PROJECT":[1,4]},
      8:{"PROJECT":[8,4],"PROF ELECT":[3,4],"IOT":[3,4],"INTERNSHIP":[3,4],"TECH SEMINAR":[1,4]  },
    }

    if (isNaN(semVal) || isNaN(current) || isNaN(desired)) {
      Alert.alert('Invalid input', 'Please enter valid details.');
      return;
    }
    
    if((semVal<1 && semVal>=8)|| (current<0 && current>10) ||(desired<0 && desired>10)){
      Alert.alert('Invalid Semester, Please enter valid Semester');
      return;
    }
    let credits=0,nextCredits=0;
    const dict={1:20,2:20,3:24,4:24,5:25,6:24,7:20,8:18};
    for (var i=1;i<=semVal;i++){
      credits+=dict[i];
    }
    nextCredits=credits+dict[semVal+1];
    

    if (desired > 10 || desired < 0) {
      Alert.alert('Invalid input', 'Desired CGPA should be between 0 and 100.');
      return;
    }
    const required = (nextCredits*desired)-(current*credits);
    var requiredCGPA = required/dict[semVal+1];

    var flag=1;
    var newcal=0;
    var subs=semsub[semVal+1];
    var marks = Object.values(subs);
    var subjectsfull = Object.keys(subs);
    var updatedMarks = [...marks];
    while (flag==1){
      for (var j=0;j<marks.length;j++){
        newcal += updatedMarks[j][0] * updatedMarks[j][1];
        updatedMarks[j][1] += 1;
        if (updatedMarks[j][1]>10){
          updatedMarks[j][1]=10;
        }
        if (Math.floor(newcal/nextCredits)==Math.floor(requiredCGPA)){
          flag=0;
          break;
        }
      }
    }

    if (requiredCGPA>10){
      requiredCGPA=10;
    }
    var sen = requiredCGPA.toFixed(2)+'\n\n'+"The average score in each subjects should be as follows:\n";
    for (var j=0;j<marks.length;j++){
      sen+=subjectsfull[j]+": "+(updatedMarks[j][1]-1)*10+" - "+updatedMarks[j][1]*10+"\n";
    }
    if (required < 0 ) {
      Alert.alert('Calculation error', 'It is not possible to achieve the desired CGPA with the current CGPA and credits.');
    } else {
      setRequiredCGPA(sen);
      Alert.alert('Predicted SGPA','You have to get '+requiredCGPA.toFixed(2)+" SGPA in your next semester\n"+"")
    }
  };
  const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <LinearGradient
          colors={['#FFAA00', '#FF5500']}
          style={styles.gradient}
        />
        <Text style={{fontSize:50, marginTop:-200}}> CGPA HELPER</Text>
        <Text style={{fontSize:20, marginTop: 20}}> Current Semester:</Text>
        <TextInput 
          style={styles.inp}
          value={currentSem}
          onChangeText={text => setSem(text)}
          keyboardType='numeric'
        />
        <Text style={{fontSize:20, marginTop: 20}}>Current CGPA:</Text>
        <TextInput
          style={styles.inp}
          value={currentCGPA}
          onChangeText={text => setCurrentCGPA(text)}
          keyboardType="numeric"
        />
        <Text style={{fontSize: 20, marginTop: 20}}>Desired CGPA:</Text>
        <TextInput
          style={styles.inp}
          value={desiredCGPA}
          onChangeText={text => setDesiredCGPA(text)}
          keyboardType="numeric"
        />
        <AppButton title="Calculate" onPress={calculateCGPA}/>
        <AppButton title="Reset" onPress={ResetVal}/>
        
      
        {requiredCGPA !== '' && (
          <Text style={styles.resultbox}>You need to achieve a SGPA of {requiredCGPA}</Text>
        )}
    </View>
    </ScrollView>
  );
  
};
const screenWidth = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
      height:screenheight+330,
    },
    textcont:{
      fontSize:30,
    },
    inp:{
      marginTop: 10,
      backgroundColor: '#666666',
      borderRadius: 20,
      padding: 8,
      paddingLeft: 15,
      height: 40,
      color: 'white',
      width: 200,
    },
    appButtonContainer:{
      marginTop: 20,
      elevation: 8,
      width: 300,
      backgroundColor: "#009688",
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 12,
    },
    appButtonText:{
      fontSize: 20,
      alignSelf: 'center'
    },
    gradient: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    resultbox:{
      width:screenWidth-80,
      top:40,
      fontSize:18,
      backgroundColor: "#e8d5be",
      borderRadius: 30,
      padding: 15,
      alignSelf: "center",
    }
  });
export default CGPACalculator;
