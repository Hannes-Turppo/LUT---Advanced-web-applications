import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"


function About() {
    // set up translation
    const {t} = useTranslation()


    // stateful variables
    const [items, setItems] = useState<any[]>([])

    // get data
    useEffect(() => {
        const getData = async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts")
            const data = await response.json()
            setItems(data)
        }
        getData()
    }, [])

    return (
        <>
            <h1>{t("About")}</h1>
            <div>
                {items.map((item) => (

                    <div key={item.id}>
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default About