//
export type ToastObjectType =
  | {
      message: string;
      duration: number | null;
      title: string | null;
      type: string | null;
    }
  | any;
