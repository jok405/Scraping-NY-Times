function showBookmarked() {
    $.getJSON("/saved/all", data => {
        $("#nyt-0").empty();
        $("#nyt-1").empty();
        $("#nyt-2").empty();
        $("#total-number").text(data.length);
        for (let i = 0; i < data.length; i++) {
            const globalDiv = $("<div>");
            globalDiv.addClass("card grey lighten-2");
            globalDiv.attr("id", `main-${data[i]._id}`);
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
            a.text("Go to the article");
            manageCard.append(a);
            const button = $("<a>");
            button.addClass("waves-effect waves-light white btn create-note modal-trigger");
            button.attr("data-id", data[i]._id);
            button.attr("data-target", "notes");
            button.text("Create Notes");
            const deleteArticle = $("<a>");
            deleteArticle.addClass("waves-effect waves-light white btn delete-button");
            deleteArticle.attr("id", data[i]._id);
            deleteArticle.text("Delete");
            const byline = $("<p>");
            byline.text(data[i].byline);
            manageCard.append(byline);
            manageCard.append(button);
            manageCard.append(deleteArticle);
            globalDiv.append(contentCard);
            globalDiv.append(manageCard);

            $(`#nyt-${String(i % 3)}`).append(globalDiv);
        }
    });
}

