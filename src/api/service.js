import { METHOD } from "./base";

export const services = () => ({
  path: 'v1/services',
  method: METHOD.GET
});

export const workShiftsCount = (id) => ({
  path: `v1/services/${id}/work_shifts_count`,
  method: METHOD.GET
});

export const workShifts = (id, date) => ({
  path: `v1/services/${id}/work_shifts?date=${date}`,
  method: METHOD.GET
});
