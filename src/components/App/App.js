import './App.css';
import { Route, Routes} from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register';
import Tasks from '../Tasks/Tasks';
import Layout from './Layout/Layout';
import Missing from '../MissingPage/MissingPage';
import AuthCheck from '../AuthCheck/AuthCheck';
 
function App() {
  return (
   <div className="container">
     <h1>Titu Tasks</h1>
     <Routes>
       <Route path='/' element={<Layout/>}>
        <Route path='register' element={<Register/>} />
        <Route path='login' element={<Login/>} />
        <Route element={<AuthCheck/>}>
        <Route path='tasks' element={<Tasks/>} />
        </Route>
        <Route path="*" element={<Missing />} />
       </Route>
     </Routes>
   </div>
  );
}

export default App;
