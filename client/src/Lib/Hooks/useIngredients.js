import * as React from 'react'
import Http from '../Http'
import Ingredients from '../Ingredients'

const IngredientService = new Ingredients(Http)

const IngredientsContext = React.createContext([])

export function useIngredients() {
  return React.useContext(IngredientsContext)
}

export function IngredientsProvider({ children }) {
  const [ingredients, setIngredients] = React.useState([])

  React.useEffect(() => {
    IngredientService.getAll().then(setIngredients)
  }, [])

  return (
    <IngredientsContext.Provider value={ingredients}>
      {children}
    </IngredientsContext.Provider>
  )
}
