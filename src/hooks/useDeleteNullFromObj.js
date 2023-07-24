export default function useDeleteNullFromObj(obj) {

    for (const key in obj) {
        if (obj[key] === null) {
            delete obj[key];
        }
    }
}