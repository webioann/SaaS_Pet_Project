type ResivedDataType ={
    user: {
        name: string
        email: string
        image: string
    }
    expire: string
}

export type SessionType = {
    data: ResivedDataType | null | undefined
    status: 'authenticated' | 'loading' | 'unauthenticated'
    update: (data: ResivedDataType) => ResivedDataType
}