type City = {
  id: string
  name: string
  url: string
}

export const useCityStore = defineStore('city', () => {
  const cities = ref<City[]>(
    [
      {
        id: 'kaliningrad',
        name: 'Калининград',
        url: 'https://kaliningrad.orderdemo.online',
      },
      {
        id: 'other',
        name: 'Другой город?',
        url: 'https://kaliningrad.orderdemo.online',
      },
    ],
  )

  return {
    cities,
  }
})
