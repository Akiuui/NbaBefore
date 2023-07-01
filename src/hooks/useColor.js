function useColor(col, amt) {
    let num = parseInt(col, 16);
    let r = (num >> 16) + amt;
    let b = ((num >> 8) & 0x00FF) + amt;
    let g = (num & 0x0000FF) + amt;
    let newColor = g | (b << 8) | (r << 16);
    return newColor.toString(16);
}

export default useColor;
