// type for Sign up form
export type SignUpFormDataType = {
    name: string
    email: string
    password: string
}

// for Login form data type
export type LoginFormDataType = Omit<SignUpFormDataType, 'name'>

// types for authorize credentials in options.ts
export type CredentialsType = {
    name: string;
    email: string;
    password: string;
}

export type newUser = {
    email: string;
    image: string;
    name: string;
}
export type PassedDataType = {
    name: string
    email: string
    password: string | null
    image: string
    provider: 'google' | 'credentials'
}
