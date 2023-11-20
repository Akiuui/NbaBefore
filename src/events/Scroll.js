let prevBottomAction = null

const ScrollListener = (FetchData, date, pages, setShowLoadingCircle) => {

    if (prevBottomAction)
        document.removeEventListener("scroll", prevBottomAction);

    setShowLoadingCircle(true)

    let page = 2;
    let hasFired = false;

    document.addEventListener("scroll", BottomAction);
    prevBottomAction = BottomAction

    async function BottomAction() {

        let documentHeight = document.body.scrollHeight;
        let currentScroll = window.scrollY + window.innerHeight;
        let modifier = 200;

        if (currentScroll + modifier > documentHeight && !hasFired) {

            if (page > pages) {
                document.removeEventListener("scroll", BottomAction);

                setShowLoadingCircle(false)
            } else {

                hasFired = true;

                FetchData(date, page, false)

                setTimeout(() => hasFired = false, [100])

            }

            page++;

        }

    };

};

export default ScrollListener;