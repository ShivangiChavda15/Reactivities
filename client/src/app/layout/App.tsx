import { Box, CircularProgress, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useQuery } from "@tanstack/react-query";
import { useActivities } from "../../lib/hooks/useActivities";

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const { activities, isPending} = useActivities()

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find(a => a.id === id));
  }

  const handleCancelActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelActivity();
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }

  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <CssBaseline />
      <Navbar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {!activities || isPending ? (
          <CircularProgress />
        ) : (
        <ActivityDashboard 
          activities={activities}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelActivity}
          selectedActivity={selectedActivity} 
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleFormClose}
          />
        )}
      </Container>
    </Box>
  )
}

export default App
