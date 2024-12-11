import './Footer.css'
import { BsCaretUpSquareFill } from "react-icons/bs";

export const Footer = () => {
    return (
        <footer>
            <span>
                Developed by
                <a
                    className="github-logo"
                    href="https://mattsteen14.github.io/portfolio/"
                    target="_blank"
                    rel="noreferrer"
                >
                    Matt Steen-Brookes
                </a>
                . Powered by
                <a
                    className="rawg-logo"
                    href="https://www.rawg.io/"
                    target="_blank"
                    rel="noreferrer"
                >
                    RAWG
                </a>
            </span>
            <a>
                <BsCaretUpSquareFill
                    className="top-arrow"
                    onClick={() => window.scrollTo(0, 0)}
                />
            </a>
        </footer>
    )
}