function getUrlVars() {
  var vars = [],
    hash;
  var hashes = window.location.href
    .slice(window.location.href.indexOf("?") + 1)
    .split("&");
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split("=");
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

$(document).ready(function () {
  $("form").submit(function (event) {
    event.preventDefault();

    const password = $(".password-input").val();
    const password_again = $(".password-again-input").val();

    var number = /([0-9])/;
    var alphabets = /([a-z])/;
    var upper = /([A-Z])/;

    if (
      password.length < 8 ||
      !password.match(number) ||
      !password.match(alphabets) ||
      !password.match(upper)
    ) {
      return alert("Senha não contém os parâmetros exigidos");
    }

    if (password != password_again) {
      return alert("As senhas inseridas são diferentes");
    }
    const urlParams = getUrlVars();
    if (urlParams.hasOwnProperty("s_token")) {
      const token = urlParams["token"];
      const s_token = urlParams["s_token"];
      const newPassword = {
        password: password,
      };

      console.log(token, s_token, newPassword);
      $.ajaxSetup({
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      $.post(`http://192.168.11.79:80/colaborador/${s_token}`, newPassword)
        .done(function (data) {
          alert("Senha alterada com sucesso!");
          $(".password-input").val("");
          $(".password-again-input").val("");
          $("#password-strength-status").removeClass();
          $("#password-strength-status").empty();
        })
        .fail(function (error) {
          console.log(error);
          alert("Não foi possível alterar a senha");
        });
    }
  });
});

function checkPasswordStrength() {
  var number = /([0-9])/;
  var alphabets = /([a-z])/;
  var upper = /([A-Z])/;
  if ($(".password-input").val().length < 8) {
    $("#password-strength-status").removeClass();
    $("#password-strength-status").addClass("weak-password");
    $("#password-strength-status").html(
      "Fraca (deve ter no mínimo 8 caracteres)"
    );
  } else {
    if (
      $(".password-input").val().match(number) &&
      $(".password-input").val().match(upper) &&
      $(".password-input").val().match(alphabets)
    ) {
      $("#password-strength-status").removeClass();
      $("#password-strength-status").addClass("strong-password");
      $("#password-strength-status").html("Forte");
    } else {
      $("#password-strength-status").removeClass();
      $("#password-strength-status").addClass("medium-password");
      $("#password-strength-status").html(
        "Medio (deve incluir no mínimo uma letra minúscula, uma maíscula e um número)"
      );
    }
  }
}
