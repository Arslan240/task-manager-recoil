import {atom, selector} from 'recoil'

export const taskListAtom = atom({
    key: 'taskListState',
    default: [{
        "id": 1,
        "title": "Buy groceries",
        "completed": false
      },
      {
        "id": 2,
        "title": "Finish homework",
        "completed": true
      }]
})

export const completeTaskListSelector = selector({
    key: 'completedTaskListState',
    get: ({get}) => {
        const taskList = get(taskListAtom)
        return taskList.filter(task => task.completed)
    }
})

