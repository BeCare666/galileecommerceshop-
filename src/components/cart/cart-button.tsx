import Button from '@/components/ui/button';
import { CartIcon } from '@/components/icons/cart-icon';
import { useCart } from '@/components/cart/lib/cart.context';
import { useDrawer } from '@/components/drawer-views/context';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';

export default function CartButton({ className }: { className?: string }) {
  const isMounted = useIsMounted();
  const { openDrawer } = useDrawer();
  const { totalItems } = useCart();
  return (
    <Button
      variant="icon"
      aria-label="Cart"
      onClick={() => openDrawer('CART_VIEW')}
      className={className}
    >
      <span className="relative flex items-center">
        <CartIcon className="h-9 p-2 w-9 bg-white border border-pink-5 rounded-md w-10 h-10 flex items-center justify-center  hover:bg-pink-50 transition group-hover:scale-110" />
        <span className="text-light-100 absolute -top-3 -right-2.5 flex min-h-[20px] min-w-[20px] shrink-0 items-center justify-center rounded-full border-2 border-light-100 bg-brand px-0.5 text-10px font-bold leading-none  dark:border-dark-250">
          {isMounted && totalItems}
        </span>
      </span>
    </Button>
  );
}
