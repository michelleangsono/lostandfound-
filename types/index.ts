export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    rightElement?: React.ReactNode;
    error?: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline';
    icon?: React.ReactNode;
}