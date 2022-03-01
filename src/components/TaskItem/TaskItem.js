import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from "react-router-dom";
import { Grid } from '@mui/material';
import Box from "@mui/material/Box";
import TaskIcon from '@mui/icons-material/Task';
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
const TASK_URL = '/tasks/delete';
const TaskItem = ({item,setTasks}) => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    console.log("Inside Item")
    console.log({item})
    const deleteTask = async() => {
        try {
            console.log("Deleting item");
            console.log(item._id);
             await axiosPrivate.post(TASK_URL,
               JSON.stringify({
                  id:item._id
                 }),
               {
                   headers: { 'Content-Type': 'application/json' },
                   withCredentials: true
               }
           );
           setTasks(tasks => tasks.filter(task => task._id !== item._id))
       } catch (err) {
          console.error(err);
          navigate('/login', { state: { from: location }, replace: true });
       }
   }
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
<Grid container spacing={2}>
        <Grid item xs={12} md={6}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={deleteTask}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <TaskIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.title}
                secondary={item.description}
              />
            </ListItem>
        </Grid>
      </Grid>
      </Box>
  )
}

export default TaskItem