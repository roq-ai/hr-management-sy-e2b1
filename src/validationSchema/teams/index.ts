import * as yup from 'yup';

export const teamValidationSchema = yup.object().shape({
  description: yup.string().nullable(),
  image: yup.string().nullable(),
  name: yup.string().required(),
  team_lead_id: yup.number().integer().nullable(),
  performance_evaluation_frequency: yup.string().nullable(),
  team_size: yup.number().integer().nullable(),
  team_budget: yup.number().nullable(),
  team_performance_score: yup.number().nullable(),
  team_objective: yup.string().nullable(),
  team_vision: yup.string().nullable(),
  team_morale_score: yup.number().nullable(),
  team_productivity_score: yup.number().nullable(),
  team_vacation_quota: yup.number().integer().nullable(),
  user_id: yup.string().nullable().required(),
});
