import {FC} from "react";
import Logo from "../../components/Logo";
import {Formik} from "formik";
import * as Yup from "yup";

interface IRegisterFormProp {
   email: string;
   password: string;
   confirmPassword: string;
   name: string;
   surname: string;
}

const initialValues: IRegisterFormProp = {
   email: '',
   password: '',
   confirmPassword: '',
   name: '',
   surname: ''
}

const validationSchema = Yup.object({
   email: Yup.string().email('*').required('*'),
   confirmPassword: Yup.string().required('*'),
   password: Yup.string().required('*'),
   name: Yup.string().required('*'),
   surname: Yup.string().required('*'),
});

const Register: FC = () => {
   return (
      <div className="mx-auto w-full max-w-sm p-3 sm:my-20 my-10">
         <div className="flex items-center justify-center mb-4">
            <Logo noText/>
         </div>
         <div
            className="border rounded p-3 pt-5 bg-white dark:text-gray-100 dark:bg-night-200 dark:border-gray-500">
            <Formik
               validationSchema={validationSchema}
               initialValues={initialValues}
               onSubmit={async (values: IRegisterFormProp): Promise<void> => {
                  console.log(values);
               }}
            >
               <div>Form</div>
            </Formik>
         </div>
      </div>
   )
}

export default Register;