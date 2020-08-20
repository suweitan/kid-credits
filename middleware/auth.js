export default function ({ store, redirect, route }) {
  console.log('auth called')
  console.log(route)

  if (route.name === 'login') {
    if (store.state.currUser != null) 
      return redirect('/')
  }
  
  if (route.name !== 'login' && ! store.state.currUser) 
    return redirect('/login')
}