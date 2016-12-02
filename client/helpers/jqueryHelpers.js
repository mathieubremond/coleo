// Helpers JQuery
export function selectItem(id) {
    $(id).addClass("selected");
}
export function unselectItem(id) {
    $(id).removeClass("selected");
}
export function checkItem(id) {
    $(id).prop('checked', true);
}
export function uncheckItem(id) {
    $(id).prop('checked', false);
}