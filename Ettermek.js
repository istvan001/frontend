import React, { Component,useState} from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, Image,TouchableOpacity } from 'react-native';
import{Rating,AirbnbRating} from 'react-native-ratings';
import ReactStars from 'react-stars';

export default class FetchExample extends Component {

  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      dataSource:[],
      rating:[],
      szam1:1,
      aktid:1
      }
  
  
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


 felvitel= (szam)=>{
  alert("Megnyomva")
  let bemenet={
    bevitel1:szam,
    bevitel2:this.state.aktid
  }

  fetch('https://s1.siralycore.hu:8082/ert_felvi' ,{
    method: "POST",
    body: JSON.stringify(bemenet),
    headers: {"Content-type": "application/json; charset=UTF-8"}
    } )
    .then((response) => response.text())
    .then((szoveg) => {

      alert(szoveg)
    })
    .catch((error) =>{
      console.error(error);
    });


    




    

       
  }

  nov = async(szam)=>{
    fetch('https://s1.siralycore.hu:8082/etterem_abc_rend' )
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
  csok = async(szam)=>{
    fetch('https://s1.siralycore.hu:8082/etterem_abc_csok' )
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
  
  kattintas=(szam)=>
  {
    alert(szam)
    this.felvitel(szam)
  }
 

 render(){
   if(this.state.isLoading){
     return(
       <View style={styles.loading_content}>
         <Text style={styles.loading}>Adatok betöltése</Text><ActivityIndicator color="white"/>
       </View>
     )
   }
   
const ratingChanged = (ratings) => {
  this.setState({aktid:ratings})
  
}
   
   return(
     <View style={{flex: 1, alignItems: "center"}}>

<View style={{marginTop:10,marginLeft:20,flexDirection:"row"}}>
          
          <TouchableOpacity
              style={{borderWidth:1,borderRadius:10,width:150,height:30,margin:5}}
              onPress={async(szam)=>this.nov()}
              >
            <Text style={{textAlign:"center",fontSize:20}}>Rendezés (ABC)↑</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{borderWidth:1,borderRadius:10,width:150,height:30,margin:5}}
              onPress={async(szam)=>this.csok()}
              >
            <Text style={{textAlign:"center",fontSize:20}}>Rendezés (ABC)↓</Text>
            </TouchableOpacity>
            
            
          
            
  
            
          </View>



       <FlatList
         data={this.state.dataSource,(this.state.rating)}
         renderItem={({item}) => 
         <View style={styles.card}>
           <View style={styles.center}>
             <Image style={styles.image} source={{uri: 'https://s1.siralycore.hu:8082/kepek/'+item.kep}}/>
           </View>
           <Text style={styles.title}>{item.nev}</Text>
           <Text style={styles.label}>Cím: {item.lakcim}</Text>
           <Text style={styles.label}>Nyitvatartás: {"\n"}{item.nyitas}</Text>
           <Text style={styles.label}>Telefon: {item.telefon}</Text>
           <Text style={styles.label1}>Értékelés:</Text>

           <AirbnbRating
           count={5}
           reviews={["1/5","2/5","3/5","4/5","5/5"]}
           reviewColor="black"
           defaultRating={Math.floor(item.atlag)}
           size={20}
           isDisabled={true}
           


           />

<Text style={styles.label1}>Értékeld:</Text>
          <TouchableOpacity
onPress={ ()=>this.kattintas(item.id)}

style={{alignItems:"center"}}
>

<ReactStars
  count={5}
  half={false}
  onChange={ratingChanged}
  size={32}
  color2={'#ffd700'} />
  
 
  </TouchableOpacity>

           


           
           



         
           

         
           
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
 },
 label1:{
  padding: 5,
  fontSize:20

 }
});