import { useController, type UseControllerProps } from "react-hook-form"
import { DateTimePicker, type DateTimePickerProps } from '@mui/x-date-pickers';
import type { ActivitySchema } from "../../../lib/schemas/activitySchema";

type Props = {} & UseControllerProps<ActivitySchema> & DateTimePickerProps;

export default function DateTimeInput(props: Props) {
  const { field, fieldState } = useController({ ...props });

  return (
    <DateTimePicker
      {...props}
      value={field.value ? new Date(field.value) : null}
      onChange={value => {
        field.onChange(new Date(value!))
      }}
      sx={{ width: '100%' }}
      slotProps={{
        textField: {
          onBlur: field.onBlur,
          error: !!fieldState.error,
          helperText: fieldState.error?.message
        }
      }}
    />
  )
}
