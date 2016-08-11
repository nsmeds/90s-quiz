function cycle () {
  var begin = document.getElementById("begin-button");
  begin.addEventListener('click', function (event) {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('fieldset1').style.display = 'flex';
    document.getElementById('submit-button').style.display = 'flex';
  })
}

cycle();