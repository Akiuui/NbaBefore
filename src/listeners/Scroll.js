import React from "react";
import LoadingCircle from "../components/LoadingCircle";

const ScrollListener = (FetchData, date, pages, setShowLoadingCircle) => {

    let page = 2;
    let hasFired = false;

    console.log("DAte:", date)

    console.log("Ukupan broj strana ", pages)

    const BottomAction = async () => {

        let documentHeight = document.body.scrollHeight;
        let currentScroll = window.scrollY + window.innerHeight;
        let modifier = 10;

        if (currentScroll + modifier > documentHeight && !hasFired) {
            hasFired = true;

            console.log("Stigao si do dna")

            FetchData(date, page, false)
            console.log(page)

            setTimeout(() => hasFired = false, [1000])

            if (page == pages) {
                console.log("Cela se poruka upisala ")
                document.removeEventListener("scroll", BottomAction);
                setShowLoadingCircle(false)
            }
            page++;
        }

    };

    document.addEventListener("scroll", BottomAction);


};

export default ScrollListener;