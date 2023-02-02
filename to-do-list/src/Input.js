import {Field, ErrorMessage} from "formik"

function Input(props){
    const {name, label, ...rest} = props
    return (
        <div>
            <label>{label}</label>
            <Field id={name} name={name} {...rest}/>
            <ErrorMessage name={name} component="div" className="errors"/>
        </div>
    )
}

export default Input;