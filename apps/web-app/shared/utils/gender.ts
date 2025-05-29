export function suffixByGender(word: [string, string], gender?: 'male' | 'female' | 'unknown') {
  if (gender === 'male') {
    return word[0]
  } else if (gender === 'female') {
    return word[1]
  }

  return word[0]
}
