import React from 'react';
import { FlatList, ActivityIndicator, Text, View } from 'react-native';

export default class FetchExample extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isLoading: true }
    }

    componentDidMount() {
        // return fetch('https://facebook.github.io/react-native/movies.json')
        return fetch('http://services.orbitremit.io/partner/v1/payments', {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': 'Bearer T1JCSVRES0pMRzA4U0Q4VUtESUw6R1NHUzlHU0RHUzU3NTY=',
                'apikey': 'rhnLKuE8Im1Qlc8uFA1owVba7YxFAEhe',
            },
            // body: JSON.stringify({
            //   firstParam: 'yourValue',
            //   secondParam: 'yourOtherValue',
            // }),
        })
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSource: responseJson.data,
                }, function () {
                    // console.error(responseJson.data);
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }



    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 50 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <View style={{ flex: 1, paddingTop: 50 }}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) => <Text>{item.id}, {item.type}</Text>}
                    keyExtractor={({ id }, index) => id}
                />
            </View>
        );
    }
}
