import { Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Datepickerjs(props){
    const {name,label,...rest} = props;
    return (
        <div>
            <Field name={name}>
                {
                    ({form, field}) => {
                        const {setFieldValue} = form;
                        const {value} = field
                        return <DatePicker name={name} {...field} {...rest} selected={value} onChange={(val)=>{setFieldValue(name,val)}} />
                    }
                }
            </Field>
            <ErrorMessage name={name} component="div" className="errors"/>
            
        </div>
    )
}

export default Datepickerjs;