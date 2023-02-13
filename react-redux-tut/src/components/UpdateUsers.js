import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup'
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, updateUserData } from "../actions/action";
import { Link, useNavigate,useParams } from "react-router-dom";
import { useEffect } from "react";

const UpdateUsers = () => {
    const dispatch = useDispatch();
    const result = useSelector((state) => state)
    const data = result.userData.data;
    let { id } = useParams();
    const updateValues = {
    }
    useEffect(()=>{
        if(!data){
            dispatch(updateUser(id))
        }else{
            updateValues.email = data.email
            updateValues.first_name = data.first_name 
            updateValues.last_name = data.last_name

        }

    })
    const onSubmit = (values,onSubmitProp) => {
        dispatch(updateUserData({...values,id}))
        onSubmitProp.resetForm()
    }

    const validationSchema = yup.object({
        email:yup.string().email('Format email').required('Required'),
        first_name:yup.string().required('Required'),
        last_name:yup.string().required('Required')
    })
    return (
        <div className="users_app">
            <Button variant="info" onClick={() => window.location.reload()} style={{"marginRight":"420px"}}><Link to="/">Back</Link></Button><br /><br />

            <Formik initialValues={updateValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {
                    formik => {
                        const {setFieldValue} = formik
                        return (
                            <Card className='card' style={{ width: '25rem' }}>
                                <Card.Body>
                                    <Form>
                                        <label>Email</label>
                                            <Field type="text" name='email' id='email' className="form-control"/> 
                                            <ErrorMessage name="email" component='div' className='errors'/><br />
                                        
                                        <label>First Name</label>
                                            <Field type="text" name='first_name' id='first_name' className="form-control"/> 
                                            <ErrorMessage name="first_name" component='div' className='errors'/><br />
                                        
                                        <label>Last Name</label>
                                            <Field type="text" name='last_name' id='last_name' className="form-control" /> 
                                            <ErrorMessage name="last_name" component='div' className='errors'/><br />
                                        
                                        <Button type="submit" variant="primary" disabled={!formik.isValid}>Submit</Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        )
                    }
                }

            </Formik>
        </div>
    )
}

export default UpdateUsers;