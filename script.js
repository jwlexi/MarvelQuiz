var correctHero;

var getData = async (url) => {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

var populatePage = async () => {
  let url = "https://cst336.herokuapp.com/projects/api/superheroesAPI.php";
  let data = await getData(url);
  correctHero = _.sample(data);

  $("#heroPic").attr("src", `img/${correctHero.image}.png`);

  for (hero of data) {
    // console.log(hero.firstName);
    $("#dropdown").append(`<option value="${hero.id}">${hero.firstName} ${hero.lastName} </option>`);
  }

  let buttonOptions = ["New York", "Krypton", "Bulgaria", "Gotham City", "Ohio"];
  buttonOptions = _.shuffle(buttonOptions);
  $("#question2").html(`Where was ${correctHero.name} born?`);
  for (let i = 0; i < buttonOptions.length; i++) {
    $("#options").append(`<input type="radio" name="num" value="${buttonOptions[i]}"> ${buttonOptions[i]} </input> `);
  }
}

var checkAnswers = async () => {
  let userAnsOne = $("#dropdown").val();
  // console.log(userAnsOne);
  let realName = correctHero.firstName + " " + correctHero.lastName;
  let userAnsTwo = $("#options [type='radio']:checked").val();
  userAnsTwo = userAnsTwo.replaceAll(" ", "-");
  let url = `https://cst336.herokuapp.com/projects/api/superheroesAPI.php?heroId=${correctHero.id}&pob=${userAnsTwo}`;
  let location = await getData(url);
  // console.log(realName);

  // Question 1
  if (userAnsOne == correctHero.id) {
    $("#ans1").html("Correct");
    $("#ans1").css("color", "green");
  } else {
    $("#ans1").html("Incorrect");
    $("#ans1").css("color", "red");
  }

  // Question 2
  if (location.answer == "right") {
    $("#ans2").html("Correct");
    $("#ans2").css("color", "green");
  } else {
    $("#ans2").html("Incorrect");
    $("#ans2").css("color", "red");
  }
}

var swapButtons = async () => {
  $("#villains").css("display", "");
  $("#submit").css("display", "none");
}

var showVillains = async () => {
  let url = `https://cst336.herokuapp.com/projects/api/superheroesAPI.php?heroId=${correctHero.id}&data=villains`
  let herosV = await getData(url);
  console.log(herosV);

  $("#someDiv").html("");
  for(let i = 0; i < herosV.length; i++) {
    $("#someDiv").append(`<img src = "` + herosV[i].villainImage  +`" width = "400" height = "400"/>`);
  }
}

$("#submit").on("click", checkAnswers);
populatePage();
