type UserStatut = "Ms" | "Berger" | "Potentiel Berger" | "Pasteur";

export interface UserProfile {
  id: number;
  statut: UserStatut;
  image: string | null;
}
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  last_login: string;
  is_staff: boolean;
  is_active: boolean;
  profil: UserProfile | null;
  bacenters: {id: number, name: string , quarter: string}[]; 
  church: {
    id: number, 
    name: string, 

  }
}
