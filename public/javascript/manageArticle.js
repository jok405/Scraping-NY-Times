function deletenote(thisArticle) {
    const data = {
        "_id": thisArticle
    };
    console.log(data);
    $.ajax({
        type: "DELETE",
        url: "/deletenote",
        data,
        success(data, textStatus) {
            $(`#${thisArticle}`).remove();
        }
    })
}

$(document).ready(() => {
    $('.slider').slider();
    $(".button-collapse").sideNav();
    $('.modal').modal();


    $(document).on('click', '.save-button', function () {
        const thisArticle = $(this).attr("id");
        const summary = $(`#summary-${thisArticle}`).text();
        const title = $(`#title-${thisArticle}`).text();
        const link = $(`#link-${thisArticle}`).attr('href');
        const byline = $(`#byline-${thisArticle}`).text();
        const data = {
            "id": thisArticle,
            "summary": summary,
            "title": title,
            "link": link,
            "byline": byline
        };
        $.ajax({
            type: "POST",
            url: "/save",
            data,
            dataType: "json",
            success(data, textStatus) {
                console.log(data);
            }
        });
    });

    $(document).on('click', '.delete-button', function () {
        const thisArticle = $(this).attr("id");
        const summary = $(`#summary-${thisArticle}`).text();
        const title = $(`#title-${thisArticle}`).text();
        const link = $(`#link-${thisArticle}`).attr('href');
        const byline = $(`#byline-${thisArticle}`).text();
        const data = {
            "_id": thisArticle
        };
        $.ajax({
            type: "DELETE",
            url: "/delete",
            data,
            success(data, textStatus) {
                $(`#main-${thisArticle}`).remove();
            }
        })
    });


    $(document).on("click", ".create-note", function (data) {
        $("#savenote").attr("data-id", $(this).attr("data-id"));
        let aid = $(this).attr("data-id");
        let title = `Notes for the Article: ${aid}`;
        $("#display-title").empty();
        $("#display-title").text(title);
        $("#textarea1").val("");
        $.getJSON(`/notes/${aid}`, data => {
            if (data.length) {
                console.log(data);
                let notetext = `Notes: ${data[0].body}`;
                $("#display-note").empty();
                let noteList = $("<ul>");
                noteList.addClass("collection with-header");
                let hli = $("<li>");
                hli.addClass("collection-header")
                hli.text("Notes");
                noteList.append(hli);

                for (let i = 0; i < data.length; i++) {
                    let ili = $("<li>");
                    ili.attr("id", data[i]._id);
                    ili.addClass("collection-item");
                    let idiv = $("<div>");
                    idiv.text(data[i].body);
                    let adelete = $("<a>");
                    adelete.addClass("secondary-content");
                    adelete.attr("note-id", data[i]._id);
                    adelete.attr("href", "#");
                    adelete.attr("onclick", `deletenote("${data[i]._id}")`);
                    let xdelete = $("<i>");
                    xdelete.addClass("material-icons");
                    xdelete.attr("note-id", data[i]._id);
                    xdelete.html("delete");
                    adelete.append(xdelete);
                    idiv.append(adelete);
                    ili.append(idiv);
                    noteList.append(ili);
                }
                $("#display-note").append(noteList);
            }
        });
    });

    $(document).on("click", "#savenote", function () {
        const thisArticle = $(this).attr("data-id");
        const text = $("#textarea1").val();
        console.log(thisArticle);

        $.ajax({
            type: "POST",
            url: "/notes",
            data: {
                "article_id": thisArticle,
                "body": text
            },
            success(data, textStatus, jqXHR) {
                console.log(data);
                $("#textarea1").val("");
            }
        });
    });

    $(document).on("click", "#deletenote", () => {

        $.ajax({
            type: "DELETE",
            url: "/deletenote",
            data,
            success(data, textStatus) {
                $("#display-note").remove();
            }
        });
    });
});