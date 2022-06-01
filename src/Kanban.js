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

const changePropertyInSection = (section, task,taskIndex,dataIndex) => {
    //change the tasks array and replace the task in it
    section.tasks.splice(taskIndex,1,task)
    //copy the section and change the tasks in it
    const obj = {...section,tasks:section.tasks}
    const ArrayOfSection = [...data]
    ArrayOfSection.splice(dataIndex,1,obj)
    setData(ArrayOfSection)
}

const changeValue = (e,dataIndex,taskIndex) =>{
    //select the desired section
    const section = data[dataIndex]
    //select the desired task
    const task = {...section.tasks[taskIndex],title:e.target.value}
    changePropertyInSection(section,task,taskIndex,dataIndex)
}

const ChangeEditMode = (dataIndex,taskIndex) => {
    const reverseDataBoolean = !data[dataIndex].tasks[taskIndex].isEdit
    //select the desired section
    const section = data[dataIndex]
    //select the desired task
    const task = {...section.tasks[taskIndex],isEdit:reverseDataBoolean}
    changePropertyInSection(section,task,taskIndex,dataIndex)
}
    

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={s.kanban}>
                {data.map((section,dataIndex) => (
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
                                        {section.tasks.map((task, taskIndex) => (
                                                <Draggable
                                                    key={task.id}
                                                    draggableId={task.id}
                                                    index={taskIndex}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div className={s.itemContent}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                ...provided.draggableProps.style,
                                                                opacity: snapshot.isDragging ? '0.5' : '1'
                                                            }}
                                                        >
                                                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                                <div>
                                                                {
                                                                    task.isEdit 
                                                                    ?
                                                                    <input onChange={(e)=>changeValue(e,dataIndex,taskIndex)} 
                                                                    onBlur={(e)=>ChangeEditMode(dataIndex,taskIndex)}
                                                                    value={data[dataIndex].tasks[taskIndex].title}
                                                                    autoFocus/>
                                                                    :
                                                                    <Card>
                                                                        {task.title}
                                                                    </Card>
                                                                }
                                                                </div>
                                                               
                                                                <svg onClick={()=>ChangeEditMode(dataIndex,taskIndex)}  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))
                                        }
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