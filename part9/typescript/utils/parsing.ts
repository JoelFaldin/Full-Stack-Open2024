export const parseValues = (args: string[]): number[] => {
  if (args.length < 4) throw new Error('You are missing arguments.')
  
  // Filtering non-number values:
  const filteredArray = args.filter(item => !isNaN(Number(item)))
  return filteredArray.map(number => Number(number))
}

interface Values {
  height: number,
  weight: number
}

export const parseArgs = (args: string[]): Values => {
  if (args.length < 4) throw new Error('You are missing an argument.')
  if (args.length > 4) throw new Error('Too many arguments!')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('You should provide valid height and weight values!')
  }
}