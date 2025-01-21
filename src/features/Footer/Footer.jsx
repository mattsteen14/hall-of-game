import './Footer.css'
import { BsCaretUpSquareFill } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    return (
        <footer>
            <a
                className="rawg-logo"
                href="https://www.rawg.io/"
                target="_blank"
                rel="noopener noreferrer"
                role='link'
                aria-label="RAWG website"
                name="RAWG website"
                title="RAWG website"
                tabIndex={0}
            >
                RAWG
            </a>
            <a
                className="github-logo"
                href="https://github.com/mattsteen14/hall-of-game"
                target="_blank"
                rel="noreferrer"
                role='link'
                aria-label="Hall of Game GitHub repository"
                name="Hall of Game GitHub repository"
                title="Hall of Game GitHub repository"
                tabIndex={0}
            >
                <FaGithub />
            </a>
            <a>
                <BsCaretUpSquareFill
                    role='link'
                    className="top-arrow"
                    onClick={scrollToTop}
                    href='#'
                    aria-label="Back to top"
                    name="Back to top"
                    tabIndex={0}
                />
            </a>
        </footer>
    )
}