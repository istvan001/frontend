import react from 'react';
import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, Image } from 'react-native';
import{AirbnbRating} from 'react-native-ratings'

export default class FetchExample extends Component {

  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      dataSource:[],
      rating:[],
      szam:0
      }
  
  
}

ratingCompleted(rating) {
  console.log("Rating is: " + rating)
}
  componentDidMount(){
     fetch('https://s1.siralycore.hu:8082/etterem')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){
        });
      })
      .catch((error) =>{
        console.error(error);
      });
      fetch('https://s1.siralycore.hu:8082/etterem2')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          rating: responseJson,
        }, function(){
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render(){
    if(this.state.isLoading){
      return(
        <View style={styles.loading_content}>
          <Text style={styles.loading}>Adatok betöltése</Text><ActivityIndicator color="white"/>
        </View>
      )
    }
    
    return(
      <View style={{flex: 1, alignItems: "center"}}>
        <FlatList
          data={this.state.dataSource,(this.state.rating)}
          renderItem={({item}) => 
          <View style={styles.card}>
            <View style={styles.center}>
              <Image style={styles.image} source={require('./kepek/'+item.kep)}/>
            </View>
            <Text style={styles.title}>{item.nev}</Text>
            <Text style={styles.label}>Cím: {item.lakcim}</Text>
            <Text style={styles.label}>Nyitvatartás: {"\n"}{item.nyitas}</Text>
            <Text style={styles.label}>Telefon: {item.telefon}</Text>
            <Text style={styles.label}>Értékelés:</Text>

            <AirbnbRating
            count={5}
            reviews={[1,2,3,4,5]}
            defaultRating={Math.floor(item.atlag)}
            size={20}
            isDisabled={false}
            


            />
            



          
            

          
            <Text style={styles.label}> {item.atlag}/5</Text>
          </View>
          }
          keyExtractor={({id}, index) => id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading_content:{
    alignItems: "center",
    padding: 5,
    backgroundColor: "blue",
    height: 40,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  loading:{
    color: "white"
  },
  center:{
    alignItems: "center",
    justifyContent: "center"
  },
  title:{
    textAlign: "justify",
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
    padding: 5
  },
  card: {
    padding: 10,
    margin: 10,
    marginBottom: 10,
    width: 300,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 1.22,
    elevation: 1,
  },
  label:{
    padding: 5
  },
  image:{
    width: 200,
    height: 200,
    marginBottom: 10
  },
  image2:{
    width: 50,
    height: 50
  }
});