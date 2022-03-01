import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TaskItem from '../TaskItem/TaskItem'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const TASK_URL = '/tasks';

const theme = createTheme();
const Tasks = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const [tasks,setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDesc, setTaskDesc ] = useState("");

    useEffect(() => {
      const loadTask = async() =>{    
        try {
          const response =  await axiosPrivate.get(TASK_URL,
             {
                 headers: { 'Content-Type': 'application/json'},
                 withCredentials: true
             }
         );  
         console.log(response.data.data);
         setTasks(response.data.data);
         console.log({tasks})
     } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
     }
      }
      loadTask();
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

   
    
    const addTask = async(event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
         try {
             const saveTaskResponse =  await axiosPrivate.post(TASK_URL,
                JSON.stringify({
                    title: data.get('title'),
                    description: data.get('description'),
                  }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const addedTask = {_id: saveTaskResponse.data.id,title:taskTitle,description:taskDesc}
            setTasks(tasks => [...tasks, addedTask])
            setTaskTitle('');
            setTaskDesc('');
            data.set('title','')
            data.set('description','')
          
        } catch (err) {
           console.error(err);
           navigate('/login', { state: { from: location }, replace: true });
        }
    }

    
  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
          <Box component="form" noValidate onSubmit={addTask} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
                <TextField
                  required
                  name="title"
                  label="Title"
                  placeholder="Title here"
                  type="text"
                  id="title"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />
              </Grid>
         <Grid item xs={16}>
         <TextField
          id="outlined-textarea"
          name="description"
          label="Add Description"
          placeholder="Description"
          value={taskDesc}
          fullWidth
          multiline
          onChange={(e) => setTaskDesc(e.target.value)}
        />
        </Grid>
        <Grid item xs={12}>
         <Button variant="contained" type='submit'>Add</Button>
        </Grid>
        </Grid>
        </Box>
      </Box>
      <List>
      {
        tasks.length ? 
        tasks.map(element => {
         return <TaskItem key={element._id} item={element} setTasks={setTasks}/>
        }) : <Alert severity="info">No Tasks Found</Alert>
          }     
      </List>
      </Container>
    </ThemeProvider>
  )
}

export default Tasks