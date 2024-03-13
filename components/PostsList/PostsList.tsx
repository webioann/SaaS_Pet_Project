import React from 'react'
import style from './posts.module.scss'
import type { IPost } from '../../types/post.types'

type Props = {
    data: Promise<IPost[]>
} 

export default async function PostsList({ data }: Props) {

    const posts = await data

    return (
        <main>
            <ul className={style.list}>
                {posts.map(post => (
                    <li key={post.id} className={style.post}>
                        <h3 className={style.title}>{post.title}</h3>
                        <article>{post.body}</article>
                    </li>
                ))}
            </ul>
        </main>
    )
};
