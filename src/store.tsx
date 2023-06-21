import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AppState {
  EmailAddress: string;
  SetEmailAddress: (EmailAddress: string) => void;
  Fullname: string;
  SetFullname: (Fullname: string) => void;
  TokenId: string;
  SetTokenId: (TokenId: string) => void;
  Firstname: string;
  SetFirstname: (Firstname: string) => void;
  Submitting: boolean;
  SetSubmitting: (Submitting: boolean) => void;
  EmployeeId: string;
  SetEmployeeId: (EmployeeId: string) => void;
  Collapsed: boolean;
  SetCollapsed: (Collapsed: boolean) => void;
}

const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        EmailAddress: "",
        SetEmailAddress: (EmailAddress) =>
          set((state) => ({ ...state, EmailAddress })),
        Fullname: "",
        SetFullname: (Fullname) => set((state) => ({ ...state, Fullname })),
        TokenId: "",
        SetTokenId: (TokenId) => set((state) => ({ ...state, TokenId })),
        Firstname: "",
        SetFirstname: (Firstname) => set((state) => ({ ...state, Firstname })),
        Submitting: false,
        SetSubmitting: (Submitting) =>
          set((state) => ({ ...state, Submitting })),
        EmployeeId: "",
        SetEmployeeId: (EmployeeId) =>
          set((state) => ({ ...state, EmployeeId })),
        Collapsed: false,
        SetCollapsed: (Collapsed) => set((state) => ({ ...state, Collapsed })),
      }),
      { name: "appStore" }
    )
  )
);

export default useAppStore;
