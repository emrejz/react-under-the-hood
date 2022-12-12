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

  function useRef(val) {
    return useState({ current: val })[0];
  }

  function useEffect(cb, deps) {
    let hasChanged = true;
    const oldDeps = hooks[index];
    if (oldDeps) {
      hasChanged = deps?.some((dep, i) => !Object.is(dep, oldDeps[i])); // react uses Object.is() to compare dependencies and if the values are changed.
    }
    if (hasChanged) cb();
    hooks[index] = deps;
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
    useEffect,
    useRef,
  };
})();

const Component = () => {
  // why we have some rules on react for hooks because;
  // we cant put hook within an if statement because sometimes index can be 0 sometimes can be 1 and so on.
  // it is unpredictable and index is important as u can see above
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState("react");

  const ref = React.useRef("kayacan");

  React.useEffect(() => {
    console.log("runs if any deps changes", count, text);
  }, [count, text]);

  return {
    render: () => {
      console.log(count, text, ref);
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
