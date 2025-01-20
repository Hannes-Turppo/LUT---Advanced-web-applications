import React from "react";

type Titem = {
    id: string,
    text: string
    clicked: boolean
}

interface ListProps {
    header: string,
    items: Titem[],
    updateList(id: string): void
}

const MyList: React.FC<ListProps> = ({header, items, updateList}) => {
    return (
        <div>
            <h1>{header}</h1>
            <ol>
                {items.map((item) => (
                    <li id={item.id} key={item.id} onClick={() => updateList(item.id)}>
                        {item.text}
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default MyList