var $ = jQuery;

var addButton = $("body > div > button");
var textEntry = $("#item");
var tableau = $("body > ul");

$(document).ready(() => {
    addButton.on("click", () => {
        if (textEntry.val() != "") {
            tableau.append("<li>" + textEntry.val() + "<button>Delete line</button></li>");
            textEntry.val("");
            $("ul > li > button").bind("click", (e) => {
                $(e.currentTarget).parent().remove();
            })
        }
    });
});