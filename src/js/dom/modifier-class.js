const getModifierClass = (element, modifier) => {
    const elementClasses = element.className.split(" ");
    
    let modifierClass = elementClasses.find(
        cssClass => {
            if(cssClass.includes(`--${modifier}`)) return cssClass;
        }
    );
        
        return modifierClass;
    }
    
const toggleModifierClass = (element, modifier) => {
    let modifierClass = getModifierClass(element, modifier);

    if(!modifierClass) {
        modifierClass = `${element.classList[0]}--${modifier}`
    }

    element.classList.toggle(modifierClass);
}

export { getModifierClass, toggleModifierClass };