import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import { fetchSingleUserData } from '../../../lib/fetchSingleUserData'
import { fetchSingleUserPosts } from '../../../lib/fetchSingleUserPosts' 
import PostsList from '../../../components/PostsList/PostsList'
import type { IUser } from '../../../types/user.types'
import type { IPost } from '../../../types/post.types'

export async function generateMetadata({ params }: { params: { userId: number }}): Promise<Metadata> {
    const userData: Promise<IUser> = fetchSingleUserData(params.userId)
    const user = await userData
    return {
        title: user.name,
        description: `This page of ${user.name}`
    }
}
    

export default async function SingleUserPage({ params }: { params: { userId: number }}) {

    const userData: Promise<IUser> = fetchSingleUserData(params.userId)
    const postsData: Promise<IPost[]> = fetchSingleUserPosts(params.userId)
    const user = await userData

    return (
        <main>
            <h1>{user.name} posts :</h1>
            <Suspense fallback={<h2>Loading ...</h2>}>
                <PostsList data={postsData}/>
            </Suspense>
        </main>
    )
}