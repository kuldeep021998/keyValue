import React, {useState} from 'react';
import {
  View,
  TextInput,
  Dimensions,
  Button,
  TouchableOpacity,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {height, width} = Dimensions.get('window');

export default function App() {
  const [amount, setAmount] = useState('');
  const [key, setKey] = useState('');
  const [result, setResult] = useState('');

  async function save(key, amount) {
    await AsyncStorage.setItem(key, amount);
  }

  async function getValue(key) {
    const result = await AsyncStorage.getItem(key);
    if (result) {
      setResult(result);
    }
  }

  return (
    <View
      style={{
        margin: height * 0.01,
        justifyContent: 'center',
        display: 'flex',
        alignitem: 'center',
      }}>
      <View style={{marginTop: 50}}>
        <Text>Enter Key</Text>
      </View>
      <View
        style={{
          margin: 5,
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 10,
        }}>
        <TextInput
          onChangeText={text => setKey(text)}
          value={key}
          style={{
            padding: 10,
            borderColor: 'black',
          }}
        />
      </View>
      <View style={{marginTop: 10}}>
        <Text>Enter Amount</Text>
      </View>
      <View
        style={{
          margin: 5,
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 10,
        }}>
        <TextInput
          onChangeText={text => setAmount(text)}
          style={{padding: 10, borderColor: 'black'}}
          value={amount}
        />
      </View>
      <View style={{margin: 5}}>
        <TouchableOpacity>
          <Button
            onPress={() => {
              save(key, amount);
              setAmount('');
              setKey('');
            }}
            title="Submit"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            style={{borderRadius: 10}}
          />
        </TouchableOpacity>
      </View>

      <View style={{marginTop: 50}}>
        <Text>Enter Key</Text>
      </View>
      <View
        style={{
          margin: 5,
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 10,
          marginTop: 20,
        }}>
        <TextInput
          onSubmitEditing={event => {
            getValue(event.nativeEvent.text);
          }}
          style={{padding: 10, borderColor: 'black'}}
        />
      </View>
      <View>
        <Text style={{textAlign: 'center'}}>{result}</Text>
      </View>
    </View>
  );
}
