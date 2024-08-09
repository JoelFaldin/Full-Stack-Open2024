import { useEffect, useState } from "react"

import { DiariesType } from "../types"
import diaryService from "../services/diaryService"

const Diaries = () => {
  const [diaries, setDiaries] = useState<DiariesType[]>([])

  useEffect(() => {
    diaryService.getDiaries().then(res => {
      setDiaries(res)
    })
  }, [])

 if (diaries.length === 0) {
  return <p>Loading data...</p>
 }

  return (
    <>
      {
        diaries.map(diary => (
          <>
            <h2>{diary.date}</h2>
            <p>
              <span>visibility: {diary.visibility}</span>
              <br />
              <span>weather: {diary.weather}</span>
              <br />
              {
                diary.comment ? (
                  <span>comment: {diary.comment}</span>
                ) : (<></>)
              }
            </p>
          </>
        ))
      }
    </>
  )
}

export default Diaries