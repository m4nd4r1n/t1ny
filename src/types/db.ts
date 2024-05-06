export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      analytics: {
        Row: {
          browser: string | null;
          country: string | null;
          created_at: string;
          device: string | null;
          id: string;
          ip_address: string | null;
          os: string | null;
          url_id: string;
          user_agent: string | null;
        };
        Insert: {
          browser?: string | null;
          country?: string | null;
          created_at?: string;
          device?: string | null;
          id?: string;
          ip_address?: string | null;
          os?: string | null;
          url_id: string;
          user_agent?: string | null;
        };
        Update: {
          browser?: string | null;
          country?: string | null;
          created_at?: string;
          device?: string | null;
          id?: string;
          ip_address?: string | null;
          os?: string | null;
          url_id?: string;
          user_agent?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'analytics_url_id_fkey';
            columns: ['url_id'];
            isOneToOne: false;
            referencedRelation: 'urls';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          avatar: string | null;
          created_at: string;
          name: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          avatar?: string | null;
          created_at?: string;
          name: string;
          updated_at?: string;
          user_id?: string;
        };
        Update: {
          avatar?: string | null;
          created_at?: string;
          name?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      url_limit: {
        Row: {
          day_limit: number;
          total_limit: number;
          user_id: string;
        };
        Insert: {
          day_limit?: number;
          total_limit?: number;
          user_id?: string;
        };
        Update: {
          day_limit?: number;
          total_limit?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'url_limit_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      urls: {
        Row: {
          clicks: number;
          created_at: string;
          id: string;
          target_description: string | null;
          target_favicon: string;
          target_og_image: string | null;
          target_title: string | null;
          target_url: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          clicks?: number;
          created_at?: string;
          id: string;
          target_description?: string | null;
          target_favicon: string;
          target_og_image?: string | null;
          target_title?: string | null;
          target_url: string;
          updated_at?: string;
          user_id?: string;
        };
        Update: {
          clicks?: number;
          created_at?: string;
          id?: string;
          target_description?: string | null;
          target_favicon?: string;
          target_og_image?: string | null;
          target_title?: string | null;
          target_url?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'urls_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      user_role: {
        Row: {
          role: Database['public']['Enums']['role'];
          user_id: string;
        };
        Insert: {
          role?: Database['public']['Enums']['role'];
          user_id?: string;
        };
        Update: {
          role?: Database['public']['Enums']['role'];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_role_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_analytics_count_by_day: {
        Args: {
          userid: string;
        };
        Returns: {
          count: number;
          date: string;
        }[];
      };
      get_analytics_count_by_day_with_id: {
        Args: {
          userid: string;
          urlid: string;
        };
        Returns: {
          count: number;
          date: string;
        }[];
      };
      get_analytics_count_by_month: {
        Args: {
          userid: string;
        };
        Returns: {
          count: number;
          date: string;
        }[];
      };
      get_analytics_count_by_month_with_id: {
        Args: {
          userid: string;
          urlid: string;
        };
        Returns: {
          count: number;
          date: string;
        }[];
      };
      get_browsers_by_id: {
        Args: {
          userid: string;
          urlid: string;
        };
        Returns: {
          count: number;
          browser: string;
        }[];
      };
      get_countries_by_id: {
        Args: {
          userid: string;
          urlid: string;
        };
        Returns: {
          count: number;
          country: string;
        }[];
      };
      get_devices_by_id: {
        Args: {
          userid: string;
          urlid: string;
        };
        Returns: {
          count: number;
          device: string;
        }[];
      };
      get_oss_by_id: {
        Args: {
          userid: string;
          urlid: string;
        };
        Returns: {
          count: number;
          os: string;
        }[];
      };
    };
    Enums: {
      role: 'user' | 'admin';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
