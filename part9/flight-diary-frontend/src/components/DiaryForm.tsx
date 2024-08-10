import { Dispatch, SetStateAction, useState } from "react"

import diaryService from "../services/diaryService"
import { DiariesType, NonIdDiary, Visibility, Weather } from "../types"

interface FormInterface {
  diaries: DiariesType[],
  setDiaries: Dispatch<SetStateAction<DiariesType[]>>
}

const DiaryForm: React.FC<FormInterface> = ({ diaries, setDiaries }) => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

  const sendEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    const newEntry: NonIdDiary = {
      date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment
    }

    const data = await diaryService.submitDiary(newEntry)

    setDiaries(diaries.concat(data))

    setDate('')
    setVisibility('')
    setWeather('')
    setComment('')
  }

  return (
    <>
      <h2>Add new entry</h2>

      <form onSubmit={sendEntry}>
        <div>
          <label htmlFor="date">date</label>
          <input
            id="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="visibility">visibility</label>
          <input
            id="visibility"
            value={visibility}
            onChange={e => setVisibility(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="weather">weather</label>
          <input
            id="weather"
            value={weather}
            onChange={e => setWeather(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="comment">comment</label>
          <input
            id="comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </div>

        <button type="submit">add entry</button>
      </form>
    </>
  )
}

export default DiaryForm