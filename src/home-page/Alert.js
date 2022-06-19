import {forwardRef,useImperativeHandle,useRef} from 'react';
import './Alert.css';

const Alert = (props,ref) => {
  const alertRef = useRef(null);

  useImperativeHandle(ref, () => ({
    addClass: () => {
      alertRef.current.classList.add('alert__hide');
    }
  }));
  
  return (
    <div  data-testid="alertMssg" className="alert" ref={alertRef}>
      <h3>You cant add more than 5 products of this item</h3>
    </div>
  )
}

export default forwardRef(Alert);
