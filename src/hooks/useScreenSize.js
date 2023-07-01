
function useScreenSize() {
    let per_page
    if (screen.height <= 830)
        per_page = 3
    else if (screen.height <= 947)
        per_page = 4
    else if (screen.height <= 1240)
        per_page = 5

    if (screen.width >= 765)
        per_page = per_page * 2

    return per_page
}

export default useScreenSize;
