import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import DoctorsDetailPage from '../components/DoctorsDetailPage.vue'

describe('DoctorsDetailPage', () => {
  it('renders properly', () => {
    const wrapper = mount(DoctorsDetailPage, {
      global: {
        mocks: {
          $route: {
            query: {
              id: '12345',
              firstName: 'John',
              lastName: 'Doe',
              state: 'CA',
              dob: '1980-01-01',
              licenseActive: 'true',
              signedUpDate: '2025-01-01',
            },
          },
        },
      },
    })

    expect(wrapper.find('div.text-2xl').text()).toBe('Doctor Details')
    expect(wrapper.find('input[readonly][value="John"]').exists()).toBe(false)
    expect(wrapper.find('input[readonly][value="Doe"]').exists()).toBe(false)
    expect(wrapper.find('input[readonly][value="CA"]').exists()).toBe(false)
    expect(wrapper.find('input[readonly][value="1980-01-01"]').exists()).toBe(false)
    expect(wrapper.find('input[readonly][value="Active"]').exists()).toBe(false)
    expect(wrapper.find('input[readonly][value="2025-01-01"]').exists()).toBe(false)
  })
})
