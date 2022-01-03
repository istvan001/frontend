import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, TouchableOpacity } from 'react-native';

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      kivalaszt:1,
      dataSource:[],
      dataSource2:[]
      }  

  }

  componentDidMount(){
    return fetch('https://s1.siralycore.hu:8082/etterem')
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
  }

  kivalaszt = async(szam)=>{
    this.setState({kivalaszt:szam})
    let bemenet={
      bevitel2:szam
    }
    return fetch('https://s1.siralycore.hu:8082/asztalok', {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource2: responseJson,
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
      <View style={{flex: 1, paddingTop:50,backgroundColor:"#000033"}}>
{/*---------------------------------------------------------------éttermek*/}
       
      <View>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 

          <View style={{alignItems:"center",marginTop:10}}>
            <TouchableOpacity
            style={{borderWidth:1,borderRadius:10,width:280,height:35,margin:5,backgroundColor:"grey"}}
            onPress={async ()=>this.kivalaszt(item.id)}
            >
          <Text style={{textAlign:"center",fontSize:20,color:"white"}}>{item.nev} </Text>
          </TouchableOpacity>
          </View>
        
        }
          keyExtractor={({id}, index) => id}
        />
      </View>

{/*----------------------------------------------------------asztalok */}  
          <View style={{backgroundColor:"#000033"}}>
            <FlatList 
            maxHeight={100}
            marginBotton={50}
            data={this.state.dataSource2}
            renderItem={({item}) =>
      
              <View style={{alignItems:"center",marginTop:10}}>
                <Text style={{textAlign:"center",fontSize:20,color:"white"}}>Asztal neve: {item.asztal_megnevezes}</Text>
                <Text style={{textAlign:"center",fontSize:20,color:"white"}}>Fő szám: {item.fo}</Text>
                {(item.foglalt === 0) && <Text style={{textAlign:"center",fontSize:20,color:"green"}}>Még nincs lefoglalva.</Text>}
                {(item.foglalt === 1) && <Text style={{textAlign:"center",fontSize:20,color:"red"}}>Foglalt.</Text>}
              </View>
    
            }
            keyExtractor={({asztalok_id}, index) => asztalok_id}
            />
          </View>
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
  }
});