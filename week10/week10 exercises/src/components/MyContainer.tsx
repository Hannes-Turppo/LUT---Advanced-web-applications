import { useTranslation } from "react-i18next"


function MyContainer() {
    // set up translation
    const {t} = useTranslation()


    return (
        <div>{t("This is the front page")}</div>
    )
}

export default MyContainer