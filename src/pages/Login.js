const Login = ({onSubmitFormLogin}) => {
    return (
        <main className="loginMain">
            <form >
                <input type="user" id="userName" name="userName" />
                <button type="submit" onClick={onSubmitFormLogin}>Prijava</button>
            </form>
        </main>
    )
}

export default Login;