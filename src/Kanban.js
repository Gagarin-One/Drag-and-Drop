import s from './kanban.module.scss'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import mockData from './mockData'
import { useEffect, useState } from 'react'
import Card from './Card'
import { v4 as uuidv4 } from 'uuid'

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
   
const deleteTask = (sectionIndex,deleteTaskId) => {
    const arrOfTasks = [...data[sectionIndex].tasks] 
    arrOfTasks.splice(deleteTaskId,1)
    const changedData = {...data[sectionIndex],tasks:arrOfTasks}
    const ArrayOfSection = [...data]
    ArrayOfSection.splice(sectionIndex,1,changedData)
    console.log(ArrayOfSection)
    setData(ArrayOfSection)
}

const addTask = (sectionIndex) => {
    const Task = {
        id: uuidv4(),
        title: 'New task',
        isEdit:true
    }
    let arrOfTasks = [...data[sectionIndex].tasks]
    const addTask = arrOfTasks.push(Task)
    const changedData = {...data[sectionIndex],tasks:arrOfTasks}
    const ArrayOfSection = [...data]
    ArrayOfSection.splice(sectionIndex,1,changedData)
    setData(ArrayOfSection)
}

// if the content of the task is empty
// and is not in the editing mode, the task will be deleted
useEffect(() => {
    for (let i = 0; i < data.length; i++){
        for (let j = 0; j < data[i].tasks.length; j++){
            if (data[i].tasks[j].isEdit===false && data[i].tasks[j].title ===''){
                deleteTask(i,j)
            }
        }
    }
})

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
                                    <div className={s.headTitle}>
                                        <div className={s.section__title}>
                                            {section.title}
                                        </div>
                                        <svg onClick={()=> addTask(dataIndex)} width="24" height="24" viewBox="0 0 24 24" fill="rgb(83, 83, 83)" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20V20ZM16 11H13V8C13 7.73478 12.8946 7.48043 12.7071 7.29289C12.5196 7.10536 12.2652 7 12 7C11.7348 7 11.4804 7.10536 11.2929 7.29289C11.1054 7.48043 11 7.73478 11 8V11H8C7.73479 11 7.48043 11.1054 7.2929 11.2929C7.10536 11.4804 7 11.7348 7 12C7 12.2652 7.10536 12.5196 7.2929 12.7071C7.48043 12.8946 7.73479 13 8 13H11V16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16V13H16C16.2652 13 16.5196 12.8946 16.7071 12.7071C16.8946 12.5196 17 12.2652 17 12C17 11.7348 16.8946 11.4804 16.7071 11.2929C16.5196 11.1054 16.2652 11 16 11Z" />
                                        </svg>
                                    </div>

                                    <div className={s.section__content}>
                                        {
                                        section.tasks.map((task, taskIndex) => (
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
                                                                    <Card style={{maxWidth:'100px'}}>
                                                                        {task.title}
                                                                    </Card>
                                                                }
                                                                </div>
                                                                <div style={{display: 'flex'}}>
                                                                <svg style={{margin: '3px 0 0 10px'}} onClick={()=>ChangeEditMode(dataIndex,taskIndex)}  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M5 17.9999H9.24C9.37161 18.0007 9.50207 17.9755 9.62391 17.9257C9.74574 17.8759 9.85656 17.8026 9.95 17.7099L16.87 10.7799L19.71 7.99994C19.8037 7.90698 19.8781 7.79637 19.9289 7.67452C19.9797 7.55266 20.0058 7.42195 20.0058 7.28994C20.0058 7.15793 19.9797 7.02722 19.9289 6.90536C19.8781 6.7835 19.8037 6.6729 19.71 6.57994L15.47 2.28994C15.377 2.19621 15.2664 2.12182 15.1446 2.07105C15.0227 2.02028 14.892 1.99414 14.76 1.99414C14.628 1.99414 14.4973 2.02028 14.3754 2.07105C14.2536 2.12182 14.143 2.19621 14.05 2.28994L11.23 5.11994L4.29 12.0499C4.19732 12.1434 4.12399 12.2542 4.07423 12.376C4.02446 12.4979 3.99924 12.6283 4 12.7599V16.9999C4 17.2652 4.10536 17.5195 4.29289 17.707C4.48043 17.8946 4.73478 17.9999 5 17.9999ZM14.76 4.40994L17.59 7.23994L16.17 8.65994L13.34 5.82994L14.76 4.40994ZM6 13.1699L11.93 7.23994L14.76 10.0699L8.83 15.9999H6V13.1699ZM21 19.9999H3C2.73478 19.9999 2.48043 20.1053 2.29289 20.2928C2.10536 20.4804 2 20.7347 2 20.9999C2 21.2652 2.10536 21.5195 2.29289 21.707C2.48043 21.8946 2.73478 21.9999 3 21.9999H21C21.2652 21.9999 21.5196 21.8946 21.7071 21.707C21.8946 21.5195 22 21.2652 22 20.9999C22 20.7347 21.8946 20.4804 21.7071 20.2928C21.5196 20.1053 21.2652 19.9999 21 19.9999Z" />
                                                                </svg>
                                                                <svg style={{margin:'3px 10px 0 15px'}} onClick={()=> deleteTask(dataIndex, taskIndex) } width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M13.4099 12.0002L17.7099 7.71019C17.8982 7.52188 18.004 7.26649 18.004 7.00019C18.004 6.73388 17.8982 6.47849 17.7099 6.29019C17.5216 6.10188 17.2662 5.99609 16.9999 5.99609C16.7336 5.99609 16.4782 6.10188 16.2899 6.29019L11.9999 10.5902L7.70994 6.29019C7.52164 6.10188 7.26624 5.99609 6.99994 5.99609C6.73364 5.99609 6.47824 6.10188 6.28994 6.29019C6.10164 6.47849 5.99585 6.73388 5.99585 7.00019C5.99585 7.26649 6.10164 7.52188 6.28994 7.71019L10.5899 12.0002L6.28994 16.2902C6.19621 16.3831 6.12182 16.4937 6.07105 16.6156C6.02028 16.7375 5.99414 16.8682 5.99414 17.0002C5.99414 17.1322 6.02028 17.2629 6.07105 17.3848C6.12182 17.5066 6.19621 17.6172 6.28994 17.7102C6.3829 17.8039 6.4935 17.8783 6.61536 17.9291C6.73722 17.9798 6.86793 18.006 6.99994 18.006C7.13195 18.006 7.26266 17.9798 7.38452 17.9291C7.50638 17.8783 7.61698 17.8039 7.70994 17.7102L11.9999 13.4102L16.2899 17.7102C16.3829 17.8039 16.4935 17.8783 16.6154 17.9291C16.7372 17.9798 16.8679 18.006 16.9999 18.006C17.132 18.006 17.2627 17.9798 17.3845 17.9291C17.5064 17.8783 17.617 17.8039 17.7099 17.7102C17.8037 17.6172 17.8781 17.5066 17.9288 17.3848C17.9796 17.2629 18.0057 17.1322 18.0057 17.0002C18.0057 16.8682 17.9796 16.7375 17.9288 16.6156C17.8781 16.4937 17.8037 16.3831 17.7099 16.2902L13.4099 12.0002Z" />
                                                                </svg>
                                                                </div>

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