import React from 'react'
import styles from './about.module.scss'
import type { langType } from '../../../types/lang.types'
import { text_hello } from '../../../data/text_hello'

function About({ params }: { params: { lang: langType }}) {
    if(params.lang === 'eng') {
        return (
            <main className={styles.page}>
                <h1>{text_hello.eng}</h1>
            </main>
        )
    }
    if(params.lang === 'fra') {
        return (
            <main className={styles.page}>
                <h1>{text_hello.fra}</h1>
            </main>
        )
    }
    if(params.lang === 'ukr') {
        return (
            <main className={styles.page}>
                <h1>{text_hello.ukr}</h1>
            </main>
        )
    }
}

export default About;

