

const Header = () => {
    return(
        <section className="HContainer">
            <header>
                <nav>
                    <ul>
                        <li>로그인</li>
                        <li>회원가입</li>
                    </ul>
                </nav>
            </header>

            <style jsx>
                {`
                    .HContainer{
                        max-width: 1280px;
                    }
                `}
            </style>
        </section>
    )
}

export default Header;