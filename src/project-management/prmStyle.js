import { StyleSheet} from 'react-native'

export const styles_List=StyleSheet.create({
  renderBox:{
    borderWidth: 0,
    width:400,
    borderBottomWidth:1,
    borderColor : '#FFB74D',
    borderRadius:25,
    padding:10,
    marginVertical:15,
    height:60,
    alignItems:'center',
    justifyContent:'center',
  },
  renderText:{
    color:'#333',
        fontSize:20,
        fontFamily:'NS_EB',
        
  }


})

export const p_styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      marginTop : 10,
      marginLeft: 50,
      fontSize :18,
      color:'#FFB74D',
      fontWeight:'300',
      fontFamily:'NS_EB',
   },
   repoPicker: {
      marginTop:10, marginLeft:60,
      padding:10,
      width:250,
      height:50,
      borderWidth:.5,
      borderRadius:15,
      borderColor:'#ccc',
      alignItems:'center',
      justifyContent:'center',
      marginTop:20,
   },
   selectedRepoText:{
        color:'#333',
        fontSize:16,
        fontFamily:'NS_R'
   },
   placeholderText:{
        color:'#999',
        fontSize:16
   },
   modalOverlay:{
       flex:1,
       backgroundColor:'rgba(0,0,0,.5)',
   },
   modalContent:{
      position:'absolute',
      bottom:0,
      left:0,
      right:0,
      backgroundColor:'#fff',
      justifyContent:'center',
  },
    registerBox:{
      width: 110,
      height: 50,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFA500'
    },
    Textin: {
      padding:10,
      marginLeft:18,
      fontSize: 16,
      borderWidth:0,
      width:250,
      borderBottomWidth: 1,
      borderColor:'#ccc',
      textAlign : 'center',
      marginTop: 15,
      fontFamily:'NS_R',
  },
  inputContainer:{
    marginTop : 10,
    marginLeft : 40,
    width:'80%',
},
registText:{
  color:'white',
  fontFamily:'NS_EB',
  fontSize:20,

},
repoBox:{
  width: 110,
  height: 50,
  borderRadius: 15,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFA500',
  position:'absolute',
  top:20,
  right:10,
  padding:10
},

taskText:{
  fontFamily:'NS_R',
  fontSize:17,
}
})