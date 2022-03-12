const sortByPkmnId = (firstItem, secondItem) => {
    let firstItemPkmnId = parseInt(firstItem.getAttribute('data-pkmnid'));
    let secondItemPkmnId = parseInt(secondItem.getAttribute('data-pkmnid'));
    return (firstItemPkmnId > secondItemPkmnId ? 1 : -1);
}

export { sortByPkmnId };