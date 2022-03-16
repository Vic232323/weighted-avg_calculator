const formbtn = document.querySelector(".quantity-form-btn");
const formQuant = document.querySelector(".quantity-input");
const placeholder = document.querySelector(".placeholder");
const calculateBtn = document.querySelector(".calculate-btn");
const removeAllBtn = document.querySelector(".remove-all-btn");
let btns;

formbtn.addEventListener("click", (e) => {
  e.preventDefault();
  genForm(formQuant.value);
  formQuant.value = "";
});

function genForm(amount) {
  const html = `
    <div>
      <label>Value: </label>
      <input class="gen-input_val" type="text" />
      <label>Weight: </label>
      <input class="gen-input_val_weight" type="text" />
      <button class="trash-btn btn">
      <i class="fas fa-trash">
      </i>
    </button>
    </div>
  `;

  for (let i = 0; i < amount; i++) {
    placeholder.insertAdjacentHTML("beforebegin", html);
  }

  btns = document.querySelectorAll(".btn");

  if (btns.length) {
    btns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const btnIndex = [...btns].indexOf(btn);
        btns[btnIndex].parentElement.remove();
      });
    });
  }
}

const calculate = function () {
  if (!btns) return;

  const inputVal = document.querySelectorAll(".gen-input_val");
  const inputValWeight = document.querySelectorAll(".gen-input_val_weight");

  const totalSum = [];
  const totalDiv = [];

  for (const value of Object.keys(inputVal)) {
    totalSum.push(+inputVal[value].value);
    totalDiv.push(+inputVal[value].value * +inputValWeight[value].value);
  }

  const denominador = totalSum.reduce((acc, cur) => acc + cur);
  const numerador = totalDiv.reduce((acc, cur) => acc + cur);

  const resultado = `
  <span class="to_del">A media ponderada é: ${numerador / denominador}</span>
  `;

  const spanResult = document.querySelector(".span_result");
  spanResult.innerHTML = resultado;
};

calculateBtn.addEventListener("click", calculate);
removeAllBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!btns) alert("There is nothing to delete");
  Array.from(placeholder.childNodes).forEach((t) => t.remove());
});

placeholder.addEventListener("keyup", (e) => {
  if (e.key === "Enter") calculate();
});
