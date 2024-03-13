
export const fetchSingleUserPosts = async(userId: number) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    if( !response.ok ) throw new Error('Data from server is broken')
    return  response.json()
}