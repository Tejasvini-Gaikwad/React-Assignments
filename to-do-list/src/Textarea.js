import {Field, ErrorMessage} from "formik"

function Textarea(props){
    const {name, label, ...rest} = props
    return (
        <div>
            <label>{label}</label>
            <Field as="textarea" id={name} name={name} {...rest}/>
            <ErrorMessage name={name} component="div" className="errors"/>
        </div>
    )
}

export default Textarea;