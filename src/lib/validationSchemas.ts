import * as Yup from 'yup';

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});
export const AddRouteSchema = Yup.object({
  name: Yup.string().required(),
  color: Yup.string().optional(),
  path: Yup.array().of(Yup.object({
    lat: Yup.number().required(),
    lng: Yup.number().required(),
  })),
  start: Yup.object({
    lat: Yup.number().required(),
    lng: Yup.number().required(),
  }).optional(),
  end: Yup.object({
    lat: Yup.number().required(),
    lng: Yup.number().required(),
  }).optional(),
});
