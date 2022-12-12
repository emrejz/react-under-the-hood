const React = (function () {
  // it is a module pattern.
  const hooks = [];
  let index = 0;
  // closure allows inner funcs can access all of the variables of the outer func
  function useState(initVal) {
    const localIndex = index;
    if (!hooks.hasOwnProperty(localIndex)) {
      hooks[localIndex] = initVal;
    }
    const setState = (val) => {
      hooks[localIndex] = val;
    };
    index++;
    return [hooks[localIndex], setState];
  }

  function render(Comp) {
    index = 0; // we need to back to zero because every rendering increases the index and adds initVal into the hooks, and even if we use the set func, we will always get initVal.
    const Component = Comp();
    Component.render();
    return Component;
  }

  return {
    useState,
    render,
  };
})();

const Component = () => {
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState("react");

  return {
    render: () => {
      console.log(count, text);
    },
    click: () => {
      setCount(count + 1);
      setText("emre");
    },
  };
};

let app = React.render(Component);
app.click();
app = React.render(Component);
app.click();
app = React.render(Component);
