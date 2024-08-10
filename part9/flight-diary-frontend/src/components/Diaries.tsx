import { DiariesType } from "../types"

interface DiariesInterface {
  diaries: DiariesType[]
}

const Diaries: React.FC<DiariesInterface> = ({ diaries }) => {
  

 if (diaries.length === 0) {
  return <p>Loading data...</p>
 }

  return (
    <>
      {
        diaries.map(diary => (
          <span key={diary.id}>
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
          </span>
        ))
      }
    </>
  )
}

export default Diaries