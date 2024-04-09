//seat color change function
function addBackgroundColorById(elementId){
    const element = document.getElementById(elementId);
    element.classList.remove("bg-gray");
    element.classList.add("bg-[#1DD100]", "text-white");
}