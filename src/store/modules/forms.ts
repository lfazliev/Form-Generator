import type { Module } from 'vuex'
import type { FormValues } from '@/types/forms'

interface FormsState {
  savedForms: Record<string, FormValues>
}

const forms: Module<FormsState, any> = {
  namespaced: true,
  state: () => ({
    savedForms: {},
  }),
  mutations: {
    SAVE_FORM(
      state,
      { formId, values }: { formId: string; values: FormValues }
    ) {
      state.savedForms[formId] = { ...values }
    },
    CLEAR_FORM(state, formId: string) {
      delete state.savedForms[formId]
    },
  },
  actions: {
    saveForm(
      { commit },
      { formId, values }: { formId: string; values: FormValues }
    ) {
      commit('SAVE_FORM', { formId, values })
    },
    clearForm({ commit }, formId: string) {
      commit('CLEAR_FORM', formId)
    },
  },
  getters: {
    getFormValues: (state) => (formId: string) => {
      return state.savedForms[formId] || {}
    },
    getAllForms: (state) => {
      return state.savedForms
    },
  },
}

export default forms
