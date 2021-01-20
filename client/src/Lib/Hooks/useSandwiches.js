import * as React from 'react'
import Http from '../Http'
import Sandwiches from '../Sandwiches'
import { useIngredients } from './useIngredients'

const SandwichesContext = React.createContext([])

const SandwichesService = new Sandwiches(Http)

export function useSandwiches() {
  return React.useContext(SandwichesContext)
}

export function SandwichesProvider({ children }) {
  const ingredients = useIngredients()
  const [sandwiches, setSandwiches] = React.useState([])

  React.useEffect(() => {
    SandwichesService.getAll(ingredients).then(setSandwiches)
  }, [ingredients])

  return (
    <SandwichesContext.Provider value={sandwiches}>
      {children}
    </SandwichesContext.Provider>
  )
}
