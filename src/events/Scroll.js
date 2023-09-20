
const ScrollListener = (FetchData, date, pages, setShowLoadingCircle) => {

    // console.log("Skinuli smo eventListener")
    document.removeEventListener("scroll", BottomAction);

    setShowLoadingCircle(true)

    let page = 2;
    let hasFired = false;

    async function BottomAction() {

        console.log("Skrol")
        let documentHeight = document.body.scrollHeight;
        let currentScroll = window.scrollY + window.innerHeight;
        let modifier = 200;

        if (currentScroll + modifier > documentHeight && !hasFired) {

            console.log("Fetcuje se novi apge apiaja")

            if (page > pages) {
                document.removeEventListener("scroll", BottomAction);

                console.log("Event Listener je skinut")

                setShowLoadingCircle(false)
            } else {

                hasFired = true;

                FetchData(date, page, false)

                setTimeout(() => hasFired = false, [500])

            }

            page++;

        }

    };




    document.addEventListener("scroll", BottomAction);
    // console.log("Event Listener je dodat")




};

export default ScrollListener;