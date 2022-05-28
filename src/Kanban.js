
import { DragDropContext} from 'react-beautiful-dnd'
import mockData from './mockData'
import { useState } from 'react'


const Kanban = () => {
    const [data, setData] = useState(mockData)

    const onDragEnd = result => {
        if (!result.destination) return
        const { source, destination } = result

        if (source.droppableId !== destination.droppableId) {
            const sourceColIndex = data.findIndex(e => e.id === source.droppableId)
            const destinationColIndex = data.findIndex(e => e.id === destination.droppableId)

            const sourceCol = data[sourceColIndex]
            const destinationCol = data[destinationColIndex]

            const sourceTask = [...sourceCol.tasks]
            const destinationTask = [...destinationCol.tasks]

            const [removed] = sourceTask.splice(source.index, 1)
            destinationTask.splice(destination.index, 0, removed)

            data[sourceColIndex].tasks = sourceTask
            data[destinationColIndex].tasks = destinationTask

            setData(data)
        } 
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
           
        </DragDropContext>
    )
}

export default Kanban