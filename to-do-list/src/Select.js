import { ErrorMessage, Field } from "formik";

function Select(props){
    const {label, name, options, ...rest} = props;
    return (
        <div>
            <label>{label}</label>
            <Field as="select" name={name} id={name} {...rest}>
                {
                    options.map((option) => {
                        return <option value={option.value} key={option.value}>{option.key}</option>
                    })
                }
            </Field>
            <ErrorMessage name={name} component="div" className="errors"/>
        </div>
    )
}

export default Select;