export function getGroup(groups: any[], property: string) {
    for (const group of groups) {
        const item = group.find((i: any) => i.id === property);
        if (item) {
            return item;
        }
    }
    return null;
}

export function updateChecked(groups: any[], property: string, value: boolean) {
    const groupItem = getGroup(groups, property);
    if (groupItem) {
        groupItem.checked = value;
    }
}
