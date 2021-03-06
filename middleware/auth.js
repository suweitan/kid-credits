export default function ({ store, redirect, route }) {
  if (route.name === 'login') {
    if (store.state.currUser != null) 
      return redirect('/')
  }
  
  if (route.name !== 'login' && ! store.state.currUser) 
    return redirect('/login')
}