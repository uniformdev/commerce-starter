import { FC, ReactElement, useRef, useEffect, useCallback, useContext, useMemo, createContext } from 'react';
import { CSSTransition as ReactCSSTransition } from 'react-transition-group';

interface Props {
  show?: boolean;
  appear?: string;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
  className?: string;
  children?: ReactElement;
}

interface Parent extends Props {
  isInitialRender?: boolean;
}

interface TransitionContextProps {
  parent?: Parent;
}

const TransitionContext = createContext<TransitionContextProps>({ parent: {} });

const useIsInitialRender = () => {
  const isInitialRender = useRef(true);

  useEffect(() => {
    isInitialRender.current = false;
  }, []);

  return isInitialRender.current;
};

const addClasses = (node: HTMLElement | null, classes: string[]) => {
  if (classes.length) node?.classList.add(...classes);
};

const removeClasses = (node: HTMLElement | null, classes: string[]) => {
  if (classes.length) node?.classList.remove(...classes);
};

const filterClasses = (classes: string) => classes.split(' ').filter((s: string) => s.length);

const CSSTransition: FC<Props> = ({
  show,
  enter = '',
  enterFrom = '',
  enterTo = '',
  leave = '',
  leaveFrom = '',
  leaveTo = '',
  className = '',
  appear,
  children,
}) => {
  const nodeRef = useRef<HTMLElement & HTMLDivElement>(null);

  const enterClasses = useMemo(() => filterClasses(enter), [enter]);
  const enterFromClasses = useMemo(() => filterClasses(enterFrom), [enterFrom]);
  const enterToClasses = useMemo(() => filterClasses(enterTo), [enterTo]);
  const leaveClasses = useMemo(() => filterClasses(leave), [leave]);
  const leaveFromClasses = useMemo(() => filterClasses(leaveFrom), [leaveFrom]);
  const leaveToClasses = useMemo(() => filterClasses(leaveTo), [leaveTo]);

  const addEndListener = useCallback((done: (this: HTMLElement, ev: TransitionEvent) => void) => {
    if (nodeRef.current) {
      const node: HTMLElement = nodeRef.current;
      node.addEventListener('transitionend', done, { passive: true });
    }
  }, []);

  const onEnter = useCallback(() => {
    addClasses(nodeRef.current, [...enterClasses, ...enterFromClasses]);
  }, [enterClasses, enterFromClasses]);

  const onEntering = useCallback(() => {
    removeClasses(nodeRef.current, enterFromClasses);
    addClasses(nodeRef.current, enterToClasses);
  }, [enterFromClasses, enterToClasses]);

  const onEntered = useCallback(() => {
    removeClasses(nodeRef.current, [...enterClasses, ...enterFromClasses]);
  }, [enterClasses, enterFromClasses]);

  const onExit = useCallback(() => {
    addClasses(nodeRef.current, [...leaveClasses, ...leaveFromClasses]);
  }, [leaveClasses, leaveFromClasses]);

  const onExiting = useCallback(() => {
    removeClasses(nodeRef.current, leaveFromClasses);
    addClasses(nodeRef.current, leaveToClasses);
  }, [leaveFromClasses, leaveToClasses]);

  const onExited = useCallback(() => {
    removeClasses(nodeRef.current, [...leaveClasses, ...leaveFromClasses]);
  }, [leaveClasses, leaveFromClasses]);

  return (
    <ReactCSSTransition
      nodeRef={nodeRef}
      appear={appear}
      unmountOnExit
      in={show}
      addEndListener={addEndListener}
      onEnter={onEnter}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
    >
      <div ref={nodeRef} className={className}>
        {children}
      </div>
    </ReactCSSTransition>
  );
};

const Transition: FC<Props> = ({ show, appear, ...rest }) => {
  const { parent } = useContext(TransitionContext);

  const isInitialRender = useIsInitialRender();

  const isChild = show === undefined;

  const value = useMemo(() => ({ parent: { show, isInitialRender, appear } }), [appear, isInitialRender, show]);

  if (isChild) {
    return <CSSTransition appear={parent?.appear} show={parent?.show} {...rest} />;
  }

  return (
    <TransitionContext.Provider value={value}>
      <CSSTransition appear={appear} show={show} {...rest} />
    </TransitionContext.Provider>
  );
};

export default Transition;
