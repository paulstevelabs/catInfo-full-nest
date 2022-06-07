import { ReactNode } from "react";
export declare type MeType = {
    id: string;
    email: string;
    name: string;
    imgUrl?: string;
    token?: string;
};
declare type ContextType = {
    me: MeType | null;
    login: (me: MeType) => void;
    logout: () => void;
};
export declare const useAuth: () => ContextType;
declare type Props = {
    children: ReactNode;
};
export declare const AuthProvider: ({ children }: Props) => any;
export {};
