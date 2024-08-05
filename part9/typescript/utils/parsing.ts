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
  if (args.length < 2) throw new Error('You are missing an argument.')
  if (args.length > 2) throw new Error('Too many arguments!')

  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return {
      height: Number(args[0]),
      weight: Number(args[1])
    }
  } else {
    throw new Error('You should provide valid height and weight values!')
  }
}