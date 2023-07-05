import { useEffect, useState } from 'react'
import { atom, useRecoilState, } from 'recoil'
import './App.css'
import TaskManager from './TaskManager'


function App() {
  return (
    <TaskManager/>
  )
}

export default App
