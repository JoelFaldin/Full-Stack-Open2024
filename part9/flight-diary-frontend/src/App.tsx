import { useEffect, useState } from 'react'
import Diaries from './components/Diaries'
import DiaryForm from './components/DiaryForm'
import { DiariesType } from './types'
import diaryService from './services/diaryService'

function App() {
  const [diaries, setDiaries] = useState<DiariesType[]>([])

  useEffect(() => {
    diaryService.getDiaries().then(res => {
      setDiaries(res)
    })
  }, [])

  return (
    <>
      <h1>Diary entries</h1>
      <Diaries diaries={diaries} />
      <DiaryForm diaries={diaries} setDiaries={setDiaries} />
    </>
  )
}

export default App
