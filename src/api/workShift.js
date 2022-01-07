import { METHOD } from "./base";

export const createWorkShift = (id, content) => ({
  path: `v1/services/${id}/work_shifts`,
  method: METHOD.POST,
  content
});

export const deleteWorkShift = (id) => ({
  path: `v1/work_shifts/${id}`,
  method: METHOD.DELETE
});
