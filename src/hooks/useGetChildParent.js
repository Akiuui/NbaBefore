function useGetChildParent(clickedElement) { //The input is the event
    clickedElement = clickedElement.target
    //For this hook to work we need to give the parents id propery name: 'parentElement'  
    while (clickedElement) {

        if (clickedElement.id === "parentElement") {
            return clickedElement

        }

        clickedElement = clickedElement.parentElement;

    }

}

export default useGetChildParent;
