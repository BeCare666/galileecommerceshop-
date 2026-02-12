import * as yup from 'yup';
import Button from '@/components/ui/button';
import {
  useModalAction,
  useModalState,
} from '@/components/modal-views/context';
import { Form } from '@/components/ui/forms/form';
import Uploader from '@/components/ui/forms/uploader';
import RateInput from '@/components/ui/forms/rate-input';
import TextArea from '@/components/ui/forms/textarea';
import { Controller } from 'react-hook-form';
import { CreateReviewInput } from '@/types';
import { useMutation, useQueryClient } from 'react-query';
import client from '@/data/client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import isEmpty from 'lodash/isEmpty';
import { API_ENDPOINTS } from '@/data/client/endpoints';
import { useTranslation } from 'next-i18next';

const reviewFormSchema = yup.object().shape({
  rating: yup
    .number()
    .min(1, 'You must need to provide a rating')
    .required('You must need to provide a rating'),
  comment: yup.string().required('You must need to provide a comment'),
  photos: yup.array(),
});

export default function ReviewForm() {
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  const queryClient = useQueryClient();
  const [serverError, setServerError] = useState(null);
  const { t } = useTranslation('common');
  const { mutate: createReview, isLoading: creating } = useMutation(
    client.reviews.create,
    {
      onSuccess: () => {
        toast.success(t('text-review-submitted'));
        closeModal();
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
        setServerError(error?.response?.data);
      },
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.ORDERS_DOWNLOADS);
      },
    }
  );
const { mutate: updateReview, isLoading: updating } = useMutation(
  client.reviews.update,
  {
    onSuccess: () => {
      toast.success(t('text-review-updated'));
      closeModal();
    },
    onError: (error: any) => {
      // 1️⃣ Backend peut renvoyer un objet { message, code, ... }
      const msg =
        error?.response?.data?.message ||
        'Une erreur est survenue, veuillez réessayer';

      // 2️⃣ Afficher toast pour l’utilisateur
      //toast.error(msg);

      // 3️⃣ Optionnel: mettre l’erreur dans l’état pour la Form
      setServerError(error?.response?.data);

      // 4️⃣ Si le backend renvoie un code spécifique, tu peux gérer des cas spéciaux
      if (error?.response?.data?.code === 'ALREADY_REVIEWED') {
        console.log('L’utilisateur a déjà soumis un commentaire');
      }
      if (error?.response?.data?.code === 'FILE_REQUIRED') {
        console.log('L’utilisateur doit ajouter un fichier');
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.ORDERS_DOWNLOADS);
    },
  }
);


  const onSubmit = (
    values: Omit<CreateReviewInput, 'product_id' | 'shop_id' | 'order_id'>
  ) => {
    if (data?.my_review) {
      // @ts-ignore
      updateReview({
        ...values,
        photos: values?.photos?.map(({ __typename, ...rest }) => rest),
        id: data.my_review.id,
        order_id: data.order_id,
      });
      return;
    }
    // @ts-ignore
    createReview({
      ...values,
      product_id: data.product_id,
      shop_id: data.shop_id,
      order_id: data.order_id,
    });
  };

return (
  <div className="flex h-full min-h-screen w-screen items-center justify-center bg-dark-900 text-light px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md bg-dark-800 rounded-2xl shadow-xl p-8 md:p-10 transition-all duration-300 hover:shadow-2xl">
      <h3 className="mb-6 text-center text-2xl font-semibold tracking-tight text-light">
        {t('text-make-review')}
      </h3>

      <Form<Omit<CreateReviewInput, 'product_id' | 'shop_id' | 'order_id'>>
        onSubmit={onSubmit}
        validationSchema={reviewFormSchema}
        serverError={serverError}
        useFormProps={{
          defaultValues: {
            rating: data?.my_review?.rating ?? 0,
            comment: data?.my_review?.comment ?? '',
            photos: data?.my_review?.photos ?? [],
          },
        }}
      >
        {({ register, control, formState: { errors } }) => (
          <>
            {/* ⭐ Rating */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-light/70">
                {t('text-rating-title')}
              </label>
              <div className="flex items-center">
                <RateInput
                  control={control}
                  name="rating"
                  defaultValue={0}
                  style={{ fontSize: 36 }}
                  allowClear={false}
                />
                {errors?.rating && (
                  <span className="ml-3 text-xs text-red-500">
                    {errors?.rating?.message}
                  </span>
                )}
              </div>
            </div>

            {/* ⭐ Comment */}
            <TextArea
              label={t('text-comment-label')}
              {...register('comment')}
              className="mb-6 bg-dark-700 border border-dark-600 text-light placeholder-light/50 rounded-lg p-3 focus:border-brand focus:ring-1 focus:ring-brand transition-all duration-200"
              error={errors?.comment?.message}
            />

            {/* ⭐ File Uploader (hidden for now, ready for future use) */}
            <div className="mb-6 hidden">
              <Controller
                name="photos"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <div>
                    <span className="block mb-2 text-sm text-light/70">
                      {t('text-input-attachment')}
                    </span>
                    <Uploader multiple={true} {...rest} />
                  </div>
                )}
              />
            </div>

            {/* ⭐ Submit Button */}
            <Button
              className="w-full text-sm py-3 rounded-xl bg-gradient-to-r from-brand-light to-brand-dark text-dark font-semibold shadow-md hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              isLoading={creating || updating}
              disabled={creating || updating}
            >
              {isEmpty(data?.my_review)
                ? t('text-write-review')
                : t('text-update-review')}
            </Button>

            {/* ⭐ Server Error */}
            {serverError && (
              <p className="mt-4 text-center text-xs text-red-400">
                {serverError?.message || 'Une erreur est survenue.'}
              </p>
            )}
          </>
        )}
      </Form>
    </div>
  </div>
);

}
