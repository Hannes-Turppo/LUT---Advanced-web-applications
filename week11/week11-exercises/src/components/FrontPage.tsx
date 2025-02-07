import { useState } from "react"
import { Button, Box, Card, CardContent, Typography } from "@mui/material"
import { IJoke } from "../models/Joke"


interface FrontPageProps {
    saveJoke?: (joke: IJoke) => boolean;
    }

function FrontPage({saveJoke}: FrontPageProps) {
    const [joke, setJoke] = useState<IJoke | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const url: string = "https://official-joke-api.appspot.com/random_joke"

    const getJoke = async (url: string) => {
        setLoading(true)
        const abortCtrl = new AbortController()

        try {
            const response = await fetch(url, {signal: abortCtrl.signal})
            const newJoke = await response.json()
            setJoke(newJoke)
        } catch (error: any) {
            if (error.name === "AbortError") {
                console.error(`Fetch aborted: ${error}`)
            } else {
                console.log(`Error while fetching joke ${error}`)
            }
        } finally {
            setLoading(false)
        }
    }
    
    
    return (
        <>
            <Box component="section">
                <Button variant="contained" onClick={() => getJoke(url)}>Get Joke</Button>

                {loading && (
                    <Typography>Loading a joke...</Typography>
                )}
                {joke && (
                    <Card key="joke-container">
                    <CardContent>
                        <Typography variant="h5">{joke?.setup}</Typography>
                        <Typography variant="body1">{joke?.punchline}</Typography>

                        <Button variant="contained" onClick={() => { 
                            if (!saveJoke) {
                                console.error("error saving joke")
                            } else {
                                saveJoke(joke) 
                            }}}>Save joke</Button>
                    
                    </CardContent>
                </Card>
                )}

            </Box>
        </>
    )
}

export default FrontPage
