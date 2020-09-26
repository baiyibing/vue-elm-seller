import Vue from "vue";
import Alert from "./main.vue";

const AlertCtor = Vue.extend(Alert);

const createAlert = (title, content, buttonText) => {
  const instance =
    createAlert.instance ||
    (createAlert.instance = new AlertCtor({
      el: document.createElement("div"),
    }));

instance.$el.classList.add('animation-enter')

  if (title) {
    instance.title = title;
  }

  if (content) {
    instance.content = content;
  }
  if (buttonText) {
    instance.buttonText = buttonText;
  }
  document.body.appendChild(instance.$el);
  return new Promise((resolve, reject) => {
    instance.$on("submit", () => {
      resolve();
      instance.$el.remove();
       
    });
  });
};

createAlert.install = (Vue) => {
  Vue.prototype.$alert = createAlert;
};

export default createAlert;
