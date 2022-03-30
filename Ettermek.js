import React, { Component} from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, Image,TouchableOpacity,TextInput} from 'react-native';
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';

export default class FetchExample extends Component {

    constructor(props){
      super(props);
      this.state ={
        isLoading: true,
        dataSource:[],
        dataSource2:[],
        rating:[],
        szam1:1,
        aktid:1,
        aktid2:0,
        iscollapsed:true,
        collapsed:true,
        megnyomva:[],
        megnyomva2:[],
        megnyom:[],
        nev: '',
        velemeny:"",
        modalVisible: false,
        currentTab: 1,
        starCount: 3,
        ert_szam:0
        
        }
        
    
    
  }
    frissit=()=>{
      fetch('http://localhost:8080/etterem2')
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

  componentDidMount(){
    /*fetch('http://localhost:8080/etterem')
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
     });*/
     this.frissit();


     let m=this.state.megnyomva;
        for (let elem of this.state.dataSource)
            m[elem.id]=0
        this.setState({megnyomva:m})
    }

    felvitel= (ratings,hanyadik)=>{
      alert("Megnyomva")
      let bemenet={
        bevitel1:hanyadik,
        bevitel2:ratings
      }
    
      fetch('http://localhost:8080/ert_felvi' ,{
        method: "POST",
        body: JSON.stringify(bemenet),
        headers: {"Content-type": "application/json; charset=UTF-8"}
        } )
        .then((response) => response.text())
        .then((szoveg) => {
          this.frissit()
    
          alert(szoveg)

        })
        .catch((error) =>{
          console.error(error);
        });       
      }
  
  
  velemeny =(szam)=>
  
  {
    
    
    let bemenet={
      bevitel1:szam
      
    }
  
    fetch('http://localhost:8080/velemenyek' ,{
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      } )
      .then((response) => response.json())
      .then((adat) => {
       
  
        
        this.setState({
          isLoading: false,
          dataSource2: adat,
        }, function(){          
      });
      })
      .catch((error) =>{
        console.error(error);
      });       
    }
    
    
      vfelvitel=async (szam)=>{
        alert(szam)
         let bemenet={
          bevitel1: szam,
          bevitel2: this.state.nev,
          bevitel3: this.state.velemeny
        }
     
        fetch('http://localhost:8080/vfelvi', {
          method: "POST",
          body: JSON.stringify(bemenet),
          headers: {"Content-type": "application/json; charset=UTF-8"}
          } )
          .then((response) => response.text())
          .then((szoveg) => {
    
            //alert(szoveg)
            this.setState({nev:""})
            this.setState({velemeny:""})
    
            this.frissit()
            
            
          })
          .catch((error) =>{
            console.error(error);
          });
    
    
    
      }
    
      nov = async()=>{
        return fetch('http://localhost:8080/etterem_abc_rend' )
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
        return fetch('http://localhost:8080/etterem_abc_csok' )
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
    
      ert = async(szam)=>{
        return fetch('http://localhost:8080/ert_rend' )
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
      
        
        let m=this.state.megnyomva
  m[szam]=!m[szam]
  this.setState({megnyomva:m})
      }
    
      megnyomas=(sorszam)=>{
        //alert(sorszam)
        let m=this.state.megnyomva
        m[sorszam]=!m[sorszam]
        this.setState({megnyomva:m})
    
    
        
      }
      megnyomas2=(sorszam)=>{
        //alert(sorszam)
        let m=this.state.megnyomva2
        m[sorszam]=!m[sorszam]
        this.setState({megnyomva2:m})
      }
      alap=()=>{
        this.frissit();
      }
      like =(szam)=>
  
      {
        
        
        let bemenet={
          bevitel1:szam
          
        }
      
        fetch('http://localhost:8080/like' ,{
          method: "POST",
          body: JSON.stringify(bemenet),
          headers: {"Content-type": "application/json; charset=UTF-8"}
          } )
          .then((response) => response.json())
          .then((adat) => {
            
           
      
            this.frissit()
           
          })
          .catch((error) =>{
            console.error(error);
          });       
        }
  
        dislike =(szam)=>
    
        {
          
          
          let bemenet={
            bevitel1:szam
            
          }
        
          fetch('http://localhost:8080/dislike' ,{
            method: "POST",
            body: JSON.stringify(bemenet),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            } )
            .then((response) => response.json())
            .then((adat) => {
              
             
        
              this.frissit()
             
            })
            .catch((error) =>{
              console.error(error);
            });       
          }

     

      onTabClick = (currentTab) => {
        this.setState({
          currentTab: currentTab,
        });
      };


      onStarRatingPress(ratings,hanyadik) {
        
        alert(ratings)
        alert(hanyadik)
       // this.setState({starCount:ratings})
        let m=this.state.megnyomva
        m[hanyadik]=ratings
        this.setState({megnyomva:m})
        this.felvitel(ratings,hanyadik)

      }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.loading_content}>
          <Text style={styles.loading}>Adatok betöltése</Text><ActivityIndicator color="white"/>
        </View>
      )
    }

    
   


    
    return (
      <View >
      
        <Text style={{fontSize:64,fontStyle:"italic",marginBottom:10}}>Éttermek</Text>
      
      <Collapse>
      
          <CollapseHeader style={{borderWidth:1,borderRadius:10,width:200,height:40,margin:10,backgroundColor:"white"}}>
            
            
            <Text style={{textAlign:"center",fontSize:25}}>Rendezés</Text>
          
          </CollapseHeader>
         
          <CollapseBody>
            <View style={{marginLeft:10 }}>
          <TouchableOpacity
              style={{borderWidth:1,borderRadius:10,width:170,height:30,margin:5,marginLeft:10,backgroundColor:"white"}}
              onPress={async(szam)=>this.nov()}
              >
            <Text style={{textAlign:"center",fontSize:20}}>Rendezés (ABC)↑</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{borderWidth:1,borderRadius:10,width:170,height:30,margin:5,marginLeft:10,backgroundColor:"white"}}
              onPress={async(szam)=>this.csok()}
              >
            <Text style={{textAlign:"center",fontSize:20}}>Rendezés (ABC)↓</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{borderWidth:1,borderRadius:10,width:170,height:30,margin:5,marginLeft:10,backgroundColor:"white"}}
              onPress={async(szam)=>this.ert()}
              >
            <Text style={{textAlign:"center",fontSize:20}}>Értékelés</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{borderWidth:1,borderRadius:10,width:170,height:30,margin:5,marginBottom:10,marginLeft:10,backgroundColor:"white"}}
              onPress={async(szam)=>this.alap()}
              >
            <Text style={{textAlign:"center",fontSize:20}}>Alap rendezés</Text>
            </TouchableOpacity>
            </View>
            </CollapseBody>

            </Collapse>






      <View style={{alignItems:"center",justifyContent:'center'}}>
      
        <FlatList
        
        
        
        data={this.state.dataSource}
        
        renderItem={({item}) =>
         
        <View style={styles.card}>
          <View style={styles.center}>
            <Image  style={{height:350,width:800,borderWidth:1,borderRadius:10,marginRight:"auto",resizeMode : 'cover',marginBottom: 10}}  source={{uri: 'http://localhost:8080/'+item.kep}}/>
          </View>
          
          <Text style={styles.title}>{item.nev}</Text>
          <Text style={styles.label}>Cím: {item.lakcim}</Text>
          <Text style={styles.label}>Nyitvatartás: {"\n"}{item.nyitas}</Text>
          <Text style={styles.label}>Telefon: {item.telefon}</Text>
          <View style={{flexDirection:"row"}}>
             <Image source={require('./like.png')} onClick={()=>this.like(item.id)} resizeMode='contain'  style={{flex:.2, height:50,width:50,margin:10}} />
             <Text style={{paddingTop:15, fontSize:25}}>{item.db}</Text>
             <Image source={require('./dislike.png')} onClick={()=>this.dislike(item.id)} resizeMode='contain' style={{flex:.2, height:50,width:50,margin:10,marginLeft:30  }} />
             <Text style={{paddingTop:15, fontSize:25}}>{item.db2}</Text>
           </View>
           
           
         {/* <Text style={{padding:2,fontSize:20}}>Értékelés:</Text>  

          <TouchableOpacity
          onPress={ ()=>this.kattintas(item.id)}

          style={{}}
          >
          <ReactStars
            count={5}
            half={false}
            value={this.state.megnyomva[item.id]}
            onChange={(ratings) => this.onStarRatingPress(ratings,item.id)}
            size={32}
            color2={'#ffd700'} />
            
     
          </TouchableOpacity>
          <Text  style={{padding:5,marginLeft:25,marginBottom:10}}>Átlag: {Math.round((item.atlag + Number.EPSILON) * 100) / 100}/5</Text>
    */}
          
          

          <Collapse
            

          >
          <CollapseHeader style={styles.gomb}  onClick={ ()=>this.velemeny(item.id)}>
            <View>
            
                <Text style={styles.label1}>Vélemények</Text>
              
            
                
                </View>
          </CollapseHeader>


          
            <CollapseBody>
            <View >
            <FlatList
            data={this.state.dataSource2}
        
            renderItem={({item}) =>
            <View style={{margin:10,borderWidth:1,padding:10,borderRadius:10}}>
            
            <Text style={{ padding: 5,fontSize:17}}>Név:</Text>
            <Text style={{padding: 5,fontSize:15,marginLeft:10}}>{item.velemeny_nev}</Text>
            <Text style={{padding: 5,fontSize:17}}>Vélemény:</Text>
            <Text style={{padding: 5,fontSize:15,marginLeft:10}}>{item.velemeny}</Text>
            </View>
            }
            keyExtractor={({velemenyid}, index) => velemenyid}


            />
            
            </View>

            <Collapse>
              <CollapseHeader style={styles.gomb}>
                <View>
                
                    <Text style={styles.label1}>Saját Vélemény</Text>
                  
                </View>
              </CollapseHeader>
              <CollapseBody style={{alignItems:"center"}}>
              <View style={{borderWidth:1,width:'90%',borderRadius:10,padding: 10,alignItems:"center",borderRadius:20,marginLeft:20,marginRight:20}}>
                  <Text style={styles.label1}>
                  Név:
                  </Text>
                  <TextInput
                    style={styles.szovegdoboz}
                    placeholder="Add meg a nevedet!"
                    onChangeText={(nev) => this.setState({nev})}
                    value={this.state.nev}
                  />
                  <Text style={styles.label1}>
                  Vélemény:
                  </Text>
                  <TextInput
                    style={styles.szovegdoboz2}
                    placeholder="Add meg a véleményed!"
                    onChangeText={(velemeny) => this.setState({velemeny})}
                    value={this.state.velemeny}
                  />

                  <TouchableOpacity 
                  onPress={async ()=>this.vfelvitel(item.id)}>
                    <View style={{width:200,backgroundColor:"lightgrey",marginTop:10,borderRadius:5}}>
                      <Text style={{textAlign:"center",padding:10 }}>Felvitel</Text>
                    </View>
                  </TouchableOpacity>
                      </View>
              </CollapseBody>
          </Collapse>




            </CollapseBody>
            </Collapse>


          
        </View>
        
        }
        keyExtractor={({id}, index) => id}
        
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
      marginBottom: 10,
      width:'100°',
      borderTopWidth:2,
      backgroundColor: "white",
      margin:"auto"



      

     
      
    },
    label:{
      padding: 5
      
    },
    
    
    
    
    label1:{
     padding: 5,
     fontSize:20
     
   
    },
    gomb:{
     padding: 10,
      margin: 10,
      marginBottom: 10,
      width: 250,
      height:50,
      borderRadius: 10,
      backgroundColor: "white",
      shadowColor:"black",
      shadowOffset: { width: 0, height: 1},
      shadowOpacity: 2,
      shadowRadius: 5,
      elevation: 1,
      justifyContent: 'center',
        alignItems: 'center',
   
     },
     gomb1:{
       
        marginTop:5,
        marginBottom: 10,
        width: 200,
        borderRadius: 10,
        backgroundColor: "white",
        shadowColor:"black",
        shadowOffset: { width: 0, height: 1},
        shadowOpacity: 2,
        shadowRadius: 5,
        elevation: 1,
        textAlign:"center"
     
       },
     velemeny:
     {
       marginTop:10,
       borderWidth:1,
       borderRadius:10,
       width:'100%',
       backgroundColor:"white",
        marginLeft:"auto",
        marginRight:"auto"
     },
   
     szovegdoboz:
     {
       padding:10,
       borderWidth:1,
       borderRadius:10,
       width:'90%',
       height:70,
       backgroundColor:"white",
        marginLeft:"auto",
        marginRight:"auto"
     },
     szovegdoboz2:
     {padding:10,
       borderWidth:1,
       borderRadius:10,
       width:'90%',
       height:120,
       backgroundColor:"white",
        marginLeft:"auto",
        marginRight:"auto"
     }
   
   });
