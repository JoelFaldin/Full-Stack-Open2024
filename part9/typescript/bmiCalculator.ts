const calculateBmi = (height: number, weight: number): string => {
  const result = weight / ((height * 0.01) ** 2)
  switch (true) {
    case (result < 16):
      return 'Underweight (Severe thinness)'
    case (16 < result && result < 16.9):
      return 'Underweight (Moderate thinness)'
    case (17 < result && result < 18.4):
      return 'Underweight (Mild thinness)'
    case (18.5 < result && result < 24.9):
      return 'Normal (healthy weight)'
    case (25 < result && result < 29.9):
      return 'Overweight (Pre-obese)'
    case (30 < result && result < 34.9):
      return 'Obsese (Class I)'
    case (35 < result && result < 39.9):
      return 'Obsese (Class II)'
    case (result >= 40):
      return 'Obese (Class IV)'
    default:
      return 'Invalid input.'
  }
}

console.log(calculateBmi(180, 74))