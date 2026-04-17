import { Role } from "../enums/role.js";

// backend/types/interfaces/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  institutionId?: string;
  institutionIds?: string[];
  createdAt: Date;
}
