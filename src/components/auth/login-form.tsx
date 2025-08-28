import { RegisterBgPattern } from '@/components/auth/register-bg-pattern';
import useAuth from '@/components/auth/use-auth';
import { useModalAction } from '@/components/modal-views/context';
import Button from '@/components/ui/button';
import CheckBox from '@/components/ui/forms/checkbox';
import { Form } from '@/components/ui/forms/form';
import Input from '@/components/ui/forms/input';
import Password from '@/components/ui/forms/password';
import client from '@/data/client';
import { setAuthCredentials } from '@/data/client/token.utils';
import type { LoginUserInput } from '@/types';
import { useTranslation } from 'next-i18next';
import type { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
//import withReactContent from 'sweetalert2-react-content';

const loginValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function LoginUserForm() {
  const { t } = useTranslation('common');
  const { openModal, closeModal } = useModalAction();
  const { authorize } = useAuth();
  const { mutate: login, isLoading } = useMutation(client.users.login, {
    onSuccess: (data) => {
      Swal.fire({
        title: "Login successful !",
        text: "Welcome to the Galileecommerce platform",
        icon: "success",
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false
      });

      if (!data.token) {
        toast.error(<b>{t('text-wrong-user-name-and-pass')}</b>, {
          className: '-mt-10 xs:mt-0',
        });
        return;
      }

      authorize(data.token);
      setAuthCredentials(data.token, data.permissions);
      closeModal();
    },
    onError: (error) => {
      let message = 'An error has occurred.';

      if (axios.isAxiosError(error)) {
        // Axios a reçu une réponse du serveur
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        // Cas d'une erreur JS classique ok 
        message = error.message;
      }

      toast.error(<b>{message}</b>, {
        className: '-mt-10 xs:mt-0',
      });
    },
  });

  const onSubmit: SubmitHandler<LoginUserInput> = (data) => {
    login(data);
  };
  return (
    <div className="bg-light px-6 pb-8 pt-10 dark:bg-dark-300 sm:px-8 lg:p-12">
      {/* {}  <RegisterBgPattern className="absolute bottom-0 left-0 text-light dark:text-dark-300 dark:opacity-60" /> */}
      <div className="relative z-10 flex items-center">
        <div className="w-full shrink-0 text-left md:w-[380px]">
          <div className="flex flex-col pb-5 text-center xl:pb-6 xl:pt-2">
            <h2 className="text-lg font-medium tracking-[-0.3px] text-dark dark:text-light lg:text-xl">
              {t('text-welcome-back')}
            </h2>
          </div>
          <Form<LoginUserInput>
            onSubmit={onSubmit}
            validationSchema={loginValidationSchema}
            useFormProps={{
              /** defaultValues: {
                email: 'customer@demo.com',
                password: 'demodemo',
              },**/
            }}
            className="space-y-4 pt-4 lg:space-y-5"
          >
            {({ register, formState: { errors } }) => (
              <>
                <Input
                  label="contact-us-email-field"
                  inputClassName="bg-light dark:bg-dark-300"
                  type="email"
                  {...register('email')}
                  error={errors.email?.message}
                />
                <Password
                  label="text-auth-password"
                  inputClassName="bg-light dark:bg-dark-300"
                  {...register('password')}
                  error={errors.password?.message}
                />
                <div className="flex items-center justify-between space-x-5 rtl:space-x-reverse">
                  <CheckBox
                    label="text-remember-me"
                  // inputClassName="bg-light dark:bg-dark-300"
                  />
                  <button
                    type="button"
                    className="text-13px font-semibold text-brand hover:text-dark-400 hover:dark:text-light-500"
                    onClick={() => openModal('FORGOT_PASSWORD_VIEW')}
                  >
                    {t('text-forgot-password')}
                  </button>
                </div>
                <Button
                  type="submit"
                  className="!mt-5 w-full text-sm tracking-[0.2px] lg:!mt-7"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  {t('text-get-login')}
                </Button>
              </>
            )}
          </Form>
          <div className="mt-1.5 text-13px leading-6 tracking-[0.2px] dark:text-light-900 lg:mt-2.5 xl:mt-3">
            {t('text-join-now')}{' '}
            <button
              onClick={() => openModal('REGISTER')}
              className="inline-flex font-semibold text-brand hover:text-dark-400 hover:dark:text-light-500"
            >
              {t('text-create-account')}
            </button>
          </div>

          <div className="flex items-center my-3">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-xs text-gray-500 uppercase">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className="flex flex-col gap-3 mt-5 lg:mt-7">
            {/* Google Login Button */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 533.5 544.3"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M533.5 278.4c0-17.4-1.4-34.1-4-50.2H272v95h146.9c-6.3 33.7-25 62.3-53.2 81.5v67h85.8c50.1-46.1 81-114 81-193.3z"
                  fill="#4285F4"
                />
                <path
                  d="M272 544.3c72.9 0 134-24.2 178.6-65.5l-85.8-67c-23.8 16-54.3 25.3-92.8 25.3-71.4 0-132-48-153.7-112.8H28.2v70.7c44.8 89.1 137.1 149.3 243.8 149.3z"
                  fill="#34A853"
                />
                <path
                  d="M118.3 324.3c-10-29.7-10-61.6 0-91.3V162.3H28.2c-39.2 77.3-39.2 168.2 0 245.5l90.1-70.7z"
                  fill="#FBBC05"
                />
                <path
                  d="M272 107.7c39.6 0 75.2 13.6 103.1 40.3l77.1-77.1C405.9 24.2 344.9 0 272 0 165.3 0 73 60.2 28.2 149.3l90.1 70.7c21.7-64.8 82.3-112.3 153.7-112.3z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700">Sign In with Google</span>
            </button>

            {/* Facebook Login Button */}
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition"
            >
              <svg
                className="w-5 h-5 text-[#1877F2]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 
        12.42-50.06 52.24-50.06H293V6.26S259.5 
        0 225.36 0c-73.22 0-121.11 44.38-121.11 
        124.72v70.62H22.89V288h81.36v224h100.2V288z"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700">Sign In with Facebook</span>
            </button>
          </div>

        </div>
      </div>
    </div >
  );
}
