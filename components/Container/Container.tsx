import { ReactNode} from 'react'

const Container = ({ width, children }: { children: ReactNode; width: number }) => {
    
    return (
        <div style={{
            width: '100%',
            maxWidth: `${width}px`,
            marginLeft: 'auto',
            marginRight: 'auto',
            height: '100%',
            position: 'relative',
            padding: '0 1rem'
        }}>
            { children }
        </div>
    )
}

export default Container;