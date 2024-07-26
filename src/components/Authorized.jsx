import { Navigate, Outlet } from "react-router-dom"
import { Navigation } from "./Navigation.jsx"

export const Authorized = () => {
  if (localStorage.getItem("chore_token")) {
    return <>
      <Navigation />
      <main className="p-4">
        <Outlet />
      </main>
    </>
  }
  return <Navigate to='/login' replace />
}
