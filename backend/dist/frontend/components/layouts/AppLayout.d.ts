import { ReactNode } from "react";
declare type Props = {
    children: ReactNode;
    isSignup?: boolean;
};
declare const AppLayout: ({ children, isSignup }: Props) => JSX.Element;
export default AppLayout;
