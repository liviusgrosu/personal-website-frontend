/* eslint-disable react-refresh/only-export-components */
import { ErrorMessage, Form, Formik } from "formik";
import { Button, Divider, Header, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../app/stores/store";
import MyTextInput from "../app/common/MyTextInput";

export default observer (function LoginForm() {
    const {loginStore} = useStore();
    return (
        <Formik
            initialValues={{email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => loginStore.login(values).catch(() => 
                setErrors({error: 'Invalid email or password'}) )}>

            {({handleSubmit, isSubmitting, errors}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <Divider horizontal>
                        <Header as='h3'>
                            Login
                        </Header>
                    </Divider>
                    <MyTextInput placeholder="Email" name='email'/>
                    <MyTextInput placeholder="Password" name='password' type='password'/>
                    <ErrorMessage
                        name='error' render={() => <Label style={{marginBottom: 10 }} basic color='red' content={errors.error}/>}
                    />
                    <Button loading={isSubmitting} positive content='Login' type="submit" fluids/>
                </Form>
            )}
        </Formik>
    )
})