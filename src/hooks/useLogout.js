import { useAuthContext } from './useAuthContext'
import { useWorkoutsContext } from './useWorkoutsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  //when you have to import state twice you should assign the  different name or value to it
  const { dispatch: workoutDispatch } = useWorkoutsContext()
  const logout = () => {
    //remove user from local storage

    localStorage.removeItem('user')

    //dispatch logout action
    dispatch({ type: 'LOGOUT' })
    workoutDispatch({ type: 'SET_WORKOUTS', payload: null })
  }

  return { logout }
}
