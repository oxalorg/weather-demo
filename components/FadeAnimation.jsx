import { CSSTransition, SwitchTransition } from "react-transition-group";

const FadeAnimation = ({ children, transitionKey }) => {
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        classNames="fade"
        addEndListener={(node, done) => {
          node.addEventListener("transitionend", done, false);
        }}
        key={transitionKey}
      >
        {children}
      </CSSTransition>
    </SwitchTransition>
  );
};

export default FadeAnimation;
