import './Footer.css'
import { BsCaretUpSquareFill } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer>
                <a
                    className="rawg-logo"
                    href="https://www.rawg.io/"
                    target="_blank"
                    rel="noreferrer"
                >
                    RAWG
                </a>
                <a
                    className="github-logo"
                    href="https://github.com/mattsteen14/hall-of-game"
                    target="_blank"
                    rel="noreferrer"
                >
                <FaGithub />
                </a>
            <a>
                <BsCaretUpSquareFill
                    className="top-arrow"
                    onClick={() => window.scrollTo(0, 0)}
                    aria-label="Back to top"
                />
            </a>
        </footer>
    )
}