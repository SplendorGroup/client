import crypto from 'crypto';

export class Client {
  id: string;
  full_name: string;
  user_id: string;
  cpf: string;
  cnh: string;
  email: string;
  phone_number: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  complement: string;
  number: number;
  created_at: Date;
  updated_at?: Date;

  constructor(props: Client, options?: { update?: boolean }) {
    Object.assign(this, props);

    if (!options?.update) {
      this.id = crypto.randomUUID();
      this.created_at = new Date();
    }
    this.updated_at = new Date();
  }
}
