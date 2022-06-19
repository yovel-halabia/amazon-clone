import React,{useState ,useImperativeHandle,forwardRef} from 'react';


const PaymentInputs = forwardRef((props,ref)  => {
    const [ccValue, setCcValue] = useState('');
    const [cvvValue, setCvvValue] = useState('');
    const [date,setDate] = useState(((new Date().getMonth()+1) < 10 ? '0'+(new Date().getMonth()+1).toString():(new Date().getMonth()+1).toString()) +'/'+ new Date().getFullYear().toString());

    useImperativeHandle(ref,() => ({
        checkInput(){
            if(ccValue.length < 25)
            return 'Credit Card input invalid';
            else if(parseInt(date.split('/')[0]) < new Date().getMonth()+1 && parseInt(date.split('/')[1]) <= parseInt(new Date().getFullYear())||
            parseInt(date.split('/')[1]) < parseInt(new Date().getFullYear()) || date=='')
            return 'Date input invalid';
            else if(cvvValue.length <3)
            return 'CVV input invalid';
            else
            return '';
        }  
    }));
    

    const ccFormat = (value) => {
        var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        var matches = v.match(/\d{4,16}/g);
        var match = matches && matches[0] || ''
        var parts = []
    
        for (let i=0,len=match.length; i<len; i+=4) {
            parts.push(match.substring(i, i+4))
        }
        (parts.length?setCcValue(parts.join(' - ')):setCcValue(value));
    }

    const cvvFormat = (value)=>{
        (value.length > 3? setCvvValue(value.slice(0,3)):setCvvValue(value));
    }

    const dateFormat = (value)=>{
        var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        (v.length >= 3 ? setDate(v.slice(0,2)+'/'+ v.slice(2,6)) : setDate(v));  
    }


  return (
    <div className="payment__credit-inputs">

        <input data-testid="cardInput" id="payment__credit" placeholder="Credit Card" className="payment__input" type="text"  value={ccValue} onChange={(e)=>ccFormat(e.target.value)}/>
        <input data-testid="dateInput" type="text" id="payment__date" placeholder="Date" className="payment__input" value={date} onChange={(e)=>dateFormat(e.target.value)}/>
        <input data-testid="CVVInput" id="payment__cvv" placeholder="CVV" className="payment__input" type="text"  value={cvvValue} onChange={(e)=>cvvFormat(e.target.value)}/>

    </div>
  )
});

export default PaymentInputs;