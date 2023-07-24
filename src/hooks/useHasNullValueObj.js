export default function useNullHasValueObj(obj) {
    return Object.values(obj).includes(null);
}
