import { IJoke } from "../models/Joke"
import { Card, CardContent, Typography, Button } from "@mui/material"


interface savedPageProps {
  savedJokes: IJoke[]
  deleteJoke: (id: number) => void
}

function SavedPage({savedJokes, deleteJoke}: savedPageProps) {
  return (
    <>

      {savedJokes.length === 0 ? (
        <Typography variant="h3">No saved jokes yet.</Typography>
      ) : (
        savedJokes.map((joke) => (
          <Card key={joke.id}>
          <CardContent>
          <Typography variant="h5">{joke.setup}</Typography>
          <Typography variant="body1">{joke.punchline}</Typography>
          <Button variant="contained" onClick={() => {
            if (!deleteJoke) {
              console.error("error removing joke")
            } else {
              deleteJoke(joke.id) 
            }}}>Delete</Button>
            </CardContent>
            </Card>
          ))
        )}
    </>
  )
}

export default SavedPage