export interface UserLogin {
  username: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  age: number;
  phone: string;
  email: string;
  area: string;
  education: {
    school_name: string;
    school_time: string[];
    school_degree: string;
  }[];
  work: string;
  skill: string[];
  info: string;
}
