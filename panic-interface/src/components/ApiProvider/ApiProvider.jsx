import React from 'react'

const ApiContext = React.createContext(null)

export const useApi = () => React.useContext(ApiContext)

export const ApiProvider = ({ children, api }) => {
  return (<ApiContext.Provider value={api}>
    {api ? (
      children
    ) : (
      <div>
        <span>Loading app ...</span>
      </div>
    )}
  </ApiContext.Provider>)
}

