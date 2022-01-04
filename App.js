import React from 'react';
import {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import RNLocation from 'react-native-location';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
const App = () => {
  useEffect(() => {
    const requestPermissions = async () => {
      const backgroundgranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        {
          title: 'Background Location Permission',
          message:
            'We need access to your location ' +
            'so you can get live quality updates.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (backgroundgranted === PermissionsAndroid.RESULTS.GRANTED) {
        //do your thing!
        console.log('Background Location Permission granted');

        ReactNativeForegroundService.add_task(
          () =>
            RNLocation.requestPermission({
              ios: 'whenInUse',
              android: {
                detail: 'coarse',
              },
            }).then(granted => {
              if (granted) {
                this.locationSubscription =
                  RNLocation.subscribeToLocationUpdates(locations => {
                    console.log(locations);
                    /* Example location returned
        {
          speed: -1,
          longitude: -0.1337,
          latitude: 51.50998,
          accuracy: 5,
          heading: -1,
          altitude: 0,
          altitudeAccuracy: -1
          floor: 0
          timestamp: 1446007304457.029,
          fromMockProvider: false
        }
        */
                  });
              }
            }),

          {
            delay: 100,
            onLoop: true,
            taskId: 'taskid',
            onError: e => console.log(`Error logging:`, e),
          },
        );
      }
    };
    requestPermissions();
  }, []);
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text> hello there</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
