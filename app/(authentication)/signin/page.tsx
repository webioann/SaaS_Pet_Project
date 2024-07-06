import { redirect } from "next/navigation";

function Signin() {
    redirect('/signup')
    return (
        <div>page</div>
    )
}

export default Signin;