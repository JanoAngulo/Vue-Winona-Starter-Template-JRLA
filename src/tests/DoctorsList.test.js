import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import DoctorsList from '../components/DoctorsList.vue'

describe('DoctorsList.vue', () => {
  it('renders a list of doctors', () => {
    const doctors = [
      { id: '1', firstName: 'Laura', lastName: 'Brown', state: 'NY' },
      { id: '2', firstName: 'Michael', lastName: 'Jones', state: 'MI' },
    ]

    // Create a mock router
    const router = createRouter({
      history: createWebHistory(),
      routes: [],
    })

    const wrapper = mount(DoctorsList, {
      props: { doctorsList: doctors },
      global: {
        plugins: [router],
      },
    })

    const doctorItems = wrapper.findAll('li.list-row')
    expect(doctorItems.length).toBe(doctors.length)
    expect(doctorItems[0].text()).toContain('Dr. Laura Brown')
    expect(doctorItems[1].text()).toContain('Dr. Michael Jones')
  })
})
