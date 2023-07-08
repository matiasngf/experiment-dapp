import { useEffect } from "react"
import { gunDB, userDB } from "../db"
import { create } from 'zustand'

export interface User {
  username: string
}

export interface GunStore {
  user: User | null
  logout: () => void
}

export const useGunStore = create<GunStore>(() => ({
  user: null,
  logout: () => {
    userDB.leave()
    useGunStore.setState({ user: null })
  }
}))

export const useGun = () => {
  useEffect(() => {
    gunDB.on('auth', () => {
      userDB.get('alias').on(alias => {
        useGunStore.setState({ user: { username: alias } })
      })
    })
  }, [])
}