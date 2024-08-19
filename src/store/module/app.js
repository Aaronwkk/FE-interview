import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      sideCollapsed: false,
      theme: 'dark',
    }
  },
  actions: {
    changeTheme() {
      this.theme = this.theme == 'light' ? 'dark' : 'light'
    },
    changeCollapsed() {
      this.sideCollapsed = !this.sideCollapsed
    }
  },
})
