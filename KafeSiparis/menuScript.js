$(document).ready(function () {
  var menu = [];
  $(".container").append('<ul id="menu" class="list-group">');
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/parents",
    async: false,
    success: function (parents, status) {
      if (status == "success") {
        $.each(parents, function (index) {
          $("#staticTur").append(
            `<option value="${this.id}">${this.name.toUpperCase()}</option>`
          );
          menu.push(
            `<li class="list-group-item active">${this.name.toUpperCase()}</li>`
          );
          let parentId = this.id;
          $.ajax({
            method: "GET",
            url: `http://localhost:3000/menus?parent=${parentId}`,
            async: false,
          }).done(function (menus, status) {
            $.each(menus, function (index) {
              menu.push(`<li class="list-group-item d-flex justify-content-between align-items-center" style="text-transform: capitalize;">
              <img src="${this.img}" class="menu-img rounded"/>
              ${this.type}
              <span class="badge badge-primary badge-pill" style="text-transform:capitalize;">${this.price}</span>
              </li>`);
            });
          });
        });
      }
    },
  }).fail(function () {
    alert("Server does not response. Try again later");
  });
  $("#menu").append(menu);

  $("#urunKaydet").on("click", function () {
    var dataToPost = JSON.stringify($("#urunEkleForm").serializeToJSON());
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/menus",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: dataToPost,
      success: function () {
        alertify.success("Ürün başarıyla eklendi.");
      },
    }).fail(function () {
      alertify.error("Ürün eklenemedi.");
    });
  });
  $("#myModal").on("shown.bs.modal", function () {
    $("#myInput").trigger("focus");
  });
});
