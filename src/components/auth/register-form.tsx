import * as yup from 'yup';
import type { SubmitHandler } from 'react-hook-form';
import type { RegisterUserInput } from '@/types';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { Form } from '@/components/ui/forms/form';
import Password from '@/components/ui/forms/password';
import { useModalAction } from '@/components/modal-views/context';
import Input from '@/components/ui/forms/input';
import client from '@/data/client';
import Button from '@/components/ui/button';
import SocialLogin from '@/components/sociallogin/sociallogin';
import { useState } from 'react';
import useAuth from './use-auth';
import { useTranslation } from 'next-i18next';
import Swal from 'sweetalert2';

const registerUserValidationSchema = yup.object().shape({
  name: yup.string().max(20).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export default function RegisterUserForm() {
  const { t } = useTranslation('common');
  const { openModal, closeModal } = useModalAction();
  const { authorize } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutate, isLoading } = useMutation(client.users.register, {
    onSuccess: (res) => {
      if (!res) {
        Swal.fire({
          title: "Erreur !",
          text: "Une erreur est survenue lors du traitement de votre profil.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      Swal.fire({
        title: "Inscription réussie !",
        text: "Veuillez vérifier votre email pour activer votre compte.",
        icon: "success",
        timer: 15000,
        timerProgressBar: true,
        showConfirmButton: false,
        willClose: () => {
          authorize(res.token);
          closeModal();
        }
      });
    },

    onError: (err: any) => {
      const msg =
        err?.response?.data?.message || 'Unknown server error. Please try again.';
      toast.error(<b>{msg}</b>, {
        className: '-mt-10 xs:mt-0',
      });
      setServerError(msg);
    },
  });

  const onSubmit: SubmitHandler<RegisterUserInput> = (data) => {
    setServerError(null);
    mutate(data);
  };

  return (
    <div className="min-h-[100vh] flex bg-gradient-to-br from-slate-50 via-white to-pink-50">

      {/* LEFT FORM */}
      <div className="w-full flex items-center justify-center px-6 py-12 relative">

        {/* soft pattern */}
        <div className="absolute inset-0 opacity-40 pointer-events-none" />

        <div className="relative z-10 w-full max-w-md">

          {/* HEADER */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {t('text-welcome-back-register')}
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Créez votre compte en quelques secondes
            </p>
          </div>

          {/* CARD */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6">

            <Form<RegisterUserInput>
              onSubmit={onSubmit}
              validationSchema={registerUserValidationSchema}
              className="space-y-5"
            >
              {({ register, formState: { errors } }) => (
                <>
                  {/* NAME */}
                  <Input
                    label="Nom"
                    inputClassName="bg-white/80 border-gray-200 focus:ring-2 focus:ring-pink-200 rounded-xl"
                    {...register('name')}
                    error={errors.name?.message}
                  />

                  {/* EMAIL */}
                  <Input
                    label="Email"
                    inputClassName="bg-white/80 border-gray-200 focus:ring-2 focus:ring-pink-200 rounded-xl"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                  />

                  {/* PASSWORD */}
                  <Password
                    label="Mot de passe"
                    inputClassName="bg-white/80 border-gray-200 focus:ring-2 focus:ring-pink-200 rounded-xl"
                    {...register('password')}
                    error={errors.password?.message}
                  />

                  {/* BUTTON */}
                  <Button
                    type="submit"
                    className="w-full !py-3 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 hover:opacity-90 transition shadow-lg"
                    isLoading={isLoading}
                    disabled={isLoading}
                  >
                    {t('text-register')}
                  </Button>

                  {/* SERVER ERROR */}
                  {serverError && (
                    <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 border border-red-200">
                      ⚠️ {serverError}
                    </div>
                  )}
                </>
              )}
            </Form>

            {/* SWITCH */}
            <div className="mt-5 text-center text-sm text-gray-500">
              {t('text-create-an-account')}{' '}
              <button
                onClick={() => openModal('LOGIN_VIEW')}
                className="text-pink-600 font-semibold hover:underline"
              >
                {t('text-login')}
              </button>
            </div>

            {/* DIVIDER (hidden comme avant) */}
            <div className="hidden flex items-center my-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="px-3 text-xs text-gray-400">ou</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* SOCIAL (inchangé hidden) */}
          </div>
        </div>
      </div>

      {/* RIGHT VISUAL */}
      <div className="hidden  w-1/2 items-center justify-center relative">

        <div className="absolute inset-6 rounded-3xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400"
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-8 left-8 bg-white/80 backdrop-blur-md p-5 rounded-xl shadow-lg max-w-xs">
            <h3 className="font-semibold text-gray-900">
              Rejoignez la plateforme
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Créez votre compte et commencez à vendre en quelques minutes.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}