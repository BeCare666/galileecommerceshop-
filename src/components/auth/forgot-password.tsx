import * as yup from 'yup';
import type { SubmitHandler } from 'react-hook-form';
import type {
  ForgetPasswordInput,
  ResetPasswordInput,
  VerifyForgetPasswordTokenInput,
} from '@/types';
import toast from 'react-hot-toast';
import { Form } from '@/components/ui/forms/form';
import Input from '@/components/ui/forms/input';
import Password from '@/components/ui/forms/password';
import Button from '@/components/ui/button';
import { useModalAction } from '@/components/modal-views/context';
import client from '@/data/client';
import { useMutation } from 'react-query';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import {
  StateMachineProvider,
  createStore,
  useStateMachine,
  GlobalState,
} from 'little-state-machine';

const emailFormValidation = yup.object().shape({
  email: yup.string().email().required(),
});
const tokenFormValidation = yup.object().shape({
  token: yup.string().required(),
});
const passwordFormValidation = yup.object().shape({
  password: yup.string().required(),
});

/* =========================
   EMAIL FORM
========================= */
function EmailForm({
  email,
  serverError,
  onSubmit,
  isLoading,
}: {
  email: string;
  serverError?: { email?: string } | null;
  onSubmit: SubmitHandler<ForgetPasswordInput>;
  isLoading: boolean;
}) {
  const { t } = useTranslation('common');
  const { openModal } = useModalAction();

  return (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Réinitialiser le mot de passe
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Entrez votre email pour recevoir un code
        </p>
      </div>

      <Form<ForgetPasswordInput>
        onSubmit={onSubmit}
        useFormProps={{ defaultValues: { email } }}
        serverError={serverError}
        validationSchema={emailFormValidation}
      >
        {({ register, formState: { errors } }) => (
          <>
            <Input
              label="Email"
              type="email"
              {...register('email')}
              error={errors.email?.message && 'Email invalide'}
              inputClassName="bg-white/80 border-gray-200 focus:ring-2 focus:ring-pink-200 rounded-xl"
            />

            <Button
              type="submit"
              className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 hover:opacity-90"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Envoyer le code
            </Button>
          </>
        )}
      </Form>

      <div className="text-center text-sm text-gray-500 pt-4">
        Retour à{' '}
        <button
          className="text-pink-600 font-semibold hover:underline"
          onClick={() => openModal('LOGIN_VIEW')}
        >
          connexion
        </button>
      </div>
    </div>
  );
}

/* =========================
   TOKEN FORM
========================= */
function TokenForm({
  token,
  message,
  serverError,
  onSubmit,
  isLoading,
  onBack,
}: any) {
  return (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Vérification du code
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Entrez le code reçu par email
        </p>
      </div>

      <Form
        onSubmit={onSubmit}
        useFormProps={{ defaultValues: { token } }}
        validationSchema={tokenFormValidation}
        serverError={serverError}
      >
        {({ register, formState: { errors } }) => (
          <>
            <Input
              label="Code"
              {...register('token')}
              error={errors.token?.message && 'Code invalide'}
              inputClassName="bg-white/80 border-gray-200 focus:ring-2 focus:ring-pink-200 rounded-xl"
            />

            <div className="grid grid-cols-2 gap-3 mt-5">
              <Button type="button" variant="outline" onClick={onBack}>
                Retour
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
                className="bg-gradient-to-r from-pink-500 to-indigo-500"
              >
                Vérifier
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
}

/* =========================
   PASSWORD FORM
========================= */
function PasswordForm({ onSubmit, isLoading, onBack }: any) {
  return (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Nouveau mot de passe
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Choisissez un mot de passe sécurisé
        </p>
      </div>

      <Form
        onSubmit={onSubmit}
        useFormProps={{ defaultValues: { password: '' } }}
        validationSchema={passwordFormValidation}
      >
        {({ register, formState: { errors } }) => (
          <>
            <Password
              label="Mot de passe"
              {...register('password')}
              error={errors.password?.message}
              inputClassName="bg-white/80 border-gray-200 focus:ring-2 focus:ring-pink-200 rounded-xl"
            />

            <div className="grid grid-cols-2 gap-3 mt-5">
              <Button type="button" variant="outline" onClick={onBack}>
                Retour
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
                className="bg-gradient-to-r from-pink-500 to-indigo-500"
              >
                Réinitialiser
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
}

/* =========================
   MAIN STEPS
========================= */
function RenderFormSteps() {
  const { openModal } = useModalAction();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<any>(null);

  const { mutate: forgotPassword, isLoading } = useMutation(
    client.users.forgotPassword
  );
  const { mutate: verifyForgotPasswordToken, isLoading: verifying } =
    useMutation(client.users.verifyForgotPasswordToken);
  const { mutate: resetPassword, isLoading: resetting } =
    useMutation(client.users.resetPassword);

  const { state, actions } = useStateMachine({ updateFormState });

  const emailFormHandle = ({ email }: ForgetPasswordInput) => {
    forgotPassword(
      { email },
      {
        onSuccess: (data) => {
          if (!data.success) {
            setError({ email: data.message });
            return;
          }
          setMessage(data.message);
          actions.updateFormState({ email, step: 'Token' });
        },
      }
    );
  };

  const tokenFormHandle = ({ token }: any) => {
    verifyForgotPasswordToken(
      { token, email: state.email },
      {
        onSuccess: (res) => {
          if (!res.success) {
            setError({ token: res.message });
            return;
          }
          actions.updateFormState({ step: 'Password', token });
        },
      }
    );
  };

  const passwordFormHandle = ({ password }: any) => {
    resetPassword(
      { password, token: state.token, email: state.email },
      {
        onSuccess: (res) => {
          if (res.success) {
            actions.updateFormState({ ...initialState });
            toast.success('Mot de passe réinitialisé !');
            openModal('LOGIN_VIEW');
          }
        },
      }
    );
  };

  const back = (step: GlobalState['step']) => {
    actions.updateFormState({ step });
  };

  return (
    <div className="min-h-[70vh] flex bg-gradient-to-br from-slate-50 via-white to-pink-50">

      {/* LEFT */}
      <div className="w-full flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* CARD */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6">

            {state.step === 'Email' && (
              <EmailForm
                email={state.email}
                onSubmit={emailFormHandle}
                serverError={error}
                isLoading={isLoading}
              />
            )}

            {state.step === 'Token' && (
              <TokenForm
                token={state.token}
                message={message}
                onSubmit={tokenFormHandle}
                serverError={error}
                isLoading={verifying}
                onBack={() => back('Email')}
              />
            )}

            {state.step === 'Password' && (
              <PasswordForm
                onSubmit={passwordFormHandle}
                isLoading={resetting}
                onBack={() => back('Token')}
              />
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

/* =========================
   STATE MACHINE
========================= */
const initialState: GlobalState = {
  step: 'Email',
  email: '',
  password: '',
  token: '',
};

createStore(initialState);

const updateFormState = (state: any, payload: any) => ({
  ...state,
  ...payload,
});

/* =========================
   EXPORT
========================= */
export default function ForgotUserPassword() {
  return (
    <StateMachineProvider>
      <RenderFormSteps />
    </StateMachineProvider>
  );
}