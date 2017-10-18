import { StyleSheet, PixelRatio, Platform } from 'react-native';

 export const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  inputStyle: {
    margin: 15,
    height: 40,
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#3f51b5',
    padding: 10,
    margin: 15,
    height: 40,
    flex:1,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems:"center",
    alignSelf:"flex-end"
  },
  registerButton: {
    backgroundColor: '#ef6c00',
    padding: 10,
    margin: 15,
    height: 40,
    flex:1,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems:"center",
    alignSelf:"flex-end"
  },
  container: {
    flex: 1,
    marginTop:60,
    marginBottom:50,
  },
  containerWithoutTabs: {
    flex: 1,
    marginTop:60,
  },
  tabBar: {
    borderTopColor: '#dddddd',
    borderTopWidth: 1 / PixelRatio.get(),
    backgroundColor: '#262626',
    opacity: 0.98
  },
  navigationBarStyle: {
    backgroundColor: 'red',
  },
  navigationBarTitleStyle: {
    color:'#ffffff',
  },
  image: {
    marginTop:200,
    height: 100,
    borderRadius: 50,
    width: 100
  },
  Avatarcontainer:{
    ...Platform.select({
      ios:{
        flex:1,
        height:75,
        width:85,
      },
      android:{
        flex:1,
        height:75,
        width:85,
      }
    })
  },
  icon: {
       color: '#000',
       fontSize: 26,
       borderColor: '#000033',
       borderWidth: 1,
       borderRadius: 20,
       width: 20,
       height: Platform.OS == 'ios' ? 30 : 40,
       justifyContent: 'center',
       alignItems: 'center',
       textAlign: 'center',
       paddingTop: Platform.OS == 'ios' ? 10 : 0
   },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
};
