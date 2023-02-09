import Input from "./Input";
import Select from "./Select";
import Textarea from "./Textarea";
import Datepickerjs from "./Datepickerjs";

function FormControls(props){
    const {control, ...rest} = props
    switch(control){
        case 'text': 
               return <Input {...rest}/>
        case 'textarea':
               return <Textarea {...rest}/>
        case 'select':
               return <Select {...rest} />
        case 'date':
               return <Datepickerjs {...rest} />
        default : return null
    }
}

export default FormControls;