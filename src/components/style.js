// ./src/components/style.js
import { StyleSheet} from 'react-native';



export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 160,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA500',
  },
  header:{
    flexDirection: 'row',
  },
  headerText:{
    fontSize : 30,
    fontWeight:300,
  }

});
