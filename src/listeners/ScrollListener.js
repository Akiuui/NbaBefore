import GetGames from "../controllers/FormatGames"

function ScrollListener(date) {

    let page = 2
    let hasFired = false

    document.addEventListener('scroll', async () => {

        let documentHeight = document.body.scrollHeight;
        let currentScroll = window.scrollY + window.innerHeight;
        // When the user is [modifier]px from the bottom, fire the event.
        let modifier = 0;

        if (currentScroll + modifier > documentHeight && !hasFired) {
            //This code executes every time we scroll to the bottom

            hasFired = true
            page++

            console.log("Dole si")

            const gamesWithDifferentPage = await GetGames(date, page)
            console.log(gamesWithDifferentPage)
            page++

        }
    });
}

export default ScrollListener;