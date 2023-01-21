import Link from "next/link";

const Header = () => {
  return (
    <section className="HContainer">
      <header>
        <nav>
          <ul>
            <Link href="/Login">
              <a>로그인</a>
            </Link>
            <Link href="/Signup">
              <a>회원가입</a>
            </Link>
          </ul>
        </nav>
      </header>

      <style jsx>
        {`
          ul,
          li {
            list-style: none;
          }

          a,
          a:visited,
          a:link,
          a:active {
            color: #000;
            text-decoration: none;
          }

          .HContainer {
            max-width: 1280px;
          }

          header > nav > ul {
            display: flex;
            flex-direction: column;
            margin: 0;
            padding: 0;
          }
        `}
      </style>
    </section>
  );
};

export default Header;
