import { Formik ,Form, Field, ErrorMessage} from "formik"
import * as yup from 'yup'
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import './TaskForm.css';
import FormControls from './FormControls';

const initialValues = {
    title : '',
    description : '',
    assignee : '',
    due_date : ''
}

const selectOptions = [
    {
        key:"Select Assignee", value:""
    },
    {
        key:"Rutuja", value:1
    },
    {
        key:"Priyanka", value:2
    },
    {
        key:"Deepika", value:3
    },
]
function TaskForm(){
    const validationSchema = yup.object({
        title:yup.string().required('Required'),
        description:yup.string().required('Required'),
        assignee:yup.string().required('Required'),
        due_date:yup.date().required('Required').nullable(),
    })
    
    const onSubmit = (values, onSubmitProps) => {
        onSubmitProps.resetForm();
    }
    return (
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {
                    formik => {
                        return (
                            <Card className='card' style={{ width: '25rem' }}>
                                <Card.Body>
                                    <Form>
                                        <FormControls label="Title" name="title" id="title" control="text" className="form-control" /><br />
                                        <FormControls label="Description" name="description" control="textarea" id="description" className="form-control"/><br />
                                        <FormControls label="Assignee" name="assignee" control="select" id="assignee" className="form-control" options={selectOptions} /><br />
                                        <FormControls label="Due Date" name="due_date" control="date" id="due_date" className="form-control" /><br />
                                        {/* <Field type="text" name="title" id="title" className="form-control"/>
                                        <ErrorMessage name="title" className="errors" component="div"/><br /> */}
                                        {/* <Field as ="textarea" name="description" id="description" className="form-control"/>
                                        <ErrorMessage name="description" className="errors" component="div"/><br /> */}
                                        <Button type="submit" disabled={!formik.isValid}>Submit</Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        )
                        
                    }
                }
                
            </Formik>
    )
}

export default TaskForm