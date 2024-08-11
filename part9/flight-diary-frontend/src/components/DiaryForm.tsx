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

  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const sendEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    const newEntry: NonIdDiary = {
      date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment
    }

    try {
      const data = await diaryService.submitDiary(newEntry) as DiariesType;
      
      setDiaries(diaries.concat(data))
  
      setDate('')
      setVisibility('')
      setWeather('')
      setComment('')
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMsg(error.message)
      }
    }
  }

  return (
    <>
      <h2>Add new entry</h2>

      {
        errorMsg ?? <p style={{ color: 'red' }}>There was a problem: {errorMsg}</p>
      }

      <form onSubmit={sendEntry}>
        <div>
          <label htmlFor="date">date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="visibility">
            <strong>visibility:</strong>
          </label>
          <br />

          great <input type="radio" onChange={() => setVisibility('great')} /><br />
          good <input type="radio" onChange={() => setVisibility('good')} /><br />
          ok <input type="radio" onChange={() => setVisibility('ok')} /><br />
          poor <input type="radio" onChange={() => setVisibility('poor')} />
        </div>
        <div>
          <label htmlFor="weather">
            <strong>weather:</strong>
          </label>
          <br />

          sunny <input type="radio" onChange={() => setWeather('sunny')} /><br />
          rainy <input type="radio" onChange={() => setWeather('rainy')} /><br />
          cloudy <input type="radio" onChange={() => setWeather('cloudy')} /><br />
          stormy <input type="radio" onChange={() => setWeather('stormy')} /><br />
          windy <input type="radio" onChange={() => setWeather('windy')} />
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