import { CircularProgress, Grid } from "@mui/material";
import ActivityList from "./ActivityList";
import { useActivities } from "../../../lib/hooks/useActivities";

export default function ActivityDashboard() {
  const { activities, isPending} = useActivities();

  if (!activities || isPending) return <CircularProgress />;

  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ActivityList />
      </Grid>

      <Grid size={5}>
        Activity filters go here
      </Grid>
    </Grid>
  )
}

