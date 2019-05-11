$.getJSON("/articles", function (data) {
    for (var i = 0; i < data.length; i++) {
        $("#articles").append("<i class='far fa-newspaper'></i><b><p data-id='" + data[i]._id + "'>" + data[i].title + "<br /></b>" + data[i].link + "</p>");
    }
});

$(document).on("click", "p", function () {
    $("#notes").empty();
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        .then(function (data) {
            console.log(data);
            $("#notes").append("<h2>" + data.title + "</h2>");
            $("#notes").append("<input id='titleinput' name='title' ><br>");
            $("#notes").append("<div class='form-group mt-3 mb-3'><textarea id='bodyinput' name='body' class='form-control'style='max-width: 50%'></textarea></div><br>");
            $("#notes").append("<button class='btn btn-primary' data-id='" + data._id + "' id='savenote'>Save Comment</button><br>");
            if (data.note) {
                $("#titleinput").val(data.note.title);
                $("#bodyinput").val(data.note.body);
            }
        });
});

$(document).on("click", "#savenote", function () {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    })
        .then(function (data) {
            console.log(data);
            $("#notes").empty();
        });
    $("#titleinput").val("");
    $("#bodyinput").val("");
});
