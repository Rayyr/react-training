import { Alert, AlertDescription, AlertTitle } from "./Alert.jsx";
import { AlertCircleIcon } from "lucide-react"


export function AlertDestructive({ message }) {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription>
        {message || "Unable to load student details. Please try again."}
      </AlertDescription>
    </Alert>
  );
}
  