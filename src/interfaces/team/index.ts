import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TeamInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  team_lead_id?: number;
  performance_evaluation_frequency?: string;
  team_size?: number;
  team_budget?: number;
  team_performance_score?: number;
  team_objective?: string;
  team_vision?: string;
  team_morale_score?: number;
  team_productivity_score?: number;
  team_vacation_quota?: number;

  user?: UserInterface;
  _count?: {};
}

export interface TeamGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
  performance_evaluation_frequency?: string;
  team_objective?: string;
  team_vision?: string;
}
