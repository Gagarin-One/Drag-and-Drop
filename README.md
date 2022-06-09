# Drag-and-drop board

Kanban board based on [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) technology.

<img width="1344" alt="image" src="https://user-images.githubusercontent.com/92833239/172754146-bbd5af04-a76f-4cd6-b5ab-03b2c1bd8273.png">

## Deployment
### Click [here](https://gagarin-one.github.io/Drag-and-Drop/) to view the deployment


![some](https://media.giphy.com/media/i8qL25qtq3VnVCWTCo/giphy.gif)
## Technologies
Project is created with:
  Create react app
* React version: 17.1.0
* Scss
* uuid
* react-beautiful-dnd: 13.1.0
## Problems that have arisen
<p>Оne of the first problems was the incompatibility of one of the components with react version 18, so the application is deployed on version 17 of react</p>

<p>Another problem was writing the basic logic for setting tasks to the correct positions</p>	

```
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
```

## Setup
To run this project, install it locally using npm:

```
$ cd ../Planterplaneter
$ npm install
$ npm start
```
