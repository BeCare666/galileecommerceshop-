import GeneralLayout from '@/layouts/_general-layout';
import Seo from '@/layouts/_seo';
import routes from '@/config/routes';
import { NextPageWithLayout } from '@/types';
import Banner from '@/components/banner/index'
const BecomeSellerPage: NextPageWithLayout = () => {


  return (
    <>
      <Seo title="Devenir fournisseur" url={routes.becomeSeller} />

      <Banner />
    </>
  );
};

BecomeSellerPage.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default BecomeSellerPage;
