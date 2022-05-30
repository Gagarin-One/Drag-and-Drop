import s from './kanban.module.scss'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import mockData from './mockData'
import { useState } from 'react'
import Card from './Card'

const Kanban = () => {
    const [data, setData] = useState(mockData)

    const onDragEnd = (result) => {
        if (!result.destination) return
        const { source, destination } = result

        //if the transferred item is moved to another section
        if (source.droppableId !== destination.droppableId) {
            //find section id
            const sourceColIndex = data.findIndex(e => e.id === source.droppableId)
            const destinationColIndex = data.findIndex(e => e.id === destination.droppableId)

            const sourceCol = data[sourceColIndex]
            const destinationCol = data[destinationColIndex]
            // writing down the item that has been moved
            const sourceTask = [...sourceCol.tasks]
            const destinationTask = [...destinationCol.tasks]

            const [removed] = sourceTask.splice(source.index, 1)
            destinationTask.splice(destination.index, 0, removed)
            //swapping item
            data[sourceColIndex].tasks = sourceTask
            data[destinationColIndex].tasks = destinationTask
            //set changed array
            setData(data)
        } else {
            //if the transferred element 
            //is not moved to another section and it is swapped
            //find id for section array
            const sourceColIndex = data.findIndex(e => e.id === source.droppableId)
            const sourceCol = data[sourceColIndex]
            // writing copied items
            const copiedItems = [...sourceCol.tasks]
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            data[sourceColIndex].tasks = copiedItems
            
            setData(data)
          }
    }
    
    

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={s.kanban}>
                {data.map(section => (
                        <Droppable
                            key={section.id}
                            droppableId={section.id}
                        >
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    className={s.section}
                                    ref={provided.innerRef}
                                >
                                    <div className={s.section__title}>
                                        {section.title}
                                    </div>
                                    <div className={s.section__content}>
                                        
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))
                }
            </div>
        </DragDropContext>
    )
}

export default Kanban