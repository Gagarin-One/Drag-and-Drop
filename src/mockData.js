import { v4 as uuidv4 } from 'uuid'
//The IDs were marked with uuids so that the 
//framework could change the correct component.
//according to the beautiful DnD documentation
const mockData = [
    {
        id: uuidv4(),
        title: ' 📃 To do',
        tasks: [
            {
                id: uuidv4(),
                title: 'Learn JavaScript',
                isEdit:false
            },
            {
                id: uuidv4(),
                title: 'Learn Git',
                isEdit:false
            },
            {
                id: uuidv4(),
                title: 'Learn Python',
                isEdit:false
            },
        ]
    },
    {
        id: uuidv4(),
        title: ' ✏️ In progress',
        tasks: [
            {
                id: uuidv4(),
                title: 'Learn CSS',
                isEdit:false
            },
            {
                id: uuidv4(),
                title: 'Learn Golang',
                isEdit:false
            }
        ]
    },
    {
        id: uuidv4(),
        title: ' ✔️ Completed',
        tasks: [
            {
                id: uuidv4(),
                title: 'Learn HTML',
                isEdit:false
            }
        ]
    }
]

export default mockData