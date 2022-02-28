import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login'
import Register from '../Register/Register';
function setToken(userToken){
sessionStorage.setItem('token',JSON.stringify(userToken));
}
function getToken(){
  const jwt_token_string = sessionStorage.getItem('token');
  const jwt_token = JSON.parse(jwt_token_string);
  console.log(jwt_token)
  return jwt_token?.token
  
}
function App() {
  const token = getToken();
  
  if(!token){
    console.log(token)
    return <Login setToken={setToken}/>
  }
  return (
   <div className="container">
     <h1>Titu Tasks</h1>
     <BrowserRouter>
     <Routes>
       <Route path='/dashboard' element={<Dashboard />}/>
       <Route path='/register' element={<Register/>} />
       <Route path='/login' element={<Login/>} />
     </Routes>
     </BrowserRouter>
   </div>
  );
}

export default App;
