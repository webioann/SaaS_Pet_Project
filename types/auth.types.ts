// type for Sign up form
export type SignUpFormDataType = {
    name: string
    email: string
    password: string
}
// for Login form data type
export type LoginFormDataType = Omit<SignUpFormDataType, 'name'>
