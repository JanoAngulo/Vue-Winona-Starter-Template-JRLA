/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import DashboardView from '../views/DashboardView.vue';

describe('DashboardView Tests', () => {
  it('should render the component', () => {
    const wrapper = mount(DashboardView);
    expect(wrapper.exists()).toBe(true);
  });

  it('should display error message on API failure', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      })
    );

    const wrapper = mount(DashboardView);
    await new Promise(resolve => setTimeout(resolve, 0)); // Wait for onMounted to resolve

    expect(wrapper.text()).toContain('Error: 500 Internal Server Error');
    vi.restoreAllMocks();
  });

  it('should display unauthorized message on 401 response', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
      })
    );

    const wrapper = mount(DashboardView);
    await new Promise(resolve => setTimeout(resolve, 0)); // Wait for onMounted to resolve

    expect(wrapper.text()).toContain('Unauthorized access. Please log in again.');
    vi.restoreAllMocks();
  });

  it('should populate doctorsList on successful API response', async () => {
    const mockData = [{ id: 1, name: 'Dr. Smith' }, { id: 2, name: 'Dr. Doe' }];
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const wrapper = mount(DashboardView);
    await new Promise(resolve => setTimeout(resolve, 0)); // Wait for onMounted to resolve

    const doctorsListComponent = wrapper.findComponent({ name: 'DoctorsList' });
    expect(doctorsListComponent.exists()).toBe(true);
    expect(doctorsListComponent.props('doctorsList')).toEqual(mockData);
    vi.restoreAllMocks();
  });
});