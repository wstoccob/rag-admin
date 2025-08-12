export interface SupabaseError {
  message: string;
  details?: string | undefined;
  hint?: string | undefined;
  code?: string | undefined;
}

export type PossibleError =
  | {
      message?: string;
      details?: string;
      hint?: string;
      code?: string;
    }
  | Error
  | unknown;
