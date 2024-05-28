export interface Student {
    id: number;
    first_name: string;
    last_name: string;
    date_of_birth: Date;
    email: string;
    address: {
      street: string;
      state: string;
      city: string;
      pincode: number;
    };
    subjects: string[];
    previousEducation: {
      school: string;
      yearStart: Date;
      yearEnd: Date;
    }[];
  }
  
  
  
  