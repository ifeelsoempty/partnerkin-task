let data = {};
const submit = document.getElementsByClassName("submit")[0];
const selector = document.getElementsByClassName("select")[0];
let inputs = Array.from(document.getElementsByTagName("input"));

submit.addEventListener("click", createSecondForm);
selector.addEventListener("change", changeSelector);

//Добавление условий на доступ к кнопке
inputs.map((input) => {
  input.addEventListener("change", firstAccess);
});

function createSecondForm() {
  //Получение данных из первой формы
  data = getFirstData(data);

  //Удаление первой формы/этапа
  const firstForm = document.getElementsByClassName("steps")[0];
  firstFormParent = firstForm.parentNode;
  firstFormParent.removeChild(firstForm);

  //Создание второй формы/этапа в DOM
  secondForm = createSecondFormDOM();
  firstFormParent.insertBefore(secondForm, firstFormParent.children[1]);
  secondForm.parentNode.style.height = "815px";

  //Добавление нового обработчика события
  //на отправку данных и создание третьей формы
  submit.setAttribute("disabled", null);
  submit.removeEventListener("click", createSecondForm);
  submit.addEventListener("click", onSubmit);
  submit.innerText = 'Отправить';

  //Получение input-ов второй формы и изменение условий доступа к кнопке
  inputs = Array.from(document.getElementsByTagName("input"));
  inputs.map((input) => {
    input.removeEventListener("change", firstAccess);
    input.addEventListener("change", secondAccess);
  });

  function onSubmit() {
    const secondFormParent = secondForm.parentNode;

    //Получение данных второй формы
    inputs.map((input) => {
      switch (input.name) {
        case "name":
          data.name = input.value;
          break;
        case "city":
          data.city = input.value;
          break;
        case "number":
          data.number = input.value;
          break;
        case "e-mail":
          data.email = input.value;
          break;
      }
    });

    //Запрос с добавлением в базу данных
    fetch("http://test-task/api/customer/create", {
      method: "POST",
      body: JSON.stringify(data),
    });

    //Создание третьей формы
    secondFormParent.removeChild(secondFormParent.children[0]);
    secondFormParent.removeChild(secondFormParent.children[1]);
    secondFormParent.removeChild(secondForm);

    completed = document.createElement("div");
    completed.classList.add("completed");
    secondFormParent.appendChild(completed);

    img = document.createElement("img");
    img.setAttribute("src", "img/completed.png");
    completed.appendChild(img);

    text = document.createElement("p");
    text.innerText = "Спасибо, наш менеджер в ближайшее время с вами свяжется.";
    completed.appendChild(text);

    secondFormParent.style.height = "510px";
  }
}

function createSecondFormDOM() {
  const secondForm = document.createElement("div");
  secondForm.classList.add("client-data");

  //Первый уровень вложенности
  const firstInputItem = document.createElement("div");
  const secondInputItem = document.createElement("div");
  const thirdInputItem = document.createElement("div");
  const fourthInputItem = document.createElement("div");
  const checkItem = document.createElement("div");

  firstInputItem.classList.add("input-item");
  secondInputItem.classList.add("input-item");
  thirdInputItem.classList.add("input-item");
  fourthInputItem.classList.add("input-item");
  checkItem.classList.add("check-item");

  secondForm.appendChild(firstInputItem);
  secondForm.appendChild(secondInputItem);
  secondForm.appendChild(thirdInputItem);
  secondForm.appendChild(fourthInputItem);
  secondForm.appendChild(checkItem);

  //Второй уровень вложенности
  const firstLabel = document.createElement("label");
  const secondLabel = document.createElement("label");
  const thirdLabel = document.createElement("label");
  const fourthLabel = document.createElement("label");
  const fifthLabel = document.createElement("label");

  firstLabel.innerText = "Ваше имя";
  secondLabel.innerText = "Город";
  thirdLabel.innerText = "Телефон";
  fourthLabel.innerText = "E-mail";
  fifthLabel.innerText =
    "Согласен на обработку персональных данных и с правилами";
  fifthLabel.setAttribute("for", "confirmation");

  firstInputItem.appendChild(firstLabel);
  secondInputItem.appendChild(secondLabel);
  thirdInputItem.appendChild(thirdLabel);
  fourthInputItem.appendChild(fourthLabel);

  //Третий уровень вложенности
  const firstInput = document.createElement("input");
  const secondInput = document.createElement("input");
  const thirdInput = document.createElement("input");
  const fourthInput = document.createElement("input");
  const checkInput = document.createElement("input");

  firstInput.setAttribute("name", "name");
  secondInput.setAttribute("name", "city");
  thirdInput.setAttribute("name", "number");
  fourthInput.setAttribute("name", "e-mail");

  firstInput.setAttribute("type", "text");
  secondInput.setAttribute("type", "text");
  thirdInput.setAttribute("type", "text");
  fourthInput.setAttribute("type", "text");
  checkInput.setAttribute("id", "confirmation");
  checkInput.setAttribute("type", "checkbox");
  checkInput.setAttribute("checked", null);

  firstInputItem.appendChild(firstInput);
  secondInputItem.appendChild(secondInput);
  thirdInputItem.appendChild(thirdInput);
  fourthInputItem.appendChild(fourthInput);
  checkItem.appendChild(checkInput);
  checkItem.appendChild(fifthLabel);

  return secondForm;
}

function firstAccess() {
  let checked = 0;
  inputs.map((input) => {
    if (input.checked) {
      checked++;
    }
  });
  if (checked >= 2) {
    submit.removeAttribute("disabled");
  }
}

function secondAccess() {
  let checked = 0;
  inputs.map((input) => {
    if ((input.value.trim() !== "" && input.type === "text") || input.checked) {
      checked++;
    }
  });
  if (checked >= 5) {
    submit.removeAttribute("disabled");
  } else {
    submit.setAttribute("disabled", null);
  }
}

function getFirstData(data) {
  business = document.getElementsByTagName("select")[0].value;
  if (business !== "Другое") {
    data.business = business;
  } else {
    anotherOptionValue = document.getElementById("another-option").value;
    if (anotherOptionValue.trim() !== "") {
      data.business = document.getElementById("another-option").value;
    } else {
      data.business = business;
    }
  }

  inputs.map((input) => {
    if (input.checked) {
      if (input.name === "stage") {
        data.stage = input.value;
      } else if (input.name === "salary") {
        data.salary = input.value;
      }
    }
  });

  return data;
}

function changeSelector() {
  if (selector.value === "Другое") {
    anotherOption = document.createElement("input");
    anotherOption.setAttribute("type", "text");
    anotherOption.setAttribute("id", "another-option");
    anotherOption.setAttribute("placeholder", "Введите свой вариант");
    selector.parentNode.appendChild(anotherOption);
  } else if (document.getElementById("another-option")) {
    anotherOption = document.getElementById("another-option");
    anotherOption.parentNode.removeChild(anotherOption);
  }
}
