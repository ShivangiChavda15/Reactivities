import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
  closeForm: () => void;
  activity?: Activity;
}

export default function ActivityForm( { closeForm, activity }: Props) {
  const { updateActivity, createActivity } = useActivities();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formdata = new FormData(event.currentTarget);
    const data: { [key: string]: FormDataEntryValue } = {};

    formdata.forEach((value, key) => {
      data[key] = value;
    });

    if (activity) {
      data.id = activity.id;
      updateActivity.mutate(data as unknown as Activity);
      closeForm();
    } else {
      createActivity.mutate(data as unknown as Activity);
      closeForm();
    }
  }

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">Create Activity</Typography>

      <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField name="title" label="Title" defaultValue={activity?.title} />
        <TextField name="description" label="Description" multiline rows={3} defaultValue={activity?.description} />
        <TextField name="category" label="Category" defaultValue={activity?.category} />
        <TextField 
          type="date"
          name="date"
          defaultValue={
            activity?.date ? new Date(activity?.date).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0]
          }
          />
        <TextField name="city" label="City" defaultValue={activity?.city} />
        <TextField name="venue" label="Venue" defaultValue={activity?.venue} />

        <Box display="flex" justifyContent="end" gap={3}>
          <Button onClick={closeForm} color="inherit">Cancel</Button>
          <Button type='submit' color="success" variant="contained" disabled={updateActivity.isPending || createActivity.isPending}>Submit</Button>
        </Box>
      </Box>
    </Paper>
  )
}

