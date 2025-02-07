import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

function Header() {
    // set up translation
    const {t, i18n} = useTranslation()
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng)
    }


    return (
        <header className="header">
            <h1>Header</h1>
            <nav>
                <ul>
                    <li><Link to="/">{t("Home")}</Link></li>
                    <li><Link to="/About">{t("About")}</Link></li>
                    <button onClick={()=>{changeLanguage("en")}}>EN</button>
                    <button onClick={()=>{changeLanguage("fi")}}>FI</button>
                </ul>
            </nav>
        </header>
    )
}

export default Header