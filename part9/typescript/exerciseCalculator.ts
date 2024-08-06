import { parseValues } from "./utils/parsing";

interface Result {
  periodLength: number,
  trainningDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (array: number[], target: number): Result => {
  const trainning = array.filter(item => item > 0);
  let time = 0;
  array.map(hours => time += hours);
  const avg = time / array.length;

  const targetDivision = target / 3;

  let rating = 0;
  switch (true) {
    case (avg < targetDivision):
      rating = 1;
      break;
    case (targetDivision < avg && avg < targetDivision * 3):
      rating = 2;
      break;
    case (avg > targetDivision):
      rating = 3;
      break;
  }

  let desc = '';
  if (rating === 1) {
    desc = 'Not really close. You should put more effort!';
  } else if (rating === 2) {
    desc = 'Not bad, but you can do better!';
  } else if (rating === 3) {
    desc = 'Congrats! You did great!';
  }

  return {
    periodLength: array.length,
    trainningDays: trainning.length,
    success: avg > target,
    rating: rating,
    ratingDescription: desc,
    target,
    average: avg
  };
};

try {
  const args = parseValues(process.argv);
  const target = args.shift();
  if (!target) throw new Error('Error: missing arguments.');
  console.log(calculateExercises(args, target));
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}