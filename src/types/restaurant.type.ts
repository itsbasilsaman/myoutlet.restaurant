export interface TableType {
  id: string;
  table_name: string;
  seat_count: number;
  qrcode?: string;
  created_at?: string;
  updated_at?: string;
  is_active?: boolean;
  store_id?: string;
}

export interface StoreType {
  id: string;
  name: string;
  subdomain: string;
  qrcode: string;
  currency: string;
  language: string;
  is_active: boolean;
  google_sheet_id: string;
  custom_domain: string | null;
  created_at: string;
  updated_at: string;
  owner_id: string;
  parent_store_id: string;
  theme: {
    mode: "light" | "dark";
    color: {
      primary: string;
      secondary?: string;
    };
  };
}
