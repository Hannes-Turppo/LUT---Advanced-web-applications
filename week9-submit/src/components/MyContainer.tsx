import React, { useState } from "react";
import MyList from "./MyList"

type Titem = {
    id: string,
    text: string,
    clicked: boolean
}

interface MyContainerProps {
    // header: string
    // items: {
    //     id: string,
    //     text: string
    // }[]
}



const MyContainer: React.FC<MyContainerProps> = () => {
    const header: string = "very kool header"
    const [items, setItems] = useState<Titem[]>([])
    const [textArea, setTextArea] = useState("");
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newId = items.length as unknown as string
        const newItem: Titem = {
            id: newId,
            text: textArea,
            clicked: false
        }
        setItems([...items, newItem])
        setTextArea("")
    }

    const updateList = (id: string) => {
        let clickedItem = document.getElementById(id);
        if (clickedItem) {
            if (clickedItem.style.textDecoration === "line-through") {
                clickedItem.style.textDecoration = "line-through";
            } else {
                clickedItem.style.textDecoration = "line-through";
            }
        }
    }


    return (
        <div>
            <div className="myContainer">
                <MyList
                    header={header}
                    items={items}
                    updateList={updateList}
                    />
            </div>
            <div className="addItemForm">
                <form onSubmit={handleSubmit}>
                    <textarea name="itemTextArea" id="itemTextArea" placeholder="Add items..." onChange={(e) =>setTextArea(e.target.value)} value={textArea}/>
                    
                    <button type="submit">Add item</button>
                </form>
            </div>
        </div>
    )
}


export default MyContainer