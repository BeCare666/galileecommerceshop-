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
import Image from "next/image";
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import Logo from "@/assets/logo/IMG-20250914-WA0029.jpg";
import { useRouter } from "next/router";

const loginValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function LoginUserForm() {
  const { t } = useTranslation('common');
  const { openModal, closeModal } = useModalAction();
  const { authorize } = useAuth();
  const router = useRouter();

  const { mutate: login, isLoading } = useMutation(client.users.login, {
    onSuccess: (data) => {
      Swal.fire({
        title: "Connexion réussie !",
        text: "Bienvenue sur la plateforme Galileecommerce",
        icon: "success",
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        willClose: () => {
          router.push("/");
        }
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
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
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
    <div className="min-h-[100vh] flex bg-gradient-to-br from-slate-50 via-white to-pink-50">

      {/* LEFT SIDE FORM */}
      <div className="w-full flex items-center justify-center px-6 py-12 relative">

        <div className="relative z-10 w-full max-w-md">

          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4 hidden">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center overflow-hidden">
                <Image src={Logo} alt="logo" width={40} height={40} />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              {t('text-welcome-back')}
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Connectez-vous pour accéder à votre espace
            </p>
          </div>

          {/* FORM CARD */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6">

            <Form<LoginUserInput>
              onSubmit={onSubmit}
              validationSchema={loginValidationSchema}
              className="space-y-5"
            >
              {({ register, formState: { errors } }) => (
                <>
                  {/* EMAIL */}
                  <div>
                    <Input
                      label="Email"
                      inputClassName="bg-white/80 border-gray-200 focus:ring-2 focus:ring-pink-200 rounded-xl"
                      type="email"
                      {...register('email')}
                      error={errors.email?.message}
                    />
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <Password
                      label="Mot de passe"
                      inputClassName="bg-white/80 border-gray-200 focus:ring-2 focus:ring-pink-200 rounded-xl"
                      {...register('password')}
                      error={errors.password?.message}
                    />
                  </div>

                  {/* OPTIONS */}
                  <div className="flex items-center justify-between text-sm">
                    <CheckBox label="Se souvenir de moi" />

                    <button
                      type="button"
                      className="text-pink-600 font-medium hover:underline"
                      onClick={() => openModal('FORGOT_PASSWORD_VIEW')}
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>

                  {/* BUTTON */}
                  <Button
                    type="submit"
                    isLoading={isLoading}
                    disabled={isLoading}
                    className="w-full !py-3 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 hover:opacity-90 transition shadow-lg"
                  >
                    {t('text-get-login')}
                  </Button>
                </>
              )}
            </Form>

            {/* SWITCH */}
            <div className="mt-4 text-center text-sm text-gray-500">
              {t('text-join-now')}{' '}
              <button
                onClick={() => openModal('REGISTER')}
                className="text-pink-600 font-semibold hover:underline"
              >
                {t('text-create-account')}
              </button>
            </div>

            {/* DIVIDER */}
            <div className="hidden flex items-center my-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="px-3 text-xs text-gray-400">ou</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* SOCIAL (hidden comme ton code original) */}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE VISUAL */}
      <div className="hidden w-1/2 relative items-center justify-center">

        <div className="absolute inset-6 rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400"
            alt="login-bg"
            layout="fill"
            objectFit="cover"
            priority
          />

          <div className="absolute bottom-8 left-8 bg-white/80 backdrop-blur-md p-5 rounded-xl shadow-lg max-w-xs">
            <h3 className="font-semibold text-gray-900">
              Plateforme premium
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Gérez vos activités avec une expérience moderne et rapide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}