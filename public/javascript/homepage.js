function scrapeResult() {
    $.getJSON("/scrape", scrape_code => {
        if (scrape_code.code == "success") {
            $.getJSON("/articles", data => {
                $("#nyt-0").empty();
                $("#nyt-1").empty();
                $("#nyt-2").empty();
                $("#total-number").text(data.length);
                for (let i = 0; i < data.length; i++) {
                    const globalDiv = $("<div>");
                    globalDiv.addClass("card grey lighten-2");
                    const contentCard = $("<div>");
                    contentCard.addClass("card-content black-text");
                    const cardTitle = $("<span>");
                    cardTitle.addClass("card-title");
                    cardTitle.attr("data-id", data[i]._id);
                    cardTitle.attr("id", `title-${data[i]._id}`);
                    cardTitle.text(data[i].title);
                    const p = $("<p>");
                    p.text(data[i].summary);
                    p.attr("id", `summary-${data[i]._id}`);
                    contentCard.append(cardTitle);
                    contentCard.append(p);
                    const manageCard = $("<div>");
                    manageCard.addClass("card-action");
                    const a = $("<a>");
                    a.attr("href", data[i].link);
                    a.attr("id", `link-${data[i]._id}`);
                    a.text("View article");
                    manageCard.append(a);
                    const bookmarkArticle = $("<a>");
                    bookmarkArticle.addClass("waves-effect waves-light btn save-button");
                    bookmarkArticle.attr("id", data[i]._id);
                    bookmarkArticle.text("Bookmark Article");
                    const byline = $("<p>");
                    byline.text(data[i].byline);
                    byline.attr("id", `byline-${data[i]._id}`);
                    manageCard.append(byline);
                    manageCard.append(bookmarkArticle);
                    globalDiv.append(contentCard);
                    globalDiv.append(manageCard);
                    $(`#nyt-${String(i % 3)}`).append(globalDiv);
                }
            });
        }
   });
}

$(document).ready(() => {
    $('.slider').slider();
    $(".button-collapse").sideNav();
    $('.modal').modal();
});