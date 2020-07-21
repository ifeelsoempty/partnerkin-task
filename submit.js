submit = document.getElementsByClassName("submit")[0];

submit.addEventListener("click", onSubmit);

function onSubmit() {
  //Массив из пользовательских данных
  const data = {};

  //Взятие данных из первой формы
  business = document.getElementsByTagName("select")[0].value;
  data.business = business;
  const inputs = Array.from(document.getElementsByTagName("input"));
  inputs.map((input) => {
    if (input.checked) {
      if (input.name === "stage") {
        data.stage = input.value;
      } else if (input.name === "salary") {
        data.salary = input.value;
      }
    }
  });

  const firstForm = document.getElementsByClassName("steps")[0];
  firstFormParent = firstForm.parentNode;
  firstFormParent.removeChild(firstForm);

  secondForm = createSecondForm();
  firstFormParent.insertBefore(secondForm, firstFormParent.children[1]);

  const secondFormParent = secondForm.parentNode;
  secondForm.parentNode.style.height = "815px";

  submit.removeEventListener("click", onSubmit);
  submit.addEventListener("click", () => {
    const inputs = Array.from(document.getElementsByTagName("input"));

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

    fetch("http://test-task/api/customer/create", {
      method: "POST",
      body: JSON.stringify(data),
    });

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
  });
}

function createSecondForm() {
  const secondForm = document.createElement("div");
  secondForm.classList.add("client-data");

  //Первый уровень
  const firstInputItem = document.createElement("div");
  const secondInputItem = document.createElement("div");
  const thirdInputItem = document.createElement("div");
  const fourthInputItem = document.createElement("div");

  firstInputItem.classList.add("input-item");
  secondInputItem.classList.add("input-item");
  thirdInputItem.classList.add("input-item");
  fourthInputItem.classList.add("input-item");

  secondForm.appendChild(firstInputItem);
  secondForm.appendChild(secondInputItem);
  secondForm.appendChild(thirdInputItem);
  secondForm.appendChild(fourthInputItem);

  //Второй уровень
  const firstLabel = document.createElement("label");
  const secondLabel = document.createElement("label");
  const thirdLabel = document.createElement("label");
  const fourthLabel = document.createElement("label");

  firstLabel.innerText = "Ваше имя";
  secondLabel.innerText = "Город";
  thirdLabel.innerText = "Телефон";
  fourthLabel.innerText = "E-mail";

  firstInputItem.appendChild(firstLabel);
  secondInputItem.appendChild(secondLabel);
  thirdInputItem.appendChild(thirdLabel);
  fourthInputItem.appendChild(fourthLabel);

  //Третий уровень
  const firstInput = document.createElement("input");
  const secondInput = document.createElement("input");
  const thirdInput = document.createElement("input");
  const fourthInput = document.createElement("input");

  firstInput.setAttribute("name", "name");
  secondInput.setAttribute("name", "city");
  thirdInput.setAttribute("name", "number");
  fourthInput.setAttribute("name", "e-mail");

  firstInput.setAttribute("type", "text");
  secondInput.setAttribute("type", "text");
  thirdInput.setAttribute("type", "text");
  fourthInput.setAttribute("type", "text");

  firstInputItem.appendChild(firstInput);
  secondInputItem.appendChild(secondInput);
  thirdInputItem.appendChild(thirdInput);
  fourthInputItem.appendChild(fourthInput);

  return secondForm;
}
