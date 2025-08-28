import { useEffect, useState } from 'react';
import GeneralLayout from '@/layouts/_general-layout';
import Seo from '@/layouts/_seo';
import ModalBecommeseller from '@/components/modal/modalBecommeseller';
import routes from '@/config/routes';
import { NextPageWithLayout } from '@/types';

const BecomeSellerPage: NextPageWithLayout = () => {
  const [open, setOpen] = useState(false);

  // Affiche la modale au chargement
  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <div className="bg-[#F9FAFB] dark:bg-dark-100">
      <Seo title="Become Seller" url={routes.becomeSeller} />
      <ModalBecommeseller isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

BecomeSellerPage.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default BecomeSellerPage;
