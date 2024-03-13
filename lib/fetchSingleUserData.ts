
export const fetchSingleUserData = async(userId: number) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    if( !response.ok ) throw new Error('Data from server is broken')
    return  response.json()
}