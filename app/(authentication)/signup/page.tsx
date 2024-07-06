import SignUpForm from '../../../components/Forms/SignUpForm'
import '../auth-page.scss'

async function Signup() {
    return (
        <section className='container'>
            <SignUpForm/>
        </section>
    )
}

export default Signup;