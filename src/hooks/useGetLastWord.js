function useGetLastWord(string) {

    let short = string.split(" ")
    short = short[short.length - 1]

    return short
}

export default useGetLastWord;
