import {useState} from 'react'
import {IJoke} from "../models/Joke"


export function useJokes() {
    const [savedJokes, setJokes] = useState<IJoke[]>([])

    const saveJoke = (newJoke: IJoke) => {
        setJokes([...savedJokes, newJoke])
        console.log(`${newJoke.id} \nHas been saved`)
        return true
    }

    const deleteJoke = (id: number) => {
        const newJokes: IJoke[] = savedJokes.filter((joke) => joke.id !== id)
        setJokes(newJokes)
        console.log(`Joke ${id} \nHas been deleted`)
    }

    return {savedJokes, saveJoke, deleteJoke}
}
