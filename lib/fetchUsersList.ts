
export const fetchUsersList = async() => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    if( !response.ok ) throw new Error('Data from server is broken')
    return  response.json()
}