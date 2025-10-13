function useFindContrast(color1, color2) { //HEX

    const getLuminance = (color) => {
        const adjustColor = (value) => {
            value = value / 255;
            return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
        };

        const [r, g, b] = color.match(/\w\w/g).map(x => parseInt(x, 16));
        const RsRGB = adjustColor(r);
        const GsRGB = adjustColor(g);
        const BsRGB = adjustColor(b);
        return 0.2126 * RsRGB + 0.7152 * GsRGB + 0.0722 * BsRGB;
    };

    const luminance1 = getLuminance(color1);
    const luminance2 = getLuminance(color2);

    const contrastRatio = (Math.max(luminance1, luminance2) + 0.05) / (Math.min(luminance1, luminance2) + 0.05);
    return contrastRatio.toFixed(2); // Return contrast ratio rounded to 2 decimal places
}

export default useFindContrast